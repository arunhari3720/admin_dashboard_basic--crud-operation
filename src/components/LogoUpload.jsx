import { useRef, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function LogoUpload() {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", x: 10, y: 10, width: 80, height: 80 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // 🔥 HANDLE FILE SELECT
  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    const url = URL.createObjectURL(selected);
    setPreview(url);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    setCrop({ unit: "%", x: 10, y: 10, width: 80, height: 80 });
    setCompletedCrop(null);
  };

  // 🔥 CROP FUNCTION — free crop + rotation + flip
  const getCroppedImg = useCallback(() => {
    return new Promise((resolve, reject) => {
      const image = imgRef.current;
      if (!image || !completedCrop) {
        reject(new Error("No image or crop"));
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const pixelRatio = window.devicePixelRatio || 1;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const cropWidth = completedCrop.width * scaleX;
      const cropHeight = completedCrop.height * scaleY;

      canvas.width = cropWidth * pixelRatio;
      canvas.height = cropHeight * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      // 🔥 Apply rotation + flip
      ctx.save();
      ctx.translate(cropWidth / 2, cropHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.translate(-cropWidth / 2, -cropHeight / 2);

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      ctx.restore();

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  }, [completedCrop, rotation, flipH, flipV]);

  // 🔥 HANDLE UPLOAD
  const handleUpload = async () => {
    if (!preview || !completedCrop) {
      toast.error("Please select and crop image");
      return;
    }

    try {
      setLoading(true);

      const croppedBlob = await getCroppedImg();

      const formData = new FormData();
      formData.append("logo", croppedBlob, "logo.jpg");

      const uploadPromise = axios.post(
        "http://localhost:5000/api/logo/upload",
        formData
      );

      toast.promise(uploadPromise, {
        loading: "Uploading logo...",
        success: "Logo updated successfully 🎉",
        error: "Upload failed ❌",
      });

      await uploadPromise;

      window.dispatchEvent(new Event("logoUpdated"));

      // reset
      setPreview("");
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setZoom(1);
      setCompletedCrop(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Upload Logo
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update your admin branding logo
        </p>

        {/* Upload Box */}
        {!preview && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center"
            >
              <span className="text-gray-500">Click to upload logo</span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG (Max 2MB)</span>
            </label>
          </div>
        )}

        {/* 🔥 FREE CROP AREA */}
        {preview && (
          <>
            <div className="w-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                // 🔥 No aspect prop = free crop!
              >
                <img
                  ref={imgRef}
                  src={preview}
                  alt="crop preview"
                  style={{
                    maxHeight: "280px",
                    transform: `scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                    transformOrigin: "center",
                    transition: "transform 0.2s",
                  }}
                />
              </ReactCrop>
            </div>

            {/* 🔥 ROTATION SLIDER */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>-180°</span>
                <span className="font-semibold text-gray-600">{rotation}°</span>
                <span>180°</span>
              </div>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* 🔥 ZOOM SLIDER */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Zoom</span>
                <span className="font-semibold text-gray-600">{Number(zoom).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* 🔥 FLIP BUTTONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setFlipH((prev) => !prev)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                  flipH
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ⇄ Flip Horizontal
              </button>
              <button
                onClick={() => setFlipV((prev) => !prev)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                  flipV
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ⇅ Flip Vertical
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setPreview("");
                  setRotation(0);
                  setFlipH(false);
                  setFlipV(false);
                  setZoom(1);
                }}
                className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={loading}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  loading
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
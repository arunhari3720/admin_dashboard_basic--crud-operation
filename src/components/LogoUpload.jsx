import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";

export default function LogoUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  // 🔥 HANDLE FILE SELECT
  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    const url = URL.createObjectURL(selected);
    setFile(selected);
    setPreview(url);
  };

  // 🔥 CROP FUNCTION
  const getCroppedImg = async (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  // 🔥 HANDLE UPLOAD
  const handleUpload = async () => {
    if (!preview || !croppedAreaPixels) {
      toast.error("Please select and crop image");
      return;
    }

    try {
      setLoading(true);

      const croppedBlob = await getCroppedImg(
        preview,
        croppedAreaPixels
      );

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
      setFile(null);
      setPreview("");

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
              <span className="text-gray-500">
                Click to upload logo
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG (Max 2MB)
              </span>
            </label>
          </div>
        )}

        {/* 🔥 CROPPER */}
        {preview && (
          <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={3 / 1} // 🔥 banner ratio
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedPixels) => {
                setCroppedAreaPixels(croppedPixels);
              }}
            />
          </div>
        )}

        {/* 🔥 ZOOM */}
        {preview && (
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full mt-4"
          />
        )}

        {/* Buttons */}
        {preview && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                setPreview("");
                setFile(null);
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
        )}
      </div>
    </div>
  );
}
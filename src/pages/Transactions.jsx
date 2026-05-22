
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/chat_gpt.png";

const API = "http://localhost:5000/api/transactions";

function Transactions() {
  const [data, setData] = useState([]);
  const [footer] = useState(
    "Powered by Admin Panel | support@yourapp.com"
  );

  // 🔄 Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(fetchTransactions, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🧾 PDF GENERATION (WITH LOGO)
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const rowsPerPage = 5;
    let pageNumber = 1;

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      for (let i = 0; i < data.length; i += rowsPerPage) {
        const chunk = data.slice(i, i + rowsPerPage);

        if (i !== 0) {
          doc.addPage();
          pageNumber++;
        }

        // 🏢 LOGO (LEFT)
        const imgWidth = 20;
        const imgHeight = (img.height * imgWidth) / img.width;
        doc.addImage(img, "PNG", 14, 5, imgWidth, imgHeight);

        // 🧾 TITLE
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.text("Transactions", pageWidth / 2, 20, {
          align: "center",
        });

        const now = new Date();

        // 📅 DATE
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(
          now.toLocaleDateString(),
          pageWidth - 14,
          15,
          { align: "right" }
        );

        // ⏰ TIME
        doc.text(
          now.toLocaleTimeString(),
          pageWidth - 14,
          20,
          { align: "right" }
        );

        // 📊 TABLE
        autoTable(doc, {
          startY: 30,
          head: [["Plan", "Amount", "Method", "Date", "Status"]],
          body: chunk.map((t) => [
            t.planName,
            `INR ${t.amount.toLocaleString("en-IN")}`,
            t.paymentMethod,
            new Date(t.createdAt).toLocaleDateString(),
            "Success",
          ]),
          theme: "grid",
          styles: {
            fontSize: 10,
            cellPadding: 5,
            lineColor: [230, 230, 230],
            lineWidth: 0.5,
          },
          headStyles: {
            fillColor: [33, 150, 243],
            textColor: 255,
            fontStyle: "bold",
            halign: "center",
          },
          alternateRowStyles: {
            fillColor: [245, 247, 250],
          },
          columnStyles: {
            1: {
              halign: "right",
              textColor: [0, 150, 0],
              fontStyle: "bold",
            },
            4: {
              halign: "center",
              textColor: [0, 150, 0],
            },
          },
          didDrawPage: () => {
            // Footer line
            doc.setDrawColor(220);
            doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);

            // Footer text
            doc.setFontSize(9);
            doc.setTextColor(120);
            doc.text(footer, 14, pageHeight - 10);

            // Page number
            doc.text(
              `Page ${pageNumber}`,
              pageWidth - 20,
              pageHeight - 10
            );
          },
        });
      }

      doc.save("transactions.pdf");
    };

    img.onerror = () => {
      console.error("Logo failed to load");
    };
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Transactions
          </h1>

          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Export PDF
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <tr>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{t.planName}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">
                    ₹{t.amount}
                  </td>
                  <td className="px-6 py-4">{t.paymentMethod}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-green-600">
                    Success
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Transactions;

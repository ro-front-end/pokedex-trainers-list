import { FaDownload } from "react-icons/fa";

function DownloadCSVButton({ url }) {
  const handleDownload = () => {
    // Abrir la URL directamente para que el navegador descargue el CSV
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-green-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-green-600 transition"
    >
      <FaDownload />
      Download CSV
    </button>
  );
}

export default DownloadCSVButton;

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const qrRef = useRef(null);

  const handleGenerate = () => {
    if (!inputUrl.trim()) return;
    setQrUrl(inputUrl);
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "codigo-qr.png";
    link.click();
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">QR Generator</h1>

        <input
          type="text"
          className="input"
          placeholder="https://ejemplo.com"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />

        <button className="button" onClick={handleGenerate}>
          Generar código QR
        </button>

        {qrUrl && (
          <>
            <div className="qr-container" ref={qrRef}>
              <QRCodeCanvas
                value={qrUrl}
                size={220}
                bgColor="#020617"
                fgColor="#e5e7eb"
              />
            </div>

            <button className="button secondary" onClick={handleDownload}>
              Descargar PNG
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

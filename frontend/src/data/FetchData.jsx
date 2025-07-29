import { useEffect, useState } from "react";

const FetchData = ({ userinput }) => {
  const [qrcoderes, setQrcoderes] = useState(null); // store response object
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQr = async () => {
    setLoading(true);
    setError(null);
    try {
      const BackenApi = "http://localhost:3000/generate";
      const response = await fetch(BackenApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userinput }),
      });

      if (!response.ok) throw new Error("Error fetching API");
      const data = await response.json();
      setQrcoderes(data);
    } catch (err) {
      setError("Oops, something went wrong.");
      setQrcoderes(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userinput) generateQr();
  }, [userinput]);

  const downloadImage = () => {
    if (!qrcoderes?.qr) return;

    const link = document.createElement("a");
    link.href = qrcoderes.qr;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <h3>Generating QR code...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      {qrcoderes?.qr && (
        <div style={{ textAlign: "center" }}>
          <img
            src={qrcoderes.qr}
            alt="Generated QR Code"
            style={{ width: 300, height: 300, marginBottom: "1rem" }}
          />
          <br />
          <button onClick={downloadImage} className="btn">
            Download QR Code
          </button>
       
        </div>
      )}
    </>
  );
};

export default FetchData;

import express, { json } from "express";
import cors from "cors";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.post("/generate", async (req, res) => {
  const { text, size = 800, format = "png" } = req.body;

  if (!text || typeof text !== "string") {    // string condition
    return res.status(400).json({ error: "Text is required and must be a string" });
  }
  const parsedSize = parseInt(size);
  if (isNaN(parsedSize) || parsedSize < 100 || parsedSize > 2000) {
    return res.status(400).json({ error: "Size must be between 100 and 2000 pixels" });
  }
  try {
    const options = {
      width: parsedSize,
    };
    if (format === "png") {
      const dataUrl = await QRCode.toDataURL(text, options);
      res.json({ qr: dataUrl });
    } else if (format === "svg") {
      const svg = await QRCode.toString(text, { type: "svg" });
      const base64Svg = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
      res.json({ qr: base64Svg });
    } else {
      return res.status(400).json({ error: "Unsupported format , use png or svg" });   //format  condition png || svg
    }
  } catch (err) {
    console.error("QR generation failed:", err.message);
    res.status(500).json({ error: "QR generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

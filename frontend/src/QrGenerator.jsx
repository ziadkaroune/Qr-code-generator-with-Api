import { useState } from 'react';
import FetchData from './data/FetchData';

const QrGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [clearInput, setClearInput] = useState('');
  const [showData, setShowData] = useState(false);
  const [format, setFormat] = useState('png');
  const [size, setSize] = useState('400');

  function generateQr() {
    if (userInput.trim() !== '') {
      setClearInput(userInput);
      setShowData(true);
    } else {
      setShowData(false);
    }
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="qr-input" className="label">
          Enter your URL or Text
        </label>

        <input
          id="qr-input"
          type="text"
          placeholder="https://example.com"
          className="input"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') generateQr();
          }}
        />

        <div className="select-group">
          <div>
            <label htmlFor="format">Format</label>
            <select
              id="format"
              className="circular-select"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
            </select>
          </div>

          <div>
            <label htmlFor="size">Size</label>
            <select id="size" className="circular-select" value={size}onChange={(e) => setSize(e.target.value)}>
            <option value="128">128 x 128</option>
            <option value="256">256 x 256</option>
            <option value="384">384 x 384</option>
            <option value="512">512 x 512</option>
            <option value="640">640 x 640</option>
            </select>

          </div>
        </div>

        <button className="btn" onClick={generateQr}>
          Generate QR Code
        </button>
      </div>

      <div className="qr-output">
        {showData && (
          <FetchData
            userinput={clearInput}
            formatQr={format}
            sizeQr={size}
          />
        )}

      </div>
  
    </>
  );
};

export default QrGenerator;

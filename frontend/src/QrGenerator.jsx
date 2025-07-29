import FetchData from './data/FetchData'
import { useState } from 'react'

const QrGenerator = () => {
  const [useInput, setUserInput] = useState('')
  const [clearInput, setClearInput] = useState('')
  const [showData, setShowData] = useState(false)

  function generateQr() {
    if (useInput.trim() !== '') {
      setClearInput(useInput);
      setShowData(true);
    }
    else{
      setShowData(false);
    }
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="qr-input" className="label">
          Enter your URL or Text
        </label>

        <input id="qr-input" type="text"  placeholder="https://example.com" className="input"
          onChange={(e) => setUserInput(e.target.value)}
          value={useInput}
          minLength={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter') generateQr()
          }}
        />
        <button className="btn" onClick={generateQr}>
          Generate QR Code
        </button>
      </div>

      <div className="qr-output">{showData && <FetchData userinput={clearInput} />}</div>
    </>
  )
}

export default QrGenerator

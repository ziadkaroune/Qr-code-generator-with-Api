import Header from './Header'
import Footer from './Footer'
import QrGenerator from './QrGenerator'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="qr-container">
          <QrGenerator />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App

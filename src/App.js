import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageURI, setImageURI] = useState('');
  const [zoomedURI, setZoomedURI] = useState('');
  const [showZoomed, setShowZoomed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.avascan.info/private/v2/network/mainnet/evm/43114/erc721/0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9/tokens/8005');
      setImageURI(response.data.uri1024);
      setZoomedURI(response.data.uri1024);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setShowZoomed(!showZoomed);
  };

  return (
    <>
      <img src={imageURI} alt="Token" onClick={handleClick} />
      {showZoomed && (
        <div className="modal-container" onClick={handleClick}>
          <img src={zoomedURI} alt="Zoomed Token" className="zoomed-image" />
        </div>
      )}
    </>
  );
}

export default App;

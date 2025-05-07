import { useState } from 'react';
import '../pagestyles/home.css';
import { getBalance } from '../api/blockchain';

const API_BASE = import.meta.env.VITE_API_URL;

export default function Home() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState('');

  const handleCheckBalance = async () => {
    if (!address) {
      setStatus('Please enter a wallet address.');
      return;
    }

    try {
      setStatus('Checking...');
      const data = await getBalance(address);
      setBalance(data.balance ?? 0);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('Failed to fetch balance.');
      setBalance(null);
    }
  };

  return (
    <div className="wallet-container">
      <div className="title-box">
        <h1>Wallets</h1>
      </div>

      <div className="balance-box">
        <input
          type="text"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="wallet-input"
        />
        <button onClick={handleCheckBalance} className="wallet-button">
          Check Balance
        </button>
        {status && <p>{status}</p>}
        {balance !== null && <p><strong>Balance:</strong> {balance}</p>}
      </div>
    </div>
  );
}

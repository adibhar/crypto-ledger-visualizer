import { useState } from 'react';
import { mineBlock, mineToAddr } from '../api/blockchain';
import '../pagestyles/mining.css';

export function Mining() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMine = async () => {
    try {
      setLoading(true);
      setStatus('Mining...');

      if (address.trim() === '') {
        await mineBlock();
        setStatus('Block mined (server-side)');
      } else {
        await mineToAddr(address);
        setStatus(`Block mined to address: ${address}`);
      }
    } catch (err) {
      setStatus('Mining failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="control-container">
      <h2>Mining Console</h2>

      <div className="mining-box">
        <input
          type="text"
          placeholder="Enter address (optional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="wallet-input"
        />

        <button
          onClick={handleMine}
          className="control-button"
          disabled={loading}
        >
          {loading ? 'Mining...' : 'Mine Block'}
        </button>

        {status && <p className="control-status">{status}</p>}
      </div>
    </div>
  );
}

export default Mining;

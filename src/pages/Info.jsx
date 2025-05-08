import { useState } from 'react';
import '../pagestyles/control.css';
import { sendTransaction } from '../api/blockchain';

export function Info() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [signature, setSignature] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransaction = async () => {
    if (!sender || !receiver || !amount || !signature) {
      setStatus("Please fill in all fields including signature.");
      return;
    }

    try {
      setLoading(true);
      await sendTransaction(sender, receiver, parseFloat(amount), signature);
      setStatus("Transaction sent!");
    } catch (err) {
      setStatus(` ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="control-container">
      <h2>Transaction Panel</h2>

      <div className="control-form">
        <input
          type="text"
          placeholder="Sender Wallet"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="control-input"
        />
        <input
          type="text"
          placeholder="Receiver Wallet"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="control-input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="control-input"
        />
        <input
          type="text"
          placeholder="Signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="control-input"
        />
        <button
          onClick={handleTransaction}
          className="control-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Transaction"}
        </button>
      </div>

      {status && <p className="control-status">{status}</p>}
    </div>
  );
}

export default Info;
import React from 'react';

function QRISPayment({ qrisUrl, onClose }) {
  return (
    <div className="qris-modal">
      <div className="qris-content">
        <h2>Scan QR Code to Pay</h2>
        <img src={qrisUrl} alt="QRIS Code" className="qris-image" />
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default QRISPayment;

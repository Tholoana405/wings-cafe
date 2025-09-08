import React, { useState } from "react";

export default function TransactionForm({ product, onSubmit, onCancel }) {
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (qty <= 0) return alert("Quantity must be greater than 0");
    if (qty > product.quantity) return alert("Not enough stock available");

    onSubmit({
      productId: product.id,
      type: "out",
      quantity: Number(qty),
      date: new Date().toISOString()
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Sell: {product.name}</h3>
      <p>Available: {product.quantity}</p>
      <input
        type="number"
        value={qty}
        min="1"
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div>
        <button type="submit">Confirm Sale</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

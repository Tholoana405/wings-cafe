import React, { useState } from "react";

export default function StockForm({ product, onSubmit, onCancel }) {
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (qty <= 0) return alert("Quantity must be greater than 0");

    onSubmit({
      productId: product.id,
      type: "in",
      quantity: Number(qty),
      date: new Date().toISOString()
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add Stock: {product.name}</h3>
      <input
        type="number"
        value={qty}
        min="1"
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div>
        <button type="submit">Add Stock</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

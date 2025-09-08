import React from "react";

export default function SalesList({ transactions, products }) {
  function getProductName(id) {
    const p = products.find(prod => prod.id === id);
    return p ? p.name : "Unknown";
  }

  const sales = transactions.filter(tx => tx.type === "out");

  return (
    <div>
      <h2>Sales Records</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(tx => (
            <tr key={tx.date + tx.productId}>
              <td>{getProductName(tx.productId)}</td>
              <td>{tx.quantity}</td>
              <td>{new Date(tx.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

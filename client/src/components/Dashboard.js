import React from "react";
import "./Dashboard.css";

export default function Dashboard({ products, transactions }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockItems = products.filter(p => p.quantity <= 5);
  const salesTransactions = transactions.filter(tx => tx.type === "out");
  const salesCount = salesTransactions.length;
  const totalRevenue = salesTransactions.reduce((sum, tx) => {
    const product = products.find(p => p.id === tx.productId);
    return sum + (product ? product.price * tx.quantity : 0);
  }, 0);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Top Row Cards (3) */}
      <div className="card-grid top-row">
        <div className="card blue">Total Products: {totalProducts}</div>
        <div className="card green">Total Stock: {totalStock}</div>
        <div className="card red">Low Stock: {lowStockItems.length}</div>
      </div>

      {/* Bottom Row Cards (2) */}
      <div className="card-grid bottom-row">
        <div className="card yellow">Sales Count: {salesCount}</div>
        <div className="card purple">Total Revenue: R{totalRevenue}</div>
      </div>

      {/* Low Stock Items as Cards */}
      <h3 className="section-title">Low Stock Items</h3>
      <div className="card-grid">
        {lowStockItems.length ? (
          lowStockItems.map(p => (
            <div key={p.id} className="card red-light">
              <h4>{p.name}</h4>
              <p>Quantity: {p.quantity}</p>
            </div>
          ))
        ) : (
          <p>All products have sufficient stock.</p>
        )}
      </div>

      {/* Recent Sales Table */}
      <h3 className="section-title">Recent Sales</h3>
      {salesTransactions.length ? (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesTransactions.slice(-6).map(tx => {
              const product = products.find(p => p.id === tx.productId);
              return (
                <tr key={tx.id}>
                  <td>{product ? product.name : "Unknown"}</td>
                  <td>{tx.quantity}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No sales recorded yet.</p>
      )}
    </div>
  );
}

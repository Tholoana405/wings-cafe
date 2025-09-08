import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createTransaction,
  fetchTransactions
} from "./api";

import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import StockForm from "./components/StockForm";
import TransactionForm from "./components/TransactionForm";
import SalesList from "./components/SalesList";

function App() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selling, setSelling] = useState(null);
  const [restocking, setRestocking] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");

  async function loadData() {
    const prods = await fetchProducts();
    const txs = await fetchTransactions();
    setProducts(prods);
    setTransactions(txs);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSaveProduct(p) {
    if (editing?.id) await updateProduct(editing.id, p);
    else await createProduct(p);
    setEditing(null);
    loadData();
  }

  async function handleDeleteProduct(id) {
    await deleteProduct(id);
    loadData();
  }

  async function handleStock(tx) {
    await createTransaction(tx);
    loadData();
    setRestocking(null);
  }

  async function handleTransaction(tx) {
    await createTransaction(tx);
    loadData();
    setSelling(null);
  }

  return (
    <div className="container">
      <header>
        <h1>Wings Café Inventory System</h1>
        <nav>
          <ul>
            <li onClick={() => setActiveModule("dashboard")} className={activeModule === "dashboard" ? "active" : ""}>Dashboard</li>
            <li onClick={() => setActiveModule("inventory")} className={activeModule === "inventory" ? "active" : ""}>Inventory</li>
            <li onClick={() => setActiveModule("sales")} className={activeModule === "sales" ? "active" : ""}>Sales</li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Reporting / Dashboard */}
        {activeModule === "dashboard" && <Dashboard products={products} transactions={transactions} />}

        {/* Inventory Module */}
        {activeModule === "inventory" && (
          <>
            {editing && <ProductForm initial={editing} onSubmit={handleSaveProduct} onCancel={() => setEditing(null)} />}
            {restocking && <StockForm product={restocking} onSubmit={handleStock} onCancel={() => setRestocking(null)} />}
            <button className="add-btn" onClick={() => setEditing({})}>+ Add Product</button>
            <ProductList
              products={products}
              onEdit={(p) => setEditing(p)}
              onDelete={handleDeleteProduct}
              onSell={(p) => { setSelling(p); setActiveModule("sales"); }}
              onRestock={(p) => setRestocking(p)}
            />
          </>
        )}

        {/* Sales Module */}
        {activeModule === "sales" && (
          <>
            {selling && <TransactionForm product={selling} onSubmit={handleTransaction} onCancel={() => setSelling(null)} />}
            <SalesList products={products} transactions={transactions} />
          </>
        )}
      </main>

      <footer>
        <p>© 2025 Wings Café</p>
      </footer>
    </div>
  );
}


export default App;

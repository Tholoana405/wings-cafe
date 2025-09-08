const API_URL = "http://localhost:5000";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
}

export async function deleteProduct(id) {
  return fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
}

export async function createTransaction(tx) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx)
  });
  return res.json();
}

export async function fetchTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
}

export async function getLowStock(threshold = 5) {
  const products = await fetchProducts();
  return products.filter((p) => p.quantity <= threshold);
}

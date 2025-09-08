import React, { useState } from "react";

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    category: initial?.category || "",
    price: initial?.price || "",
    quantity: initial?.quantity || ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>{initial?.id ? "Edit Product" : "Add Product"}</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

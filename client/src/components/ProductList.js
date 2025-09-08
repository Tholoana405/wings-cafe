import React from "react";

export default function ProductList({ products, onUpdate, onDelete, onRestock }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">R {product.price}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => onUpdate(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => onRestock(product.id)}
                  >
                    Restock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500 italic"
              >
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

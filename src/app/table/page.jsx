"use client"
import React from "react";

const ProductTable = () => {
  const products = [
    {
      image: "https://via.placeholder.com/50",
      name: "Exclusive Cotton Jamdani",
      variants: "4 variants",
      type: "Physical",
      sku: "",
      price: "$700.00",
      originalPrice: "",
      inventory: "In stock",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "Ear Rings (Jhumka with stones)",
      variants: "12 variants",
      type: "Physical",
      sku: "",
      price: "$40.00",
      originalPrice: "$48.00",
      inventory: "In stock",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "Ear Rings (Jhumka)",
      variants: "",
      type: "Physical",
      sku: "",
      price: "$38.00",
      originalPrice: "$42.00",
      inventory: "In stock",
    },
    // Add more products as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Products <span className="text-gray-500">19</span>
        </h1>
        <div className="flex flex-wrap space-x-3 mt-4 sm:mt-0">
          <button className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300">
            More Actions
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + New Product
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="table-auto w-full text-left min-w-[700px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-gray-600 font-medium">Name</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Type</th>
              <th className="px-6 py-3 text-gray-600 font-medium">SKU</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Price</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Inventory</th>
              <th className="px-6 py-3 text-gray-600 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-500 text-sm">{product.variants}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{product.type}</td>
                <td className="px-6 py-4">{product.sku || "-"}</td>
                <td className="px-6 py-4">
                  <span className="text-gray-800 font-medium">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{product.inventory}</td>
                <td className="px-6 py-4 text-right">
                  <div className="relative">
                    <button className="text-gray-500 hover:text-gray-700">
                      &#8942;
                    </button>
                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-32 z-10 hidden group-hover:block">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Edit Product
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Duplicate
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

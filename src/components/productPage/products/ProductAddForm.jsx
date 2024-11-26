import React, { useState } from "react";

const ProductAddForm = ({ onAddProduct, onCancel }) => {
	const [newProduct, setNewProduct] = useState({
		product_name: "",
		currency: "",
		box: "",
		remaining: "",
		price_in_currency: "",
		price_in_UZS: "",
		warehouse: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddProduct(newProduct);
		setNewProduct({
			product_name: "",
			currency: "",
			box: "",
			remaining: "",
			price_in_currency: "",
			price_in_UZS: "",
			warehouse: "",
		});
	};

	const InputField = ({ label, name, type = "text" }) => (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={newProduct[name] || ""}
				onChange={handleInputChange}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputField label="Product Name" name="product_name" />
			<InputField label="Currency" name="currency" />
			<InputField label="Box" name="box" type="number" />
			<InputField label="Remaining" name="remaining" type="number" />
			<InputField
				label="Price in Currency"
				name="price_in_currency"
				type="number"
			/>
			<InputField
				label="Price in UZS"
				name="price_in_UZS"
				type="number"
			/>
			<InputField label="Warehouse" name="warehouse" />

			<div className="flex justify-end space-x-3 mt-6">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Add Product
				</button>
			</div>
		</form>
	);
};

export default ProductAddForm;

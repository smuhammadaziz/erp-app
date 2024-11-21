import React, { useState } from "react";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCheck,
	FaTimes,
	FaEye,
	FaTrash,
	FaUsers,
	FaUserPlus,
	FaSearch,
	FaTimes as FaClose,
} from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

import data from "./data.json";

const Modal = ({ isOpen, onClose, children, title }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<FaClose />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

const ProductsPageComponent = () => {
	const [products, setProducts] = useState(data);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [newProduct, setNewProduct] = useState({
		product_name: "",
		currency: "",
		box: "",
		remaining: "",
		price_in_currency: "",
		price_in_UZS: "",
		warehouse: "",
	});

	// Search functionality
	const filteredProducts = products.filter((product) =>
		Object.values(product)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase()),
	);

	const handleAddProduct = (e) => {
		e.preventDefault();
		const productToAdd = {
			...newProduct,
			id: products.length + 1,
		};

		setProducts([...products, productToAdd]);
		setShowAddModal(false);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Update only the targeted field in the state
		setNewProduct((prev) => ({
			...prev,
			[name]: value, // Directly assign the input value without processing
		}));
	};

	const handleDeleteProduct = (id) => {
		const updatedProducts = products.filter((product) => product.id !== id);
		setProducts(updatedProducts);
	};

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowViewModal(true);
	};

	const InputField = ({ label, name, value, onChange, type = "text" }) => (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value || ""} // Ensure value is never undefined
				onChange={onChange}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);

	return (
		<div className="bg-gray-50 h-screen">
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Header Section */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 px-3 bg-blue-50 rounded-lg">
								<SlBasket className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								Product Details
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-grow">
								<input
									type="text"
									placeholder="Search products..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							</div>
							<button
								onClick={() => setShowAddModal(true)}
								className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
							>
								<FaUserPlus className="mr-2" />
								<span>Add Product</span>
							</button>
						</div>
					</div>
				</div>

				{/* Table Section */}
				<div className="overflow-x-auto h-[65vh]">
					<table className="w-full">
						<thead className="bg-gray-50 sticky top-0 z-10">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Product Name
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Currency
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Box
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Remaining
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Price in Currency
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Price in UZS
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Warehouse
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredProducts.map((product) => (
								<tr
									key={product.id}
									className="hover:bg-gray-50 transition-colors duration-200"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.product_name}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.currency}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.box}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.remaining}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.price_in_currency}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.price_in_UZS}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{product.warehouse}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div className="flex items-center space-x-4">
											<button
												onClick={() =>
													handleViewProduct(product)
												}
												className="flex items-center text-blue-600 hover:text-blue-900 transition-colors duration-200"
											>
												<FaEye className="mr-1" />
												<span>View</span>
											</button>
											<button
												onClick={() =>
													handleDeleteProduct(
														product.id,
													)
												}
												className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200"
											>
												<FaTrash className="mr-1" />
												<span>Delete</span>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<Modal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				title="Add New Product"
			>
				<form onSubmit={handleAddProduct} className="space-y-4">
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Product Name
						</label>
						<input
							type="text"
							name="product_name"
							value={newProduct.product_name || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Currency
						</label>
						<input
							type="text"
							name="currency"
							value={newProduct.currency || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Box
						</label>
						<input
							type="number"
							name="box"
							value={newProduct.box || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Remaining
						</label>
						<input
							type="number"
							name="remaining"
							value={newProduct.remaining || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Price in Currency
						</label>
						<input
							type="number"
							name="price_in_currency"
							value={newProduct.price_in_currency || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Price in UZS
						</label>
						<input
							type="number"
							name="price_in_UZS"
							value={newProduct.price_in_UZS || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Warehouse
						</label>
						<input
							type="text"
							name="warehouse"
							value={newProduct.warehouse || ""}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="flex justify-end space-x-3 mt-6">
						<button
							type="button"
							onClick={() => setShowAddModal(false)}
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
			</Modal>

			{/* View Product Modal */}
			<Modal
				isOpen={showViewModal}
				onClose={() => setShowViewModal(false)}
				title="Product Details"
			>
				{selectedProduct && (
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="font-medium">Product Name:</div>
							<div>{selectedProduct.product_name}</div>

							<div className="font-medium">Currency:</div>
							<div>{selectedProduct.currency}</div>

							<div className="font-medium">Box:</div>
							<div>{selectedProduct.box}</div>

							<div className="font-medium">Remaining:</div>
							<div>{selectedProduct.remaining}</div>

							<div className="font-medium">
								Price in Currency:
							</div>
							<div>{selectedProduct.price_in_currency}</div>

							<div className="font-medium">Price in UZS:</div>
							<div>{selectedProduct.price_in_UZS}</div>

							<div className="font-medium">Warehouse:</div>
							<div>{selectedProduct.warehouse}</div>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ProductsPageComponent;

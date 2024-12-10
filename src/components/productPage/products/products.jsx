import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaUserPlus, FaSearch } from "react-icons/fa";

import data from "../../homePage/settings.json";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductAddForm from "./ProductAddForm";
import ProductViewDetails from "./ProductViewDetails";

const currentProducts = data.data.detail;

const ProductsPageComponent = () => {
	const [products, setProducts] = useState(currentProducts);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const filteredProducts = products.filter((product) =>
		Object.values(product)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase()),
	);

	console.log("Filtered Products:", filteredProducts);

	const handleAddProduct = (newProduct) => {
		const productToAdd = {
			...newProduct,
			id: products.length + 1,
		};

		setProducts([...products, productToAdd]);
		setShowAddModal(false);
	};

	const handleDeleteProduct = (id) => {
		const updatedProducts = products.filter((product) => product.id !== id);
		setProducts(updatedProducts);
	};

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowViewModal(true);
	};

	console.log(products);

	return (
		<div className="h-screen">
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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

				<ProductTable
					products={filteredProducts}
					onViewProduct={handleViewProduct}
					onDeleteProduct={handleDeleteProduct}
				/>
			</div>

			<ProductModal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				title="Add New Product"
			>
				<ProductAddForm
					onAddProduct={handleAddProduct}
					onCancel={() => setShowAddModal(false)}
				/>
			</ProductModal>

			<ProductModal
				isOpen={showViewModal}
				onClose={() => setShowViewModal(false)}
				title="Product Details"
			>
				<ProductViewDetails product={selectedProduct} />
			</ProductModal>
		</div>
	);
};

export default ProductsPageComponent;


import React, { useState, useEffect, useMemo } from "react";
import { SlBasket } from "react-icons/sl";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductAddForm from "./ProductAddForm";
import ProductViewDetails from "./ProductViewDetails";

const ProductsPageComponent = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");

	// Fetch products from API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/api/get/sync/${deviceId}/${ksbId}`,
				);
				const data = await response.json();
				setProducts(data.products); // assuming the structure of the response
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	// Memoize filtered products for performance
	const filteredProducts = useMemo(
		() =>
			products.filter((product) =>
				Object.values(product)
					.join(" ")
					.toLowerCase()
					.includes(searchTerm.toLowerCase()),
			),
		[products, searchTerm],
	);

	// Handle adding a product
	const handleAddProduct = (newProduct) => {
		const productToAdd = {
			...newProduct,
			id: products.length + 1,
		};
		setProducts((prevProducts) => [...prevProducts, productToAdd]);
		setShowAddModal(false);
	};

	// Handle deleting a product
	const handleDeleteProduct = (id) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== id),
		);
	};

	// Handle viewing product details
	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowViewModal(true);
	};

	return (
		<div className="container mx-auto h-[80vh]">
			<div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
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
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							</div>
						</div>
					</div>
				</div>

				<ProductTable
					products={filteredProducts}
					onViewProduct={handleViewProduct}
					onDeleteProduct={handleDeleteProduct}
				/>

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
		</div>
	);
};

export default ProductsPageComponent;


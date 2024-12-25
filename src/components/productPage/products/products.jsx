import React, { useState, useEffect, useMemo } from "react";
import { SlBasket } from "react-icons/sl";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductAddForm from "./ProductAddForm";
import ProductViewDetails from "./ProductViewDetails";
import nodeUrl from "../../../links";

const ProductsPageComponent = () => {
	const [products, setProducts] = useState([]);
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");

	// Fetch all products initially
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/sync/${deviceId}/${ksbId}`,
					{
						method: "POST",
					},
				);
				const data = await response.json();
				setProducts(data.products);
				setDisplayedProducts(data.products.slice(0, 50));
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, []);

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

	useEffect(() => {
		setDisplayedProducts(filteredProducts.slice(0, 50));
		setHasMore(filteredProducts.length > 50);
	}, [filteredProducts]);

	const loadMore = () => {
		const currentLength = displayedProducts.length;
		const nextBatch = filteredProducts.slice(
			currentLength,
			currentLength + 50,
		);
		if (nextBatch.length > 0) {
			setDisplayedProducts((prev) => [...prev, ...nextBatch]);
			setHasMore(currentLength + 50 < filteredProducts.length);
		} else {
			setHasMore(false);
		}
	};

	const handleAddProduct = (newProduct) => {
		const productToAdd = {
			...newProduct,
			id: products.length + 1,
		};
		setProducts((prev) => [...prev, productToAdd]);
		setShowAddModal(false);
	};

	const handleDeleteProduct = (id) => {
		setProducts((prev) => prev.filter((product) => product.id !== id));
	};

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
					products={displayedProducts}
					isLoading={isLoading}
					hasMore={hasMore}
					onLoadMore={loadMore}
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


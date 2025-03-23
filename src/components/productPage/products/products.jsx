import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
} from "react";
import { SlBasket } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductAddForm from "./ProductAddForm";
import ProductViewDetails from "./ProductViewDetails";
import nodeUrl from "../../../links";

import content from "../../../localization/content";
import useLang from "../../../hooks/useLang";

const ProductsPageComponent = () => {
	const [products, setProducts] = useState([]);
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	const [language] = useLang("uz");

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");

	const debounce = (func, delay) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), delay);
		};
	};

	const debouncedSearch = useMemo(
		() => debounce((term) => setSearchTerm(term), 300),
		[setSearchTerm],
	);

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
	}, [deviceId, ksbId]);

	const filteredProducts = useMemo(() => {
		try {
			return products.filter((product) =>
				Object.values(product)
					.join(" ")
					.toLowerCase()
					.includes(searchTerm.toLowerCase()),
			);
		} catch (error) {
			console.error("Error filtering products:", error);
			return [];
		}
	}, [products, searchTerm]);

	useEffect(() => {
		try {
			setDisplayedProducts(filteredProducts.slice(0, 50));
			setHasMore(filteredProducts.length > 50);
		} catch (error) {
			console.error("Error updating displayed products:", error);
		}
	}, [filteredProducts]);

	const loadMore = useCallback(() => {
		try {
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
		} catch (error) {
			console.error("Error loading more products:", error);
		}
	}, [displayedProducts, filteredProducts]);

	const handleAddProduct = useCallback(
		(newProduct) => {
			try {
				const productToAdd = {
					...newProduct,
					id: products.length + 1,
				};
				setProducts((prev) => [...prev, productToAdd]);
				setShowAddModal(false);
			} catch (error) {
				console.error("Error adding product:", error);
			}
		},
		[products],
	);

	const handleDeleteProduct = useCallback((id) => {
		try {
			setProducts((prev) => prev.filter((product) => product.id !== id));
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	}, []);

	const handleViewProduct = useCallback((product) => {
		try {
			setSelectedProduct(product);
			setShowViewModal(true);
		} catch (error) {
			console.error("Error viewing product:", error);
		}
	}, []);

	const searchInputRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key === "f") {
				event.preventDefault();
				if (searchInputRef.current) {
					searchInputRef.current.focus();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className=" h-[80vh]">
			<div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 px-3 bg-blue-50 rounded-lg">
								<SlBasket className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								{content[language].product.detail}
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-grow">
								<input
									type="text"
									ref={searchInputRef}
									placeholder={
										content[language].product.search
									}
									value={searchTerm}
									onChange={(e) =>
										debouncedSearch(e.target.value)
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
					title={content[language].product.detail}
				>
					<ProductViewDetails product={selectedProduct} />
				</ProductModal>
			</div>
		</div>
	);
};

export default ProductsPageComponent;


import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";

function SalesMainAllProducts() {
	const [searchQuery, setSearchQuery] = useState("");
	const [originalData, setOriginalData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [isSelectionEnabled, setIsSelectionEnabled] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const tableRef = useRef(null);
	const selectedRowRef = useRef(null);
	const searchInputRef = useRef(null);
	const fetchIntervalRef = useRef(null);

	const fetchProducts = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/products");
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();

			if (data.length === 0) {
				setOriginalData([]);
				setFilteredData([]);
			} else {
				setOriginalData(data);
				setFilteredData(data);
			}
			setLoading(false);
			setError(null);
		} catch (err) {
			setError(err.message);
			setOriginalData([]);
			setFilteredData([]);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();

		fetchIntervalRef.current = setInterval(() => {
			fetchProducts();
		}, 500);

		return () => {
			if (fetchIntervalRef.current) {
				clearInterval(fetchIntervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (searchQuery) {
			const lowercasedQuery = searchQuery.toLowerCase();
			const filtered = originalData.filter((product) =>
				product.product_name.toLowerCase().includes(lowercasedQuery),
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(originalData);
			setSelectedRow(null);
			setIsSelectionEnabled(false);
		}
	}, [searchQuery, originalData]);

	useEffect(() => {
		if (
			selectedRow !== null &&
			selectedRowRef.current &&
			tableRef.current
		) {
			const tableContainer = tableRef.current;
			const selectedElement = selectedRowRef.current;

			const containerRect = tableContainer.getBoundingClientRect();
			const elementRect = selectedElement.getBoundingClientRect();

			if (elementRect.bottom > containerRect.bottom) {
				selectedElement.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
				});
			} else if (elementRect.top < containerRect.top) {
				selectedElement.scrollIntoView({
					block: "start",
					behavior: "smooth",
				});
			}
		}
	}, [selectedRow]);

	const handleKeyDown = (e) => {
		if (
			!isSelectionEnabled &&
			e.key === "Enter" &&
			searchQuery &&
			filteredData.length > 0
		) {
			e.preventDefault();
			setIsSelectionEnabled(true);
			setSelectedRow(0);
			return;
		}

		if (!isSelectionEnabled) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedRow((prev) =>
				prev === null ? 0 : Math.min(prev + 1, filteredData.length - 1),
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedRow((prev) =>
				prev === null ? null : Math.max(prev - 1, 0),
			);
		} else if (e.key === "Enter" && selectedRow !== null) {
			handleAddProduct(filteredData[selectedRow]);
		} else if (e.key === "Escape") {
			setIsSelectionEnabled(false);
			setSelectedRow(null);
			setSearchQuery("");
			searchInputRef.current?.focus();
		}
	};

	const handleAddProduct = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	if (loading) {
		return (
			<div className="py-1 h-[40vh]">
				<div className="bg-white shadow-md rounded-lg h-full flex flex-col items-center justify-center">
					<p className="text-gray-500">Loading products...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-1 h-[40vh]" tabIndex={0} onKeyDown={handleKeyDown}>
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					searchInputRef={searchInputRef}
					setIsSelectionEnabled={setIsSelectionEnabled}
					setSelectedRow={setSelectedRow}
				/>
				<ProductsTable
					filteredData={filteredData}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					isSelectionEnabled={isSelectionEnabled}
					tableRef={tableRef}
					selectedRowRef={selectedRowRef}
					handleRowDoubleClick={handleAddProduct}
					error={error}
				/>
			</div>
			{isModalOpen && selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
}

export default SalesMainAllProducts;

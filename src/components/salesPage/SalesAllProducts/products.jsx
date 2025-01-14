import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";
import nodeUrl from "../../../links";

function SalesMainAllProducts() {
	const [searchQuery, setSearchQuery] = useState("");
	const [originalData, setOriginalData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [displayedData, setDisplayedData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [isSelectionEnabled, setIsSelectionEnabled] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const [page, setPage] = useState(1);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const itemsPerPage = 50;

	const tableRef = useRef(null);
	const selectedRowRef = useRef(null);
	const searchInputRef = useRef(null);
	const fetchIntervalRef = useRef(null);
	const lastFetchTime = useRef(0);
	const currentData = useRef([]);
	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");

	const fetchProducts = useCallback(async () => {
		const now = Date.now();
		if (now - lastFetchTime.current < 500) return;

		try {
			const response = await fetch(
				`${nodeUrl}/api/get/sync/${deviceId}/${ksbId}`,
				{
					method: "POST",
				},
			);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const result = await response.json();
			const data = result.products || [];

			if (JSON.stringify(currentData.current) !== JSON.stringify(data)) {
				currentData.current = data;
				setOriginalData(data);

				if (!isSearching) {
					setFilteredData(data);
					// Only set initial display data if none exists
					if (displayedData.length === 0) {
						setDisplayedData(data.slice(0, itemsPerPage));
					}
				}
			}

			setLoading(false);
			setError(null);
			lastFetchTime.current = now;
		} catch (err) {
			setError(err.message);
			setOriginalData([]);
			if (!isSearching) {
				setFilteredData([]);
				setDisplayedData([]);
			}
			setLoading(false);
		}
	}, [isSearching, displayedData.length, deviceId, ksbId]);

	useEffect(() => {
		fetchProducts();

		fetchIntervalRef.current = setInterval(() => {
			if (!isLoadingMore) {
				fetchProducts();
			}
		}, 500);

		return () => {
			if (fetchIntervalRef.current) {
				clearInterval(fetchIntervalRef.current);
			}
		};
	}, [fetchProducts, isLoadingMore]);

	useEffect(() => {
		if (searchQuery) {
			setIsSearching(true);
			const lowercasedQuery = searchQuery.toLowerCase();
			const filtered = originalData.filter((product) =>
				product.name?.toLowerCase().includes(lowercasedQuery),
			);
			setFilteredData(filtered);
			setPage(1);
			setDisplayedData(filtered.slice(0, itemsPerPage));
		} else {
			setIsSearching(false);
			setFilteredData(originalData);
			setPage(1);
			setDisplayedData(originalData.slice(0, itemsPerPage));
			setSelectedRow(null);
			setIsSelectionEnabled(false);
		}
	}, [searchQuery, originalData]);

	const loadMoreItems = useCallback(() => {
		if (isLoadingMore) return;
		setIsLoadingMore(true);

		const nextPage = page + 1;
		const startIndex = 0;
		const endIndex = nextPage * itemsPerPage;
		const newItems = filteredData.slice(startIndex, endIndex);

		setDisplayedData(newItems);
		setPage(nextPage);
		setIsLoadingMore(false);
	}, [filteredData, page, isLoadingMore]);

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
				prev === null
					? 0
					: Math.min(prev + 1, displayedData.length - 1),
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedRow((prev) =>
				prev === null ? null : Math.max(prev - 1, 0),
			);
		} else if (e.key === "Enter" && selectedRow !== null) {
			handleAddProduct(displayedData[selectedRow]);
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
		<div
			className="py-1 h-[50vh] focus:outline-none"
			tabIndex={0}
			onKeyDown={handleKeyDown}
			style={{ outline: "none" }}
		>
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					searchInputRef={searchInputRef}
					setIsSelectionEnabled={setIsSelectionEnabled}
					setSelectedRow={setSelectedRow}
				/>
				<ProductsTable
					filteredData={displayedData}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					isSelectionEnabled={isSelectionEnabled}
					tableRef={tableRef}
					selectedRowRef={selectedRowRef}
					handleRowDoubleClick={handleAddProduct}
					error={error}
					onLoadMore={loadMoreItems}
					hasMore={displayedData.length < filteredData.length}
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

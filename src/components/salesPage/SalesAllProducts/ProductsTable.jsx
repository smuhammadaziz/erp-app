import React, { useState, useEffect, useCallback, useRef } from "react";
import nodeUrl from "../../../links";
import CustomScroll from "./CustomScroll";

function ProductsTable({
	filteredData,
	selectedRow,
	setSelectedRow,
	isSelectionEnabled,
	tableRef,
	selectedRowRef,
	handleRowDoubleClick,
	error,
	onLoadMore,
	hasMore,
}) {
	const [currencyData, setCurrencyData] = useState({});
	const [warehouseData, setWarehouseData] = useState({});
	const [clickedRow, setClickedRow] = useState(null);
	const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
	const loadingRef = useRef(null);

	const settingsWarehouse = JSON.parse(
		localStorage.getItem("settingsWarehouse"),
	);

	const observer = useRef(null);
	const lastRowRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						onLoadMore();
					}
					if (entries[0].isIntersecting && !hasMore) {
						entries[0].target.scrollIntoView({
							block: "nearest",
							behavior: "smooth",
						});

						setSelectedCell({ row: null, col: null });
						setClickedRow(null);
						setSelectedRow(null);
					}
				},
				{
					root: tableRef.current,
					rootMargin: "100px",
					threshold: 0.1,
				},
			);

			if (node) observer.current.observe(node);
		},
		[hasMore, onLoadMore, tableRef, setSelectedRow],
	);

	const fetchCurrencyData = useCallback(async () => {
		for (const product of filteredData) {
			if (product.currency && !currencyData[product.currency]) {
				const deviceId = localStorage.getItem("device_id");
				const ksbId = localStorage.getItem("ksbIdNumber");

				try {
					const response = await fetch(
						`${nodeUrl}/api/get/currency/data/${deviceId}/${ksbId}/${product.currency}`,
					);
					const data = await response.json();
					setCurrencyData((prev) => ({
						...prev,
						[product.currency]: data[0]?.name || "-",
					}));
				} catch (error) {
					console.error("Failed to fetch currency data", error);
					setCurrencyData((prev) => ({
						...prev,
						[product.currency]: "-",
					}));
				}
			}
		}
	}, [filteredData, currencyData]);

	useEffect(() => {
		fetchCurrencyData();
	}, [fetchCurrencyData]);

	const fetchWarehouseData = useCallback(async () => {
		for (const product of filteredData) {
			if (
				product.stock[0].warehouse &&
				!warehouseData[product.stock[0].warehouse]
			) {
				const deviceId = localStorage.getItem("device_id");
				const ksbId = localStorage.getItem("ksbIdNumber");

				try {
					if (
						!Array.isArray(settingsWarehouse) ||
						settingsWarehouse.length === 0
					) {
						throw new Error("Invalid settingsWarehouse data");
					}

					const response = await fetch(
						`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbId}/${product.stock[0].warehouse}`,
					);

					const apiData = await response.json();

					const warehouseData = settingsWarehouse.reduce(
						(acc, warehouseId) => {
							const matchedWarehouse = apiData.find(
								(item) => item.item_id === warehouseId,
							);

							acc[warehouseId] = matchedWarehouse
								? matchedWarehouse.name
								: "-";
							return acc;
						},
						{},
					);

					setWarehouseData((prev) => ({
						...prev,
						...warehouseData,
					}));
				} catch (error) {
					console.error(
						"Error fetching or processing warehouse data",
						error,
					);
				}
			}
		}
	}, [filteredData, warehouseData]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	const handleKeyDown = useCallback(
		(e) => {
			if (!selectedCell.row && selectedCell.row !== 0) return;
			if (isSelectionEnabled) return;

			const totalColumns = 7;
			const totalRows = filteredData.length;

			switch (e.key) {
				case "ArrowUp":
					e.preventDefault();
					const newUpRow = Math.max(0, selectedCell.row - 1);
					setSelectedCell((prev) => ({
						row: newUpRow,
						col: prev.col,
					}));
					const upRowElement = document.querySelector(
						`tr[data-row-index="${newUpRow}"]`,
					);
					if (upRowElement) {
						upRowElement.scrollIntoView({
							block: "nearest",
							behavior: "smooth",
						});
					}
					break;
				case "ArrowDown":
					e.preventDefault();
					const newDownRow = Math.min(
						totalRows - 1,
						selectedCell.row + 1,
					);
					setSelectedCell((prev) => ({
						row: newDownRow,
						col: prev.col,
					}));
					const downRowElement = document.querySelector(
						`tr[data-row-index="${newDownRow}"]`,
					);
					if (downRowElement) {
						downRowElement.scrollIntoView({
							block: "nearest",
							behavior: "smooth",
						});
					}
					break;
				case "ArrowLeft":
					e.preventDefault();
					setSelectedCell((prev) => ({
						row: prev.row,
						col: Math.max(0, prev.col - 1),
					}));
					break;
				case "ArrowRight":
					e.preventDefault();
					setSelectedCell((prev) => ({
						row: prev.row,
						col: Math.min(totalColumns - 1, prev.col + 1),
					}));
					break;
				default:
					break;
			}
		},
		[selectedCell.row, filteredData.length, isSelectionEnabled],
	);

	useEffect(() => {
		if (isSelectionEnabled) {
			setSelectedCell({ row: null, col: null });
			setClickedRow(null);
		}
	}, [isSelectionEnabled]);

	useEffect(() => {
		if (
			selectedRow !== null &&
			selectedRow !== undefined &&
			filteredData.length > 0
		) {
			const selectedRowElement = document.querySelector(
				`tr[data-row-index="${selectedRow}"]`,
			);

			if (selectedRowElement) {
				selectedRowElement.scrollIntoView({
					block: "center",
					behavior: "smooth",
				});
			}
		}
	}, [selectedRow, filteredData]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<CustomScroll
			className="flex-1 focus:outline-none"
			ref={tableRef}
			style={{ outline: "none" }}
		>
			<table
				className="min-w-full bg-white border border-gray-200 focus:outline-none"
				style={{ outline: "none" }}
			>
				<thead className="sticky top-0 bg-gray-100 shadow-sm">
					<tr className="text-gray-700 uppercase text-xs">
						<th className="py-1.5 px-5 border-b border-r text-left">
							Product Name
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center">
							Currency
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center">
							Remaining
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center">
							Price (Currency)
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center">
							Price (UZS)
						</th>
						<th className="py-1.5 px-5 border-b text-center">
							Warehouse
						</th>
					</tr>
				</thead>
				<tbody>
					{error ? (
						<tr>
							<td
								colSpan="7"
								className="py-3 text-center text-red-500"
							>
								{error}
								<p className="text-xs text-gray-500 mt-1">
									Cannot fetch products. Please check your
									server connection.
								</p>
							</td>
						</tr>
					) : filteredData.length > 0 ? (
						<>
							{filteredData.map((product, index) => (
								<tr
									key={product.product_id}
									data-row-index={index}
									ref={
										index === filteredData.length - 1
											? lastRowRef
											: selectedRow === index
											? selectedRowRef
											: null
									}
									onClick={() => {
										if (!isSelectionEnabled) {
											setClickedRow(index);
											setSelectedCell({
												row: null,
												col: null,
											});
										}
									}}
									className={`text-gray-800 font-semibold cursor-pointer text-xs  transition-all duration-150 focus:outline-none ${
										selectedRow === index &&
										isSelectionEnabled
											? "bg-blue-500 text-white"
											: !isSelectionEnabled &&
											  (clickedRow === index
													? "bg-slate-300 text-black hover:bg-slate-300 hover:text-black"
													: selectedCell.row === index
													? "bg-slate-300 text-black hover:bg-slate-300 hover:text-black"
													: "hover:bg-slate-50")
									}`}
									style={{ outline: "none" }}
									onDoubleClick={() =>
										handleRowDoubleClick(product)
									}
								>
									<td
										className={`py-1.5 px-5 border-b border-r text-left ${
											selectedCell.row === index &&
											selectedCell.col === 1
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 1,
												});
											}
										}}
									>
										{product.name}
									</td>
									<td
										className={`py-1.5 px-5 border-b border-r text-center ${
											selectedCell.row === index &&
											selectedCell.col === 2
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 2,
												});
											}
										}}
									>
										{product.currency
											? currencyData[product.currency] ||
											  "-"
											: "-"}
									</td>
									<td
										className={`py-1.5 px-5 border-b border-r text-right ${
											selectedCell.row === index &&
											selectedCell.col === 3
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 3,
												});
											}
										}}
									>
										{product.stock[0].qty}
									</td>
									<td
										className={`py-1.5 px-5 border-b border-r text-right ${
											selectedCell.row === index &&
											selectedCell.col === 4
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 4,
												});
											}
										}}
									>
										{product.price_in_currency} narxi
										valyuta
									</td>
									<td
										className={`py-1.5 px-5 border-b border-r text-right ${
											selectedCell.row === index &&
											selectedCell.col === 5
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 5,
												});
											}
										}}
									>
										{product.price[0].sale.toLocaleString(
											"ru-RU",
											{
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											},
										)}
									</td>
									<td
										className={`py-1 px-5 border-b text-left ${
											selectedCell.row === index &&
											selectedCell.col === 6
												? "bg-blue-500 text-white"
												: ""
										}`}
										onClick={(e) => {
											if (!isSelectionEnabled) {
												e.stopPropagation();
												setSelectedCell({
													row: index,
													col: 6,
												});
											}
										}}
									>
										{product.stock?.[0]?.warehouse
											? warehouseData?.[
													product.stock[0].warehouse
											  ] || "-"
											: "-"}
									</td>
								</tr>
							))}
							{hasMore && (
								<tr ref={loadingRef}>
									<td
										colSpan="7"
										className="py-2 text-center"
									>
										<div className="text-sm text-gray-500">
											Loading more products...
										</div>
									</td>
								</tr>
							)}
						</>
					) : (
						<tr>
							<td
								colSpan="7"
								className="py-3 text-center text-gray-500"
							>
								No products found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</CustomScroll>
	);
}

export default ProductsTable;

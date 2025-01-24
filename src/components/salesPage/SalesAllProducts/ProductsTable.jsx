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
	mouseSelectedRow,
	setMouseSelectedRow,
	tableClickedRow,
	setTableClickedRow,
}) {
	const [currencyData, setCurrencyData] = useState({});
	const [warehouseData, setWarehouseData] = useState({});
	const [clickedRow, setClickedRow] = useState(null);
	const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
	const [currencyKey, setCurrencyKey] = useState(
		localStorage.getItem("currencyKey"),
	);
	const [priceTypeKey, setPriceKeyKey] = useState(
		localStorage.getItem("priceTypeKey"),
	);
	const loadingRef = useRef(null);

	const [currencyRateData, setCurrencyRateData] = useState("");

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

					if (data[0]?.key) {
						setCurrencyRateData(data[0].key);
					}
				} catch (error) {
					console.error("Failed to fetch currency data", error);
					setCurrencyData((prev) => ({
						...prev,
						[product.currency]: "-",
					}));
				}
			}
		}
	}, [filteredData]);

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

					setWarehouseData((prev) => ({ ...prev, ...warehouseData }));
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

	const [names, setNames] = useState({});

	useEffect(() => {
		const fetchAllNames = async () => {
			const nameMap = {};
			for (const product of filteredData) {
				for (const item of product.price) {
					const name = await fetchPriceName(item.type);
					if (name) {
						nameMap[item.type] = name;
					}
				}
			}
			setNames(nameMap);
		};
		fetchAllNames();
	}, [filteredData]);

	const fetchPriceName = async (item_id) => {
		const deviceId = localStorage.getItem("device_id");
		const ksbId = localStorage.getItem("ksbIdNumber");
		try {
			const response = await fetch(
				`${nodeUrl}/api/get/price/data/${deviceId}/${ksbId}/${item_id}`,
			);
			const data = await response.json();

			return data[0]?.item_id;
		} catch (err) {
			console.error("Error fetching price name:", err);
			return null;
		}
	};

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

	useEffect(() => {
		const handleCurrencyChange = () => {
			const newCurrencyKey = localStorage.getItem("currencyKey");
			setCurrencyKey(newCurrencyKey);
		};

		window.addEventListener("currencyChanged", handleCurrencyChange);

		return () => {
			window.removeEventListener("currencyChanged", handleCurrencyChange);
		};
	}, []);

	useEffect(() => {
		const handlePriceTypeChange = () => {
			const newPriceTypeKey = localStorage.getItem("priceTypeKey");
			setPriceKeyKey(newPriceTypeKey);
		};

		window.addEventListener("priceTypeChanged", handlePriceTypeChange);

		return () => {
			window.removeEventListener(
				"priceTypeChanged",
				handlePriceTypeChange,
			);
		};
	}, []);

	const currencyKeyData = localStorage.getItem("currencyKey");
	const priceTypeKeyData = localStorage.getItem("priceTypeKey");
	const matchingProductByCurrency = localStorage.getItem(
		"matchingProductByCurrency",
	);
	const falseCurrencyBoolean = localStorage.getItem("falseCurrencyBoolean");

	const [sortingOrder, setSortingOrder] = useState("asc");

	const sortData = (order) => {
		return [...filteredData].sort((a, b) => {
			if (order === "asc") {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
	};

	const handleSort = () => {
		const newOrder = sortingOrder === "asc" ? "desc" : "asc";
		setSortingOrder(newOrder);
		sortData(newOrder);
	};

	return (
		<CustomScroll
			className="flex-1 focus:outline-none"
			ref={tableRef}
			style={{ outline: "none" }}
		>
			<table
				className="min-w-full bg-white border border-gray-200 focus:outline-none table-fixed"
				style={{ outline: "none" }}
			>
				<thead className="sticky top-0 bg-gray-100 shadow-sm">
					<tr className="text-gray-700 uppercase text-xs">
						<th
							className="py-1.5 px-5 border-b border-r text-center w-1/2 min-w-[300px] cursor-pointer"
							// onClick={handleSort}
						>
							Наименование, производитель
							{/* <span className="ml-2">
								{sortingOrder === "asc" ? "▲" : "▼"}
							</span> */}
						</th>

						<th className="py-1.5 px-5 border-b border-r text-center w-1/10 min-w-[50px]">
							Валюта
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center w-1/10 min-w-[50px]">
							Остатка
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center w-1/10 min-w-[150px]">
							Нархи, Валюта
						</th>
						<th className="py-1.5 px-5 border-b border-r text-center w-1/10 min-w-[150px]">
							Нархи
						</th>
						<th className="py-1.5 px-5 border-b text-center w-1/10 min-w-[120px]">
							Склад
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
									Ошибка
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
											setTableClickedRow(index);
											setSelectedCell({
												row: null,
												col: null,
											});
											setSelectedRow(null);
										} else {
											setSelectedRow(null);
											setTableClickedRow(null);
											setSelectedCell({
												row: null,
												col: null,
											});
											setMouseSelectedRow(index);
										}
									}}
									className={`text-gray-800 font-semibold cursor-pointer text-xs transition-all duration-150 focus:outline-none ${
										selectedRow === index &&
										isSelectionEnabled &&
										!mouseSelectedRow
											? "bg-blue-500 text-white"
											: mouseSelectedRow === index
											? "bg-blue-500 text-white"
											: !isSelectionEnabled &&
											  (tableClickedRow === index
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
										className={`py-1.5 px-5 border-b border-r text-left w-1/4 min-w-[200px] ${
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
										className={`py-1.5 px-5 border-b border-r text-center w-1/10 min-w-[50px] ${
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
										{(() => {
											const isMatchingProduct =
												matchingProductByCurrency ===
												"true";

											const matchingPrice =
												product.price.find(
													(price) =>
														price.type ===
														priceTypeKeyData,
												);

											if (!matchingPrice) {
												return "";
											}

											if (product.currency) {
												if (
													currencyKeyData !==
													product.currency
												) {
													return currencyData[
														product.currency
													];
												} else {
													if (isMatchingProduct) {
														return currencyData[
															product.currency
														];
													} else {
														return currencyData[
															falseCurrencyBoolean
														];
													}
												}
											}

											return "";
										})()}
									</td>
									<td
										className={`py-1.5 px-5 border-b border-r text-right w-1/10 min-w-[50px] ${
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
										className={`py-1.5 px-5 border-b border-r text-right w-1/10 min-w-[120px] ${
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
										{(() => {
											const convertedPrice = (
												originalPrice,
											) => {
												const matchingPrice =
													product.price.find(
														(price) =>
															price.type ===
															priceTypeKeyData,
													);

												if (!matchingPrice) {
													return "-";
												}

												if (
													String(currencyKeyData) ===
													product.currency
												) {
													return "-";
												} else {
													return matchingPrice.sale.toLocaleString(
														"ru-RU",
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														},
													);
												}
											};

											const showingPriceData =
												convertedPrice();

											return showingPriceData === "-"
												? showingPriceData
												: showingPriceData.toLocaleString(
														"ru-RU",
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														},
												  );
										})()}
									</td>
									<td
										className={`py-0.5 px-5 border-b border-r text-base font-bold text-right w-1/10 min-w-[120px] ${
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
										{(() => {
											const currencyRateDataKey =
												JSON.parse(
													localStorage.getItem(
														"currency_rate",
													) || "{}",
												);

											const matchingPrice =
												product.price.find(
													(price) =>
														price.type ===
														priceTypeKeyData,
												);

											if (!matchingPrice) {
												return "-";
											}

											const convertPrice = (
												originalPrice,
											) => {
												if (
													currencyKeyData ==
													product.currency
												) {
													return originalPrice;
												} else {
													if (
														currencyKeyData ==
														"e51e4ee5-d689-11e7-b79f-00ac1948df3a"
													) {
														return (
															originalPrice /
															currencyRateDataKey.usd
														);
													} else if (
														currencyKeyData ==
														"e51e4ee6-d689-11e7-b79f-00ac1948df3a"
													) {
														return (
															originalPrice *
															currencyRateDataKey.usd
														);
													} else {
														return originalPrice;
													}
												}
											};

											const convertedPrice = convertPrice(
												matchingPrice.sale,
											);

											return convertedPrice.toLocaleString(
												"ru-RU",
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												},
											);
										})()}
									</td>
									<td
										className={`py-1 px-5 border-b text-left w-1/10 min-w-[120px] ${
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

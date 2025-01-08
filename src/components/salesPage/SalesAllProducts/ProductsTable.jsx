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
	const loadingRef = useRef(null);

	const observer = useRef(null);
	const lastRowRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						onLoadMore();
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
		[hasMore, onLoadMore],
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
					const response = await fetch(
						`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbId}/${product.stock[0].warehouse}`,
					);
					const data = await response.json();
					setWarehouseData((prev) => ({
						...prev,
						[product.stock[0].warehouse]: data[0]?.name || "-",
					}));
				} catch (error) {
					console.error("Failed to fetch currency data", error);
					setWarehouseData((prev) => ({
						...prev,
						[product.stock[0].warehouse]: "-",
					}));
				}
			}
		}
	}, [filteredData, warehouseData]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	return (
		<CustomScroll className="flex-1" ref={tableRef}>
			<table className="min-w-full bg-white border border-gray-200">
				<thead className="sticky top-0 bg-gray-100 shadow-sm">
					<tr className="text-gray-700 uppercase text-xs">
						<th className="py-1.5 px-5 border-b border-r text-left">
							#
						</th>
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
										}
									}}
									className={`text-gray-800 font-semibold cursor-pointer text-xs hover:bg-slate-50 transition-all duration-150 ${
										selectedRow === index &&
										isSelectionEnabled
											? "bg-orange-200"
											: clickedRow === index
											? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
											: ""
									}`}
									onDoubleClick={() =>
										handleRowDoubleClick(product)
									}
								>
									<td className="py-1.5 px-5 border-b border-r text-left">
										{index + 1}
									</td>
									<td className="py-1.5 px-5 border-b border-r text-left">
										{product.name}
									</td>
									<td className="py-1.5 px-5 border-b border-r text-center">
										{product.currency
											? currencyData[product.currency] ||
											  "-"
											: "-"}
									</td>
									<td className="py-1.5 px-5 border-b border-r text-center">
										{product.stock[0].qty}
									</td>
									<td className="py-1.5 px-5 border-b border-r text-center">
										{product.price_in_currency} narxi
										valyuta
									</td>
									<td className="py-1.5 px-5 border-b border-r text-center">
										{product.price[0].sale.toLocaleString(
											"ru-RU",
											{
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											},
										)}
									</td>
									<td className="py-1 px-5 border-b text-center">
										{product.stock[0].warehouse
											? warehouseData[
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


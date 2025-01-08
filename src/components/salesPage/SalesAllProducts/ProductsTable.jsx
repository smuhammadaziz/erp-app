import React, { useState, useEffect, useCallback } from "react";
import nodeUrl from "../../../links";

function ProductsTable({
	filteredData,
	selectedRow,
	setSelectedRow,
	isSelectionEnabled,
	tableRef,
	selectedRowRef,
	handleRowDoubleClick,
	error,
}) {
	const [currencyData, setCurrencyData] = useState({});
	const [warehouseData, setWarehouseData] = useState({});
	const displatedData = filteredData.slice(0, 50);

	const fetchCurrencyData = useCallback(async () => {
		for (const product of displatedData) {
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
	}, [displatedData, currencyData]);

	useEffect(() => {
		fetchCurrencyData();
	}, [fetchCurrencyData]);

	const fetchWarehouseData = useCallback(async () => {
		for (const product of displatedData) {
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
	}, [displatedData, warehouseData]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	return (
		<div className="overflow-y-auto flex-1" ref={tableRef}>
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
					) : displatedData.length > 0 ? (
						displatedData.map((product, index) => (
							<tr
								key={product.product_id}
								ref={
									selectedRow === index
										? selectedRowRef
										: null
								}
								className={`text-gray-800 font-semibold text-xs hover:bg-slate-200 ${
									selectedRow === index && isSelectionEnabled
										? "bg-orange-200"
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
										? currencyData[product.currency] || "-"
										: "-"}
								</td>
								<td className="py-1.5 px-5 border-b border-r text-center">
									{product.stock[0].qty}
								</td>
								<td className="py-1.5 px-5 border-b border-r text-center">
									{product.price_in_currency} narxi valyuta
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
						))
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
		</div>
	);
}

export default ProductsTable;


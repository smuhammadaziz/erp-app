import React, { useState, useEffect } from "react";
import {
	BiPackage,
	BiStore,
	BiTag,
	BiMoney,
	BiBookmark,
	BiBuilding,
	BiCoinStack,
	BiBarcode,
	BiCopy,
	BiCheck,
} from "react-icons/bi";

import nodeUrl from "../../../links";

const ProductViewDetails = ({ product }) => {
	const [activeMenu, setActiveMenu] = useState("Main");
	const [currencyName, setCurrencyName] = useState("");
	const [symbolName, setSymbolName] = useState("");
	const [warehouseName, setwarehouseName] = useState("");
	const [priceTypeName, setpriceTypeName] = useState("");
	const [copiedField, setCopiedField] = useState(null);

	const deviceId = localStorage.getItem("device_id");
	const ksbIdNumber = localStorage.getItem("ksbIdNumber");

	if (!product) return null;

	// Your existing useEffect hooks remain the same...
	useEffect(() => {
		const fetchCurrencyData = async () => {
			if (product.currency) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/currency/data/${deviceId}/${ksbIdNumber}/${product.currency}`,
					);
					const data = await response.json();
					const currencyData =
						data?.[0]?.name || "Currency not found";
					setCurrencyName(currencyData);
				} catch (error) {
					console.error("Error fetching currency data", error);
					setCurrencyName("Error loading currency");
				}
			}
		};

		fetchCurrencyData();
	}, [product.currency]);

	useEffect(() => {
		const fetchCurrencyData = async () => {
			if (product.symbol) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/symbol/data/${deviceId}/${ksbIdNumber}/${product.symbol}`,
					);
					const data = await response.json();
					const currencyData =
						data?.[0]?.name || "Currency not found";
					setSymbolName(currencyData);
				} catch (error) {
					console.error("Error fetching currency data", error);
					setCurrencyName("Error loading currency");
				}
			}
		};

		fetchCurrencyData();
	}, [product.symbol]);

	useEffect(() => {
		const fetchCurrencyData = async () => {
			if (product.stock[0].warehouse) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbIdNumber}/${product.stock[0].warehouse}`,
					);
					const data = await response.json();
					const warehouseData =
						data?.[0]?.name || "Warehouse not found";
					setwarehouseName(warehouseData);
				} catch (error) {
					console.error("Error fetching currency data", error);
					setwarehouseName("Error loading warehouse ID");
				}
			}
		};

		fetchCurrencyData();
	}, [product.stock[0].warehouse]);

	useEffect(() => {
		const fetchCurrencyData = async () => {
			if (product.price[0].type) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/price/data/${deviceId}/${ksbIdNumber}/${product.price[0].type}`,
					);
					const data = await response.json();
					const warehouseData =
						data?.[0]?.name || "Price Type not found";
					setpriceTypeName(warehouseData);
				} catch (error) {
					console.error("Error fetching currency data", error);
					setwarehouseName("Error loading warehouse ID");
				}
			}
		};

		fetchCurrencyData();
	}, [product.price[0].type]);

	const handleCopy = (value, key) => {
		navigator.clipboard.writeText(String(value));
		setCopiedField(key);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const renderMainContent = () => {
		// Define the order of fields we want to display
		const fieldsToShow = ["name", "symbol", "currency", "type", "box"];

		// Add article only if it exists in product
		if (product.article) {
			fieldsToShow.splice(3, 0, "article"); // Insert article after currency
		}

		return (
			<div className="grid grid-cols-2 gap-4">
				{fieldsToShow.map((key) => {
					// Skip if the field doesn't exist in product
					if (!product.hasOwnProperty(key)) return null;

					const displayValue =
						key === "currency"
							? currencyName
							: key === "symbol"
							? symbolName
							: product[key];

					return (
						<div key={key} className="relative group">
							<label
								htmlFor={key}
								className="block mb-1 text-sm font-medium text-gray-600"
							>
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</label>
							<input
								id={key}
								type="text"
								value={String(displayValue || "")}
								disabled
								className="w-full px-4 py-3 bg-gray-50 border border-gray-200 
										 rounded-md text-gray-700 cursor-text focus:outline-none 
										 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
							/>
							<button
								onClick={() => handleCopy(displayValue, key)}
								className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200"
								title="Copy to clipboard"
							>
								{copiedField === key ? (
									<div className="flex items-center text-green-500">
										<BiCheck size={20} />
									</div>
								) : (
									<BiCopy
										size={18}
										className="text-gray-500 hover:text-fuchsia-600"
									/>
								)}
							</button>
							{copiedField === key && (
								<div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
									Copied!
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	};

	// Your existing render functions for Stock, Price, and Barcodes remain the same...
	const renderStockContent = () => (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Name
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Quantity
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{product.stock.map((item, index) => (
					<tr key={index} className="hover:bg-gray-50">
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
							{warehouseName}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{item.qty}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const renderPriceContent = () => (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Name
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Sale
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{product.price.map((item, index) => (
					<tr key={index} className="hover:bg-gray-50">
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
							{priceTypeName}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{item.sale}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const renderBarcodesContent = () => (
		<div className="space-y-2">
			{product.barcode.map((code, index) => (
				<div
					key={index}
					className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md"
				>
					<BiBarcode size={24} className="text-gray-500" />
					<span className="text-gray-700">{code}</span>
				</div>
			))}
		</div>
	);

	return (
		<div className="bg-white">
			<div className="flex border-b">
				{["Main", "Stock", "Price", "Barcodes"].map((menu) => (
					<button
						key={menu}
						className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
							activeMenu === menu
								? "border-b-2 border-fuchsia-600 text-fuchsia-600"
								: "text-gray-500 hover:text-fuchsia-600 hover:bg-fuchsia-50"
						}`}
						onClick={() => setActiveMenu(menu)}
					>
						{menu}
					</button>
				))}
			</div>

			<div className="p-6 overflow-y-auto max-h-[600px]">
				{activeMenu === "Main" && renderMainContent()}
				{activeMenu === "Stock" && renderStockContent()}
				{activeMenu === "Price" && renderPriceContent()}
				{activeMenu === "Barcodes" && renderBarcodesContent()}
			</div>
		</div>
	);
};

export default ProductViewDetails;

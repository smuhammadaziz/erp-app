import React, { useEffect, useState, useCallback, useRef } from "react";
import { MdClear } from "react-icons/md";
import nodeUrl from "../../../links";

import content from "../../../localization/content";
import useLang from "../../../hooks/useLang";

function ProductModal({
	product,
	onClose,
	searchInputRef,
	searchQuery,
	setSearchQuery,
	onProductAdded,
}) {
	const [quantity, setQuantity] = useState(0);
	const [customPrice, setCustomPrice] = useState(null);
	const [showErrorModal, setShowErrorModal] = useState(false);
	// const [showEmpty, setShowEmpty] = useState(false);
	const [warehouseData, setWarehouseData] = useState({});

	const ksb_id = localStorage.getItem("ksbIdNumber");
	const sales_id = localStorage.getItem("sales_id");
	const device_id = localStorage.getItem("device_id");
	const priceTypeKey = localStorage.getItem("priceTypeKey");

	const quantityInputRef = useRef(null);
	const priceInputRef = useRef(null);
	const okButtonRef = useRef(null);

	const [language] = useLang("uz");

	useEffect(() => {
		quantityInputRef.current?.focus();
	}, []);

	// const settingsWarehouse = JSON.parse(
	// 	localStorage.getItem("settingsWarehouse"),
	// );

	const fetchWarehouseData = useCallback(async () => {
		if (product.stock[0].warehouse) {
			const deviceId = localStorage.getItem("device_id");
			const ksbId = localStorage.getItem("ksbIdNumber");

			try {
				const response = await fetch(
					`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbId}/${product.stock[0].warehouse}`,
				);
				const apiData = await response.json();

				const warehouseData = apiData.reduce((acc, item) => {
					acc[item.item_id] = item.name;
					return acc;
				}, {});

				setWarehouseData((prev) => ({ ...prev, ...warehouseData }));
			} catch (error) {
				console.error(
					"Error fetching or processing warehouse data",
					error,
				);
			}
		}
	}, [warehouseData, product.stock]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	const currencyKeyData = localStorage.getItem("currencyKey");
	const priceTypeKeyData = localStorage.getItem("priceTypeKey");

	const currencyRateDataKey = JSON.parse(
		localStorage.getItem("currency_rate") || "{}",
	);

	const matchingPrice = product.price.find(
		(price) => price.type === priceTypeKeyData,
	);

	const convertPrice = (originalPrice) => {
		if (currencyKeyData === product.currency) {
			return originalPrice;
		} else {
			if (currencyKeyData === "e51e4ee5-d689-11e7-b79f-00ac1948df3a") {
				return originalPrice / currencyRateDataKey.usd;
			} else if (
				currencyKeyData === "e51e4ee6-d689-11e7-b79f-00ac1948df3a"
			) {
				return originalPrice * currencyRateDataKey.usd;
			} else {
				return originalPrice;
			}
		}
	};

	const convertedPrice =
		customPrice !== null ? customPrice : convertPrice(matchingPrice.sale);

	const totalPrice = Number(quantity) * Number(convertedPrice);

	const handleClose = () => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
			searchInputRef.current.select();
		}
		onClose();
	};

	// const handlePriceFocus = (e) => {
	// 	e.target.select();
	// };

	const handleKeyDown = (e, currentField) => {
		if (e.ctrlKey && e.key === "Enter") {
			e.preventDefault();
			handleSubmit(e);
			return;
		}

		if (e.key === "Enter" && !e.ctrlKey) {
			e.preventDefault();
			switch (currentField) {
				case "quantity":
					priceInputRef.current?.focus();
					break;
				case "price":
					okButtonRef.current?.focus();
					break;
				case "okButton":
					handleSubmit(e);
					break;
				default:
					break;
			}
		}
	};

	const handlePriceChange = (e) => {
		if (changePriceValue) {
			const value = e.target.value.replace(/[^0-9.]/g, "");
			if (!isNaN(value) && value !== "") {
				setCustomPrice(Number(value));
			}
		}
	};

	const handleSubmit = async (e) => {
		if (e) {
			e.preventDefault();
		}

		if (quantity > product.stock[0].qty) {
			setShowErrorModal(true);
			return;
		}

		if (totalPrice === 0) {
			// setShowEmpty(true);
			return;
		}

		let productPriceType = 0;

		const matchedPrice = product.price.find(
			(item) => item.type === priceTypeKey,
		);

		if (matchedPrice) {
			productPriceType = matchedPrice.sale;
		} else {
			productPriceType = 0;
		}

		const mainWarehouseData = "e51e4ee3-d689-11e7-b79f-00ac1948df3a";

		// const mainCashData = "411c77fa-3d75-11e8-86d1-2089849ccd5a";

		const data = {
			device_id: device_id,
			product_id: product.product_id,
			product_name: product.name,
			count: quantity,
			price: convertedPrice,
			total_price: totalPrice,
			product_info: [product],
			product_warehouse: product.stock[0].warehouse,
			product_currency: product.currency,

			mainWarehouse: mainWarehouseData,
			mainPriceType: priceTypeKeyData,
			mainRate: currencyRateDataKey.usd,
			mainCurrency: currencyKeyData,
			mainComment: "hello",
			mainBelowCost: false,

			cash: null,
			currency: null,
			sum: null,
		};

		try {
			const response = await fetch(
				`${nodeUrl}/api/create/sales/${ksb_id}/${sales_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);

			if (response.ok) {
				const result = await response.json();
				if (result.id) {
					onProductAdded(result.id);
				}
				if (searchInputRef.current) {
					searchInputRef.current.focus();
					searchInputRef.current.select();
				}
				onClose();
			} else {
				console.error("Failed to submit data to the API");
			}
		} catch (error) {
			console.error("Error submitting the sell data:", error);
		}
	};

	const handleFocus = (e) => {
		if (e.target.value === "0") {
			setQuantity("");
		}
	};

	const handleBlur = (e) => {
		if (e.target.value === "") {
			setQuantity(0);
		}
	};

	const [changePriceValue] = useState(() => {
		const savedValue = localStorage.getItem("changePriceValue");
		return savedValue === "true";
	});

	useEffect(() => {
		localStorage.setItem("changePriceValue", changePriceValue);
	}, [changePriceValue]);

	if (!matchingPrice) {
		return "-";
	}

	return (
		<>
			<div
				className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
				data-no-autofocus
			>
				<div className="bg-white w-[760px] rounded-lg shadow-xl relative transform transition-all">
					{/* Header */}
					<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-800">
							Add Item
						</h2>
						<button
							onClick={handleClose}
							className="rounded-full p-1 hover:bg-gray-100 transition-colors"
						>
							<MdClear size={22} className="text-gray-500" />
						</button>
					</div>

					{/* Content */}
					<div className="p-6">
						<form onSubmit={handleSubmit}>
							{/* Product Info Section */}
							<div className="mb-6">
								<div className="grid grid-cols-12 gap-4 items-start">
									{/* Product Name */}
									<div className="col-span-12">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{
												content[language].salesPage
													.saleTableName
											}
										</label>
										<input
											type="text"
											value={product.name ?? ""}
											readOnly
											className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 focus:outline-none"
										/>
									</div>

									{/* Warehouse */}
									<div className="col-span-8">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{
												content[language].salesPage
													.saleTableWarehouse
											}
										</label>
										<input
											type="text"
											value={
												warehouseData[
													product.stock[0].warehouse
												] ?? ""
											}
											readOnly
											className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 focus:outline-none"
										/>
									</div>

									{/* Quantity in Stock */}
									<div className="col-span-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{
												content[language].salesPage
													.saleTableOstatka
											}
										</label>
										<input
											type="text"
											value={product.stock[0]?.qty ?? ""}
											readOnly
											className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 focus:outline-none"
										/>
									</div>
								</div>
							</div>

							{/* Divider */}
							<div className="border-t border-gray-200 my-5"></div>

							{/* Order Section */}
							<div className="grid grid-cols-12 gap-6">
								{/* Left Side - Quantity */}
								<div className="col-span-5">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										{
											content[language].salesPage
												.saleModalCount
										}
									</label>
									<input
										ref={quantityInputRef}
										type="number"
										value={quantity ?? ""}
										onFocus={handleFocus}
										onBlur={handleBlur}
										onKeyDown={(e) =>
											handleKeyDown(e, "quantity")
										}
										onChange={(e) =>
											setQuantity(e.target.value)
										}
										className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-md text-xl text-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
									/>
								</div>

								{/* Right Side - Price & Total */}
								<div className="col-span-7">
									{/* Unit Price */}
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{
												content[language].salesPage
													.saleTablePrice
											}
										</label>
										<input
											ref={priceInputRef}
											type="text"
											defaultValue={
												convertedPrice.toLocaleString(
													"ru-RU",
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													},
												) ?? ""
											}
											onKeyDown={(e) =>
												handleKeyDown(e, "price")
											}
											onChange={handlePriceChange}
											readOnly={!changePriceValue}
											className={`w-full px-4 py-3.5 rounded-md text-xl focus:ring-1 transition-all ${
												!changePriceValue
													? "bg-gray-50 border border-gray-200 text-gray-500"
													: "bg-white border border-gray-300 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
											}`}
										/>
									</div>

									{/* Total */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Total
										</label>
										<div className="bg-indigo-50 border border-indigo-100 rounded-md p-3">
											<div className="text-2xl font-semibold text-indigo-800 text-right">
												{totalPrice.toLocaleString(
													"ru-RU",
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													},
												)}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
								<button
									onClick={handleClose}
									className="px-5 py-2.5 border border-gray-300 bg-white text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-all"
								>
									{
										content[language].salesPage
											.headerDiscountCancel
									}
								</button>
								<button
									ref={okButtonRef}
									type="submit"
									onKeyDown={(e) =>
										handleKeyDown(e, "okButton")
									}
									className="px-8 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-all"
								>
									OK
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Error Modal */}
				{showErrorModal && (
					<div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[100]">
						<div className="bg-white w-[400px] rounded-lg shadow-xl overflow-hidden">
							<div className="px-4 py-3 bg-red-50 border-b border-red-100 flex items-center">
								<svg
									className="w-5 h-5 text-red-500 mr-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
								<h3 className="text-lg font-medium text-gray-800">
									Ошибка
								</h3>
							</div>
							<div className="p-4">
								<p className="text-gray-700">
									{
										content[language].salesPage
											.saleModalNotEnough
									}
								</p>
								<div className="mt-4 flex justify-end">
									<button
										onClick={() => setShowErrorModal(false)}
										className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all"
									>
										OK
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ProductModal;


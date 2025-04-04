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
	const [showEmpty, setShowEmpty] = useState(false);
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

	const settingsWarehouse = JSON.parse(
		localStorage.getItem("settingsWarehouse"),
	);

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
	}, [warehouseData]);

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
		if (currencyKeyData == product.currency) {
			return originalPrice;
		} else {
			if (currencyKeyData == "e51e4ee5-d689-11e7-b79f-00ac1948df3a") {
				return originalPrice / currencyRateDataKey.usd;
			} else if (
				currencyKeyData == "e51e4ee6-d689-11e7-b79f-00ac1948df3a"
			) {
				return originalPrice * currencyRateDataKey.usd;
			} else {
				return originalPrice;
			}
		}
	};

	const convertedPrice =
		customPrice !== null ? customPrice : convertPrice(matchingPrice.sale);

	const totalPrice =
		Number(String(quantity).replace(",", ".")) * Number(convertedPrice);

	const handleClose = () => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
			searchInputRef.current.select();
		}
		onClose();
	};

	const handlePriceFocus = (e) => {
		e.target.select();
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
			setShowEmpty(true);
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

		const mainCashData = "411c77fa-3d75-11e8-86d1-2089849ccd5a";

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

	const [changePriceValue, setChangePriceValue] = useState(() => {
		const savedValue = localStorage.getItem("changePriceValue");
		return savedValue === "true";
	});

	useEffect(() => {
		localStorage.setItem("changePriceValue", changePriceValue);
	}, [changePriceValue]);

	const deviceSettings = JSON.parse(localStorage.getItem("settingsDevice"));

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
							Маҳсулот қўшиш
						</h2>
						<button
							onClick={handleClose}
							className="rounded-full p-1 hover:bg-gray-100 transition-colors"
						>
							<MdClear size={22} className="text-gray-500" />
						</button>
					</div>

					<div className="p-6">
						<form onSubmit={handleSubmit}>
							<div className="mb-6">
								<div className="grid grid-cols-12 gap-4 items-start">
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

									<div className="col-span-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{
												content[language].salesPage
													.saleTableOstatka
											}
										</label>
										<input
											type="text"
											value={
												product.stock[0].qty.toLocaleString(
													"ru-RU",
													{
														minimumFractionDigits:
															deviceSettings
																.format
																.format_qty.max,
														maximumFractionDigits:
															deviceSettings
																.format
																.format_qty.max,
													},
												) ?? ""
											}
											readOnly
											className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 focus:outline-none"
										/>
									</div>
								</div>
							</div>

							<div className="border-t border-gray-200 my-5"></div>

							<div className="grid grid-cols-12 gap-6">
								<div className="col-span-5">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										{
											content[language].salesPage
												.saleModalCount
										}
									</label>
									<input
										ref={quantityInputRef}
										type="text"
										value={quantity ?? ""}
										onFocus={handleFocus}
										onBlur={(e) => {
											const value =
												e.target.value.replace(
													",",
													".",
												);
											if (value) {
												const numValue =
													parseFloat(value);
												if (!isNaN(numValue)) {
													const formattedValue =
														numValue.toFixed(
															deviceSettings
																.format
																.format_qty.max,
														);
													setQuantity(formattedValue);
												}
											}
											handleBlur(e);
										}}
										onKeyDown={(e) => {
											const value = e.target.value;
											const decimalIndex = Math.max(
												value.indexOf("."),
												value.indexOf(","),
											);

											if (
												(e.key === "." ||
													e.key === ",") &&
												decimalIndex !== -1
											) {
												e.preventDefault();
												return;
											}

											if (
												(decimalIndex === -1 &&
													value.length >=
														deviceSettings.format
															.format_qty
															.symbol &&
													![
														"Backspace",
														"Delete",
														"ArrowLeft",
														"ArrowRight",
														".",
														",",
													].includes(e.key)) ||
												(decimalIndex !== -1 &&
													value.length -
														decimalIndex >
														deviceSettings.format
															.format_qty.max &&
													![
														"Backspace",
														"Delete",
														"ArrowLeft",
														"ArrowRight",
													].includes(e.key))
											) {
												e.preventDefault();
											}

											if (
												!/^\d$/.test(e.key) &&
												![
													"Backspace",
													"Delete",
													"ArrowLeft",
													"ArrowRight",
													".",
													",",
												].includes(e.key)
											) {
												e.preventDefault();
											}

											handleKeyDown(e, "quantity");
										}}
										onChange={(e) => {
											let val = e.target.value;

											const dotIndex = val.indexOf(".");
											const commaIndex = val.indexOf(",");

											let decimalIndex = -1;
											if (
												dotIndex !== -1 &&
												commaIndex !== -1
											) {
												decimalIndex = Math.min(
													dotIndex,
													commaIndex,
												);
												val =
													val.substring(
														0,
														decimalIndex,
													) +
													val.charAt(decimalIndex) +
													val
														.substring(
															decimalIndex + 1,
														)
														.replace(/[.,]/g, "");
											} else {
												decimalIndex = Math.max(
													dotIndex,
													commaIndex,
												);
											}

											if (decimalIndex !== -1) {
												const wholePart = val
													.substring(0, decimalIndex)
													.slice(
														0,
														deviceSettings.format
															.format_qty.symbol,
													);
												let decimalPart = val
													.substring(decimalIndex + 1)
													.slice(
														0,
														deviceSettings.format
															.format_qty.max,
													);

												const separator =
													val.charAt(decimalIndex);
												val =
													wholePart +
													separator +
													decimalPart;
											} else {
												val = val.slice(
													0,
													deviceSettings.format
														.format_qty.symbol,
												);
											}

											val = val.replace(/[^\d.,]/g, "");

											setQuantity(val);
										}}
										inputMode="decimal"
										placeholder={`0.${"0".repeat(
											deviceSettings.format.format_qty
												.max,
										)}`}
										className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-md text-xl text-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
									/>
								</div>

								<div className="col-span-7">
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
														minimumFractionDigits:
															deviceSettings
																.format
																.format_sum.max,
														maximumFractionDigits:
															deviceSettings
																.format
																.format_sum.max,
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
										<div className="bg-indigo-50 border border-indigo-100 rounded-md p-3">
											<div className="text-2xl font-semibold text-indigo-800 text-right">
												{totalPrice.toLocaleString(
													"ru-RU",
													{
														minimumFractionDigits:
															deviceSettings
																.format
																.format_sum.max,
														maximumFractionDigits:
															deviceSettings
																.format
																.format_sum.max,
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


import React, { useState, useEffect, useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import nodeUrl from "../../../links";

import content from "../../../localization/content";
import useLang from "../../../hooks/useLang";

function SalesSoldProducts({ lastAddedProductId, socket }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [manualSelection, setManualSelection] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const tableRef = React.useRef(null);
	const selectedRowRef = useRef(null);
	const sales_id = localStorage.getItem("sales_id");
	const prevProductsRef = useRef([]);

	const [language] = useLang("uz");

	const scrollToSelectedRow = (rowId) => {
		if (!tableRef.current) return;
		const selectedRow = tableRef.current.querySelector(
			`tr[data-id="${rowId}"]`,
		);
		if (selectedRow) {
			selectedRow.scrollIntoView({
				block: "nearest",
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		fetchSoldProducts();

		const updateHandler = () => fetchSoldProducts();
		socket.on("gettingSoldProducts", updateHandler);

		return () => {
			socket.off("gettingSoldProducts", updateHandler);
		};
	}, [sales_id, lastAddedProductId]);

	const fetchSoldProducts = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/get/sales/${sales_id}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			const newProducts = data[sales_id]?.products || [];
			setProducts(newProducts);

			if (newProducts.length > 0 && !selectedRowId) {
				const lastProduct = newProducts[newProducts.length - 1];
				setSelectedRowId(lastProduct.id);
				scrollToSelectedRow(lastProduct.id);
			}

			setError(null);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const handleRowClick = (productId) => {
		setSelectedRowId(productId);
		scrollToSelectedRow(productId);
	};

	const deleteAllProducts = async (product_id) => {
		const salesId = localStorage.getItem("sales_id");
		const ksbId = localStorage.getItem("ksbIdNumber");
		if (!salesId) {
			alert("Sales ID not found in local storage!");
			return;
		}

		try {
			const response = await fetch(
				`${nodeUrl}/api/delete/sales/product/${salesId}/${ksbId}/${product_id}`,
				{
					method: "DELETE",
				},
			);

			if (response.ok) {
				console.log("removed");
			} else {
				console.log("no item to remove");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const [warehouseData, setWarehouseData] = useState({});

	const settingsWarehouse = JSON.parse(
		localStorage.getItem("settingsWarehouse"),
	);

	const fetchWarehouseData = async () => {
		for (const product of products) {
			if (
				product &&
				!warehouseData[product.product_info[0].stock[0].warehouse]
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
						`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbId}/${product.product_info[0].stock[0].warehouse}`,
					);

					const apiData = await response.json();

					const newWarehouseData = settingsWarehouse.reduce(
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
						...newWarehouseData,
					}));
				} catch (error) {
					console.error(
						"Error fetching or processing warehouse data",
						error,
					);
				}
			}
		}
	};

	useEffect(() => {
		fetchWarehouseData();
	}, [products, warehouseData]);

	useEffect(() => {
		if (selectedRowId) {
			scrollToSelectedRow(selectedRowId);
		}
	}, [selectedRowId]);

	return (
		<>
			<div className="py-1 h-[34vh] relative z-0">
				<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
					<div className="overflow-x-auto overflow-y-auto flex-grow">
						<table
							ref={tableRef}
							className="min-w-full bg-white border border-gray-200"
						>
							<thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
								<tr className="text-gray-700 uppercase text-xs ">
									<th className="py-2 px-5 border-b border-r border-gray-200 text-left w-[500px]">
										{content[language].salesPage.soldName}
									</th>
									<th className="py-2 px-5 border-b border-r border-gray-200 text-center w-[50px]">
										{content[language].salesPage.soldCount}
									</th>
									<th className="py-2 px-5 border-b border-r border-gray-200 text-center w-[120px]">
										{content[language].salesPage.soldPrice}
									</th>
									<th className="py-2 px-5 border-b border-gray-200 text-center w-[120px]">
										{content[language].salesPage.soldSumma}
									</th>
								</tr>
							</thead>
							<tbody>
								{error ? (
									<tr>
										<td
											colSpan="4"
											className="py-3 text-center text-red-500"
										>
											Error: {error}
										</td>
									</tr>
								) : loading ? (
									<tr>
										<td
											colSpan="4"
											className="py-3 text-center text-gray-500"
										>
											Loading...
										</td>
									</tr>
								) : products.length > 0 ? (
									products.map((product) => (
										<tr
											key={product.id}
											ref={
												product.id === selectedRowId
													? selectedRowRef
													: null
											}
											data-id={product.id}
											className={`text-gray-800 text-md group z-[1] relative cursor-pointer active:bg-gray-200 
												${
													selectedRowId === product.id
														? "bg-blue-500 text-white hover:bg-blue-600"
														: "hover:bg-gray-50"
												}`}
											onClick={() => {
												setSelectedRowId(product.id);
												scrollToSelectedRow(product.id);
											}}
											onDoubleClick={() => {
												setSelectedProduct(product);
												setIsModalOpen(true);
											}}
										>
											<td
												className="py-1 px-5 border-b border-r border-gray-200 w-[60%]"
												title={product.product_name}
											>
												<div className="flex justify-between w-full">
													<span className="text-left">
														{product.product_name}
													</span>
													<span className="text-right text-xs">
														{
															warehouseData[
																product
																	.product_info[0]
																	.stock[0]
																	.warehouse
															]
														}
													</span>
												</div>
											</td>

											<td
												className="py-1 px-5 border-b border-r border-gray-200 text-center w-[10%]"
												title={product.soni}
											>
												{product.soni}
											</td>
											<td
												className="py-1 px-5 border-b border-r border-gray-200 text-center w-[120px]"
												title={product.narxi}
											>
												{product.narxi.toLocaleString(
													"ru-RU",
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													},
												)}
											</td>
											<td
												className="py-1 px-5 border-b border-gray-200 text-center w-[120px] relative"
												title={product.summa}
											>
												<span>
													{product.summa.toLocaleString(
														"ru-RU",
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														},
													)}
												</span>
												<div className="absolute right-0 top-0 h-full flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
													<button
														onClick={(e) => {
															e.stopPropagation();
															deleteAllProducts(
																product.id,
															);
														}}
														className="flex items-center justify-center bg-red-500 text-white p-1 rounded-md px-2 hover:bg-red-700 focus:outline-none mr-2"
													>
														<FiTrash2 />
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="4"
											className="py-3 text-center text-gray-500"
										>
											{
												content[language].salesPage
													.soldNoProduct
											}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default SalesSoldProducts;


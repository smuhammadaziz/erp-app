import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import nodeUrl from "../../../links";
import ProductModal from "./soldProductModal";

function SalesSoldProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const tableRef = React.useRef(null);
	const sales_id = localStorage.getItem("sales_id");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/sales/${sales_id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();
				setProducts(data[sales_id]?.products || []);
				setError(null);
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		};
		const intervalId = setInterval(fetchProducts, 400);
		return () => clearInterval(intervalId);
	}, [nodeUrl, sales_id]);

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

	useEffect(() => {
		if (products.length > 0) {
			const lastProduct = products[products.length - 1];
			setSelectedRowId(lastProduct.id);
			const index = products.findIndex((p) => p.id === lastProduct.id);
			setSelectedIndex(index);
		}
	}, [products]);

	return (
		<>
			<div className="py-1 h-[33vh] relative z-0">
				<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
					<div className="overflow-x-auto overflow-y-auto flex-grow">
						<table
							ref={tableRef}
							className="min-w-full bg-white border border-gray-200"
						>
							<thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
								<tr className="text-gray-700 uppercase text-xs ">
									<th className="py-2 px-5 border-b border-r border-gray-200 text-left w-[500px]">
										Наименование
									</th>
									<th className="py-2 px-5 border-b border-r border-gray-200 text-center w-[50px]">
										Сони
									</th>
									<th className="py-2 px-5 border-b border-r border-gray-200 text-center w-[120px]">
										Нархи
									</th>
									<th className="py-2 px-5 border-b border-gray-200 text-center w-[120px]">
										Сумма
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
											data-id={product.id}
											className={`text-gray-800 text-md group z-[1] relative cursor-pointer active:bg-gray-200 ${
												selectedRowId === product.id
													? "bg-blue-500 text-white hover:bg-blue-600"
													: "hover:bg-gray-50"
											}`}
											onClick={() => {
												setSelectedRowId(product.id);
												const index =
													products.findIndex(
														(p) =>
															p.id === product.id,
													);
												setSelectedIndex(index);
												scrollToSelectedRow(product.id);
											}}
											onDoubleClick={() => {
												setSelectedProduct(product);
												setIsModalOpen(true);
											}}
										>
											<td
												className="py-1 px-5 border-b border-r border-gray-200 text-left w-[50%]"
												title={product.product_name}
											>
												{product.product_name}
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
											Ҳозирча маҳсулотлар йўқ
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{isModalOpen && selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
}

export default SalesSoldProducts;

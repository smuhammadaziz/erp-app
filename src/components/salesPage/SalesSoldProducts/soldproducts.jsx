import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import nodeUrl from "../../../links";

function SalesSoldProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
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

	return (
		<div className="py-1 h-[33vh]">
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				<div className="overflow-x-auto overflow-y-auto flex-grow">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="sticky z-0 top-0 bg-gray-100 shadow-sm z-10">
							<tr className="text-gray-700 uppercase text-xs">
								<th className="py-2 px-5 border-b text-left w-[15%]">
									Наименование, производитель
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Сони
								</th>
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Нархи
								</th>
								<th className="py-2 px-5 border-b text-center w-[15%]">
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
										key={product.product_id}
										className="text-gray-800 text-md group relative hover:bg-gray-50"
									>
										<td
											className="py-1 px-5 border-b text-left w-[50%]"
											title={product.product_name}
										>
											{product.product_name}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[10%]"
											title={product.soni}
										>
											{product.soni}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[10%]"
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
											className="py-1 px-5 border-b text-center w-[25%] relative"
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
													onClick={() => {
														deleteAllProducts(
															product.product_id,
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
										Hozircha mahsulotlar yo'q
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default SalesSoldProducts;

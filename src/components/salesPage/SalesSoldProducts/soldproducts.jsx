import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import nodeUrl from "../../../links";

function SalesSoldProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// const handleDelete = async (id) => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/delete/selling/${id}`,
	// 			{
	// 				method: "DELETE",
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error("Failed to delete product");
	// 		}

	// 		setProducts(
	// 			products.filter((product) => product.product_id !== id),
	// 		);
	// 	} catch (err) {
	// 		setError(err.message);
	// 	}
	// };

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
				setProducts(data.products);
				setError(null);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchProducts();

		const intervalId = setInterval([], 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="py-1 h-[33vh]">
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				{/* Table */}
				<div className="overflow-x-auto overflow-y-auto flex-grow">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="sticky z-0 top-0 bg-gray-100 shadow-sm z-10">
							<tr className="text-gray-700 uppercase text-xs">
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Product Name
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Price ($)
								</th>
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Price (UZS)
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{error ? (
								<tr>
									<td
										colSpan="5"
										className="py-3 text-center text-red-500"
									>
										Error: {error}
									</td>
								</tr>
							) : loading ? (
								<tr>
									<td
										colSpan="5"
										className="py-3 text-center text-gray-500"
									>
										Loading...
									</td>
								</tr>
							) : products.length > 0 ? (
								products.map((product) => (
									<tr
										key={product.product_id}
										className="text-gray-800 text-xs even:bg-gray-50"
									>
										<td
											className="py-1 px-5 border-b text-center w-[15%]"
											title={product.name}
										>
											{product.name}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[10%]"
											title={product.currency}
										>
											{product.currency}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[15%]"
											title={product.box}
										>
											{product.box}
										</td>
										<td className="py-1 px-5 border-b text-center w-[10%]">
											<button
												// onClick={() =>
												// 	handleDelete(
												// 		product.product_id,
												// 	)
												// }
												className="flex items-center justify-center bg-red-500 text-white p-1 rounded-md px-2 hover:bg-red-700 focus:outline-none"
											>
												<FiTrash2 />
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
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

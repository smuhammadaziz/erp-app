import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

function SalesSoldProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleDelete = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/delete/selling/${id}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				throw new Error("Failed to delete product");
			}

			setProducts(
				products.filter((product) => product.product_id !== id),
			);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/products/selling",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();
				setProducts(data.items);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchProducts();

		const intervalId = setInterval(fetchProducts, 1000);

		return () => clearInterval(intervalId);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="py-1 h-[40vh]">
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				{/* Table */}
				<div className="overflow-x-auto overflow-y-auto flex-grow">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="sticky z-0 top-0 bg-gray-100 shadow-sm z-10">
							<tr className="text-gray-700 uppercase text-xs">
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Product Name
								</th>
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Remaining
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
							{products.length > 0 ? (
								products.map((product) => (
									<tr
										key={product.product_id}
										className="text-gray-800 text-xs even:bg-gray-50"
									>
										<td
											className="py-1 px-5 border-b text-center w-[15%]"
											title={product.product_name}
										>
											{product.product_name}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[15%]"
											title={product.quantity}
										>
											{product.quantity}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[10%]"
											title={product.price_in_currency}
										>
											{product.price_in_currency}
										</td>
										<td
											className="py-1 px-5 border-b text-center w-[15%]"
											title={product.price_in_uzs}
										>
											{product.price_in_uzs}
										</td>
										<td className="py-1 px-5 border-b text-center w-[10%]">
											<button
												onClick={() =>
													handleDelete(
														product.product_id,
													)
												}
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

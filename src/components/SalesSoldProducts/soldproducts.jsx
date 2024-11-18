import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import data from "../products.json";

function SalesSoldProducts() {
	const [products, setProducts] = useState(data.slice(0, 5)); // Limit the products array to 5 items when initialized

	const handleDelete = (id) => {
		setProducts(products.filter((product) => product.id !== id));
	};

	return (
		<div className=" py-1 h-[40vh]">
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				{/* Table */}
				<div className="overflow-x-auto overflow-y-auto flex-grow">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
							<tr className="text-gray-700 uppercase text-xs">
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Product Name
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Currency
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Box
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
								<th className="py-2 px-5 border-b text-center w-[15%]">
									Warehouse
								</th>
								<th className="py-2 px-5 border-b text-center w-[10%]">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr
									key={product.id}
									className="text-gray-800 text-xs even:bg-gray-50"
								>
									<td
										className="py-1 px-5 border-b text-center w-[15%] truncate"
										title={product.product_name}
									>
										{product.product_name}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[10%] truncate"
										title={product.currency}
									>
										{product.currency}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[10%] truncate"
										title={product.box}
									>
										{product.box}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[15%] truncate"
										title={product.remaining}
									>
										{product.remaining}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[10%] truncate"
										title={product.price_in_currency}
									>
										{product.price_in_currency}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[15%] truncate"
										title={product.price_in_UZS}
									>
										{product.price_in_UZS}
									</td>
									<td
										className="py-1 px-5 border-b text-center w-[15%] truncate"
										title={product.warehouse}
									>
										{product.warehouse}
									</td>
									<td className="py-1 px-5 border-b text-center w-[10%]">
										<button
											onClick={() =>
												handleDelete(product.id)
											}
											className="flex items-center justify-center bg-red-500 text-white p-1 rounded-md px-2 hover:bg-red-700 focus:outline-none"
										>
											<FiTrash2 className="" />
										</button>
									</td>
								</tr>
							))}
							{products.length === 0 && (
								<tr>
									<td
										colSpan="8"
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

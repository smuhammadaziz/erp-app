import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import data from "../products.json";
import { FaPlus } from "react-icons/fa";
import { MdAdd, MdClear, MdDelete, MdRemove } from "react-icons/md";

function SalesMainAllProducts() {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	React.useEffect(() => {
		if (searchQuery) {
			const lowercasedQuery = searchQuery.toLowerCase();
			setFilteredData(
				data.filter((product) =>
					product.product_name
						.toLowerCase()
						.includes(lowercasedQuery),
				),
			);
		} else {
			setFilteredData(data);
		}
	}, [searchQuery]);

	const handleAddProduct = (product) => {
		console.log("Adding product:", product);
	};

	return (
		<div className="py-1 h-[40vh]">
			<div className="bg-white shadow-md rounded-lg h-full flex flex-col">
				{/* Search Bar */}
				<div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
					<div className="relative w-[50vw] mr-5">
						<input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full px-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
						/>
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
					</div>

					<div className="flex items-start">
						<div className="flex items-center block">
							<button className="bg-green-600 border-2 border-green-600 hover:bg-transparent p-1.5 text-white hover:text-green-600  rounded-lg">
								<MdRemove className="" />
							</button>
							<span className="px-2"></span>
							<button className="bg-green-600 border-2 border-green-600 hover:bg-transparent p-1.5 text-white hover:text-green-600  rounded-lg">
								<MdAdd className="" />
							</button>
						</div>

						<span className="mt-0 pt-0 mx-5">
							<p className="text-xl font-bold mt-0 pt-0 ">
								( 5 )
							</p>
						</span>
						<button className="bg-red-600  border-2 border-red-600 hover:bg-transparent p-1.5 text-white hover:text-red-600  rounded-lg">
							<MdDelete className="" />
						</button>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-y-auto flex-1">
					<table className="min-w-full bg-white border border-gray-200 relative">
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
									Add
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.length > 0 ? (
								filteredData.map((product) => (
									<tr
										key={product.id}
										className="text-gray-800 text-xs even:bg-gray-50 hover:bg-slate-200 active:bg-slate-400"
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
													handleAddProduct(product)
												}
												className="bg-green-500 text-white p-1 rounded-md px-2 hover:bg-green-700 focus:outline-none"
											>
												<FaPlus />
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="8"
										className="py-3 text-center text-gray-500"
									>
										No products found.
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

export default SalesMainAllProducts;

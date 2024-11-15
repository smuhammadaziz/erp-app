import React from "react";
import data from "../products.json";

function SalesMainAllProducts() {
	// Handler for adding the product (replace with your desired functionality)
	const handleAddProduct = (product) => {
		console.log("Adding product:", product);
	};

	return (
		<div className="px-6 py-3">
			{/* Wrapper for the whole table */}
			<div className="bg-white shadow-md rounded-lg">
				{/* Fixed header section */}
				<div className="overflow-x-auto bg-gray-100">
					<table className="min-w-full bg-white border border-gray-200">
						<thead>
							<tr className="bg-gray-100 text-gray-700 uppercase text-sm">
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
					</table>
				</div>
				{/* Scrollable table body */}
				<div className="overflow-x-auto max-h-[35vh]">
					<table className="min-w-full bg-white border border-gray-200">
						<tbody>
							{data.map((product) => (
								<tr
									key={product.id}
									className="text-gray-800 text-sm even:bg-gray-50"
								>
									<td className="py-1 px-5 border-b text-center w-[15%]">
										{product.product_name}
									</td>
									<td className="py-1 px-5 border-b text-center w-[10%]">
										{product.currency}
									</td>
									<td className="py-1 px-5 border-b text-center w-[10%]">
										{product.box}
									</td>
									<td className="py-1 px-5 border-b text-center w-[15%]">
										{product.remaining}
									</td>
									<td className="py-1 px-5 border-b text-center w-[10%]">
										{product.price_in_currency}
									</td>
									<td className="py-1 px-5 border-b text-center w-[15%]">
										{product.price_in_UZS}
									</td>
									<td className="py-1 px-5 border-b text-center w-[15%]">
										{product.warehouse}
									</td>
									<td className="py-1 px-5 border-b text-center w-[10%]">
										<button
											onClick={() =>
												handleAddProduct(product)
											}
											className="bg-green-500 text-white p-1 rounded-md px-2 hover:bg-green-700 focus:outline-none"
										>
											+
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default SalesMainAllProducts;

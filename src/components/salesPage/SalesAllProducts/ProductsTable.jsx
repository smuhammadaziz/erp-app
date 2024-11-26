import React from "react";

function ProductsTable({
	filteredData,
	selectedRow,
	setSelectedRow,
	isSelectionEnabled,
	tableRef,
	selectedRowRef,
	handleRowDoubleClick,
	error,
}) {
	return (
		<div className="overflow-y-auto flex-1" ref={tableRef}>
			<table className="min-w-full bg-white border border-gray-200">
				<thead className="sticky top-0 bg-gray-100 shadow-sm">
					<tr className="text-gray-700 uppercase text-xs">
						<th className="py-2 px-5 border-b text-center">
							Product Name
						</th>
						<th className="py-2 px-5 border-b text-center">
							Currency
						</th>
						<th className="py-2 px-5 border-b text-center">Box</th>
						<th className="py-2 px-5 border-b text-center">
							Remaining
						</th>
						<th className="py-2 px-5 border-b text-center">
							Price ($)
						</th>
						<th className="py-2 px-5 border-b text-center">
							Price (UZS)
						</th>
						<th className="py-2 px-5 border-b text-center">
							Warehouse
						</th>
					</tr>
				</thead>
				<tbody>
					{error ? (
						<tr>
							<td
								colSpan="7"
								className="py-3 text-center text-red-500"
							>
								{error}
								<p className="text-xs text-gray-500 mt-1">
									Cannot fetch products. Please check your
									server connection.
								</p>
							</td>
						</tr>
					) : filteredData.length > 0 ? (
						filteredData.map((product, index) => (
							<tr
								key={product.id}
								ref={
									selectedRow === index
										? selectedRowRef
										: null
								}
								className={`text-gray-800 text-xs hover:bg-slate-200 ${
									selectedRow === index && isSelectionEnabled
										? "bg-orange-200"
										: ""
								}`}
								onDoubleClick={() =>
									handleRowDoubleClick(product)
								}
							>
								<td className="py-1 px-5 border-b text-center">
									{product.product_name}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.currency}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.box}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.remaining}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.price_in_currency}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.price_in_UZS}
								</td>
								<td className="py-1 px-5 border-b text-center">
									{product.warehouse}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan="7"
								className="py-3 text-center text-gray-500"
							>
								No products found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default ProductsTable;

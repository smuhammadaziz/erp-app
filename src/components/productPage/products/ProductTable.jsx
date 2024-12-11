import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

const ProductTable = ({ products, onViewProduct, onDeleteProduct }) => {
	// Define columns to display
	const columns = ["name", "type", "symbol", "сurrency", "article", "box"];

	return (
		<div className="flex-grow overflow-auto">
			<table className="w-full">
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						{columns.map((column) => (
							<th
								key={column}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{column.charAt(0).toUpperCase() +
									column.slice(1)}
							</th>
						))}
						<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{products.map((product) => (
						<tr
							key={product.id}
							className="hover:bg-gray-50 transition-colors duration-200"
						>
							{columns.map((column) => (
								<td
									key={column}
									className="px-4 py-3 whitespace-nowrap text-sm text-gray-600"
								>
									{product[column] !== undefined
										? String(product[column])
										: "N/A"}
								</td>
							))}
							<td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
								<div className="flex items-center space-x-4">
									<button
										onClick={() => onViewProduct(product)}
										className="text-blue-600 hover:text-blue-900 transition-colors"
										title="View Product"
									>
										<FaEye />
									</button>
									<button
										onClick={() =>
											onDeleteProduct(product.id)
										}
										className="text-red-600 hover:text-red-900 transition-colors"
										title="Delete Product"
									>
										<FaTrash />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;

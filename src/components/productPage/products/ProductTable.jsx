import React from "react";
import { FaEye } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const LoadingSpinner = () => (
	<tr>
		<td colSpan={8} className="text-center py-4 absolute left-0 right-0">
			<div className="flex items-center justify-center">
				<div className="text-purple-600 text-4xl animate-spin">
					<FiLoader />
				</div>
			</div>
		</td>
	</tr>
);

const ProductTable = ({ products, isLoading, onViewProduct }) => {
	const columns = ["name", "type", "symbol", "сurrency", "article", "box"];

	// Determine if we should show loader
	const shouldShowLoader = isLoading || (!isLoading && products.length === 0);

	return (
		<div className="flex-grow overflow-auto relative">
			<table className="w-full">
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							#
						</th>
						{columns.map((column, index) => (
							<th
								key={column}
								className={`px-4 py-3 ${
									index === 0 ? "text-left" : "text-center"
								} text-xs font-medium text-gray-500 uppercase tracking-wider`}
							>
								{column.charAt(0).toUpperCase() +
									column.slice(1)}
							</th>
						))}
						<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200 relative">
					{shouldShowLoader ? (
						<LoadingSpinner />
					) : (
						products.map((product, index) => (
							<tr
								key={product.id}
								className="hover:bg-gray-50 transition-colors duration-200"
							>
								<td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
									{index + 1}
								</td>
								{columns.map((column, colIndex) => (
									<td
										key={column}
										className={`px-4 py-3 whitespace-nowrap text-sm text-gray-600 ${
											colIndex === 0
												? "text-left"
												: "text-center"
										}`}
									>
										{product[column] !== undefined
											? String(product[column])
											: "N/A"}
									</td>
								))}
								<td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
									<div className="flex justify-center space-x-4">
										<button
											onClick={() =>
												onViewProduct(product)
											}
											className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors rounded px-3 py-1 flex items-center space-x-2"
											title="View Product"
										>
											<FaEye />
											<span>View</span>
										</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;

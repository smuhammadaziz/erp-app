import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

const ProductTable = ({ products, onViewProduct, onDeleteProduct }) => {
	return (
		<div className="overflow-x-auto h-[65vh]">
			<table className="w-full">
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						{[
							"delete",
							"name",
							"archive",
							"symbol",
							"сurrency",
							"article",
							"type",
							"box",
						].map((header) => (
							<th
								key={header}
								className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
							>
								{header} actions
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{products.map((product) => (
						<tr
							key={product.id}
							className="hover:bg-gray-50 transition-colors duration-200"
						>
							{/* Render each product's data */}
							{[
								"delete",
								"name",
								"archive",
								"symbol",
								"сurrency",
								"article",
								"type",
								"box",
							].map((key) => (
								<td
									key={key}
									className="px-6 py-4 whitespace-nowrap"
								>
									<div className="flex items-center text-sm text-gray-600">
										{product[key] !== undefined
											? product[key]
											: "-"}
									</div>
								</td>
							))}
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<div className="flex items-center space-x-4">
									<button
										onClick={() => onViewProduct(product)}
										className="flex items-center text-blue-600 hover:text-blue-900 transition-colors duration-200"
									>
										<FaEye className="mr-1" />
										<span>View</span>
									</button>
									<button
										onClick={() =>
											onDeleteProduct(product.id)
										}
										className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200"
									>
										<FaTrash className="mr-1" />
										<span>Delete</span>
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

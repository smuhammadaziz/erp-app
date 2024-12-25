import React from "react";
import {
	BiPackage,
	BiStore,
	BiTag,
	BiMoney,
	BiBookmark,
	BiBox,
	BiTrash,
	BiArchive,
} from "react-icons/bi";

const ProductViewDetails = ({ product }) => {
	if (!product) return null;

	const fieldDisplayOrder = [
		{ key: "name", label: "Product Name", icon: <BiPackage size={20} /> },
		{ key: "type", label: "Product Type", icon: <BiStore size={20} /> },
		{ key: "symbol", label: "Symbol", icon: <BiTag size={20} /> },
		{ key: "сurrency", label: "Currency", icon: <BiMoney size={20} /> },
		{ key: "article", label: "Article", icon: <BiBookmark size={20} /> },
		{ key: "box", label: "Box", icon: <BiBox size={20} /> },
		{ key: "delete", label: "Deletable", icon: <BiTrash size={20} /> },
		{ key: "archive", label: "Archived", icon: <BiArchive size={20} /> },
	];

	const renderValue = (key, value) => {
		if (value === undefined)
			return (
				<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-500 text-sm">
					Not Available
				</span>
			);

		if (typeof value === "boolean") {
			return (
				<span
					className={`
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium
          ${
				value
					? "bg-green-50 text-green-700 border border-green-100"
					: "bg-gray-50 text-gray-700 border border-gray-100"
			}
        `}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full ${
							value ? "bg-green-500" : "bg-gray-400"
						}`}
					/>
					{value ? "Yes" : "No"}
				</span>
			);
		}

		return <span className="text-gray-700">{String(value)}</span>;
	};

	return (
		<div className="relative overflow-hidden">
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-gray-50 text-gray-600">
						<tr>
							<th className="px-6 py-3 text-left font-medium">
								Field
							</th>
							<th className="px-6 py-3 text-left font-medium">
								Value
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{fieldDisplayOrder.map(({ key, label, icon }) => (
							<tr
								key={key}
								className="hover:bg-gray-50 transition-colors"
							>
								<td className="px-6 py-3">
									<div className="flex items-center gap-3">
										<div className="text-gray-400">
											{icon}
										</div>
										<span className="font-medium text-gray-600">
											{label}
										</span>
									</div>
								</td>
								<td className="px-6 py-3">
									{renderValue(key, product[key])}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductViewDetails;

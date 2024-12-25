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
	BiBarcode,
	BiBuilding,
	BiCoinStack,
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
		{
			key: "stock",
			label: "Stock",
			icon: <BiBuilding size={20} />,
			customRender: (value) =>
				value && value.length > 0 ? (
					value.map((item, index) => (
						<div key={index} className="mb-3">
							<p className="text-gray-700 font-medium">
								Warehouse:{" "}
								<span className="text-gray-500">
									{item.warehouse}
								</span>
							</p>
							<p className="text-gray-700 font-medium">
								Quantity:{" "}
								<span className="text-gray-500">
									{item.qty}
								</span>
							</p>
							<p className="text-gray-700 font-medium">
								Sum:{" "}
								<span className="text-gray-500">
									{item.sum}
								</span>
							</p>
						</div>
					))
				) : (
					<span className="text-gray-500">No Stock Data</span>
				),
		},
		{
			key: "price",
			label: "Price",
			icon: <BiCoinStack size={20} />,
			customRender: (value) =>
				value && value.length > 0 ? (
					value.map((item, index) => (
						<div key={index} className="mb-3">
							<p className="text-gray-700 font-medium">
								Type:{" "}
								<span className="text-gray-500">
									{item.type}
								</span>
							</p>
							<p className="text-gray-700 font-medium">
								Sale:{" "}
								<span className="text-gray-500">
									{item.sale}
								</span>
							</p>
							<p className="text-gray-700 font-medium">
								Buy:{" "}
								<span className="text-gray-500">
									{item.buy}
								</span>
							</p>
						</div>
					))
				) : (
					<span className="text-gray-500">No Price Data</span>
				),
		},
		{
			key: "barcode",
			label: "Barcode",
			icon: <BiBarcode size={20} />,
			customRender: (value) =>
				value && value.length > 0 ? (
					value.join(", ")
				) : (
					<span className="text-gray-500">No Barcode Data</span>
				),
		},
	];

	const renderValue = (key, value, customRender) => {
		if (customRender) return customRender(value);
		if (value === undefined || value === null)
			return (
				<span className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-500 text-sm">
					Not Available
				</span>
			);

		if (typeof value === "boolean") {
			return (
				<span
					className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium ${
						value
							? "bg-green-50 text-green-700 border border-green-100"
							: "bg-gray-50 text-gray-700 border border-gray-100"
					}`}
				>
					<span
						className={`w-2 h-2 rounded-full ${
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
		<div className="bg-white shadow-lg rounded-lg">
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-50 text-gray-600">
						<tr>
							<th className="px-6 py-3 text-left font-semibold text-lg">
								Field
							</th>
							<th className="px-6 py-3 text-left font-semibold text-lg">
								Value
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{fieldDisplayOrder.map(
							({ key, label, icon, customRender }) => (
								<tr
									key={key}
									className="hover:bg-gray-100 transition-colors duration-200"
								>
									<td className="px-6 py-3 flex items-center space-x-3">
										<div className="text-gray-500">
											{icon}
										</div>
										<span className="text-gray-700 font-medium">
											{label}
										</span>
									</td>
									<td className="px-6 py-3 text-gray-800">
										{renderValue(
											key,
											product[key],
											customRender,
										)}
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductViewDetails;

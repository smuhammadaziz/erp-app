import React, { useState } from "react";
import {
	BiPackage,
	BiStore,
	BiTag,
	BiMoney,
	BiBookmark,
	BiBuilding,
	BiCoinStack,
	BiBarcode,
} from "react-icons/bi";

const ProductViewDetails = ({ product }) => {
	const [activeMenu, setActiveMenu] = useState("Main");

	if (!product) return null;

	const fieldDisplayOrder = {
		Main: [
			{
				key: "name",
				label: "Product Name",
				icon: <BiPackage size={20} />,
			},
			{ key: "type", label: "Product Type", icon: <BiStore size={20} /> },
			{ key: "symbol", label: "Symbol", icon: <BiTag size={20} /> },
			{ key: "сurrency", label: "Currency", icon: <BiMoney size={20} /> },
			{
				key: "article",
				label: "Article",
				icon: <BiBookmark size={20} />,
			},
		],
		Stock: [
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
		],
		Price: [
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
		],
		Barcodes: [
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
		],
	};

	const renderValue = (key, value, customRender) => {
		if (customRender) return customRender(value);
		if (value === undefined || value === null)
			return (
				<span className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-500 text-sm">
					Not Available
				</span>
			);

		return <span className="text-gray-700">{String(value)}</span>;
	};

	return (
		<div className="bg-white rounded-lg">
			<div className="flex border-b">
				{Object.keys(fieldDisplayOrder).map((menu) => (
					<button
						key={menu}
						className={`px-4 py-2 text-sm font-medium ${
							activeMenu === menu
								? "border-b-2 border-fuchsia-600 text-fuchsia-600"
								: "text-gray-500 hover:text-fuchsia-600"
						}`}
						onClick={() => setActiveMenu(menu)}
					>
						{menu}
					</button>
				))}
			</div>

			<div className="p-4 overflow-y-auto" style={{ maxHeight: "400px" }}>
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
						{fieldDisplayOrder[activeMenu].map(
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

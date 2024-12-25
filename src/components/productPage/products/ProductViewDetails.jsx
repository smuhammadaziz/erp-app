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
		{
			key: "name",
			label: "Product Name",
			icon: <BiPackage className="w-5 h-5" />,
		},
		{
			key: "type",
			label: "Product Type",
			icon: <BiStore className="w-5 h-5" />,
		},
		{ key: "symbol", label: "Symbol", icon: <BiTag className="w-5 h-5" /> },
		{
			key: "сurrency",
			label: "Currency",
			icon: <BiMoney className="w-5 h-5" />,
		},
		{
			key: "article",
			label: "Article",
			icon: <BiBookmark className="w-5 h-5" />,
		},
		{ key: "box", label: "Box", icon: <BiBox className="w-5 h-5" /> },
		{
			key: "delete",
			label: "Deletable",
			icon: <BiTrash className="w-5 h-5" />,
		},
		{
			key: "archive",
			label: "Archived",
			icon: <BiArchive className="w-5 h-5" />,
		},
	];

	const renderValue = (key, value) => {
		if (value === undefined)
			return <span className="text-gray-400">Not Available</span>;

		if (typeof value === "boolean") {
			return (
				<span
					className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
						value
							? "bg-green-100 text-green-800"
							: "bg-gray-100 text-gray-800"
					}`}
				>
					{value ? "Yes" : "No"}
				</span>
			);
		}

		return <span className="text-gray-900">{String(value)}</span>;
	};

	return (
		<div className="space-y-1 divide-y divide-gray-100">
			{fieldDisplayOrder.map(({ key, label, icon }) => (
				<div
					key={key}
					className="grid grid-cols-2 py-2.5 hover:bg-gray-50 transition-colors rounded-md px-2"
				>
					<div className="flex items-center gap-2 text-gray-600">
						<span className="text-gray-400">{icon}</span>
						<span className="font-medium">{label}</span>
					</div>
					<div>{renderValue(key, product[key])}</div>
				</div>
			))}
		</div>
	);
};

export default ProductViewDetails;

import React from "react";

const ProductViewDetails = ({ product }) => {
	if (!product) return null;

	const fieldDisplayOrder = [
		{ key: "name", label: "Product Name" },
		{ key: "type", label: "Product Type" },
		{ key: "symbol", label: "Symbol" },
		{ key: "сurrency", label: "Currency" },
		{ key: "article", label: "Article" },
		{ key: "box", label: "Box" },
		{ key: "delete", label: "Deletable" },
		{ key: "archive", label: "Archived" },
	];

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				{fieldDisplayOrder.map(({ key, label }) => (
					<React.Fragment key={key}>
						<div className="font-medium text-gray-700 capitalize">
							{label}:
						</div>
						<div className="text-gray-900">
							{product[key] !== undefined
								? String(product[key])
								: "Not Available"}
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default ProductViewDetails;

import React from "react";

const ProductViewDetails = ({ product }) => {
	if (!product) return null;

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				{Object.entries(product)
					.filter(([key]) => key !== "id")
					.map(([key, value]) => (
						<React.Fragment key={key}>
							<div className="font-medium capitalize">
								{key.replace(/_/g, " ")}:
							</div>
							<div>{value}</div>
						</React.Fragment>
					))}
			</div>
		</div>
	);
};

export default ProductViewDetails;

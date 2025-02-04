// SalesMainPage.jsx
import React, { useState } from "react";
import SalesMainAllProducts from "../../components/salesPage/SalesAllProducts/products";
import SalespageSummaSection from "../../components/salesPage/summa/summa";
import SalesSoldProducts from "../../components/salesPage/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../layout/SalesLayout/saleslayout";

function SalesMainPage() {
	const [lastAddedProductId, setLastAddedProductId] = useState(null);

	const handleProductAdded = (productId) => {
		setLastAddedProductId(productId);
	};

	return (
		<SalesPageLayoutMain>
			<div className="">
				<div className="flex gap-4 justify-between">
					<div className="w-[90vw] ">
						<SalesSoldProducts key={lastAddedProductId} />
					</div>
					<div className="">
						<SalespageSummaSection />
					</div>
				</div>
				<div className="">
					<SalesMainAllProducts onProductAdded={handleProductAdded} />
				</div>
			</div>
		</SalesPageLayoutMain>
	);
}

export default SalesMainPage;

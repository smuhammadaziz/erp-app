// SalesMainPage.jsx
import React, { useState } from "react";
import SalesMainAllProducts from "../../components/salesPage/SalesAllProducts/products";
import SalespageSummaSection from "../../components/salesPage/summa/summa";
import SalesSoldProducts from "../../components/salesPage/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../layout/SalesLayout/saleslayout";

function SalesMainPage({ socket }) {
	const [lastAddedProductId, setLastAddedProductId] = useState(null);

	const handleProductAdded = (productId) => {
		setLastAddedProductId(productId);
	};

	return (
		<SalesPageLayoutMain socket={socket}>
			<div className="">
				<div className="flex gap-2 justify-between">
					<div className="w-[90vw] ">
						<SalesSoldProducts
							key={lastAddedProductId}
							socket={socket}
						/>
					</div>
					<div className="">
						<SalespageSummaSection socket={socket} />
					</div>
				</div>
				<div className="">
					<SalesMainAllProducts
						onProductAdded={handleProductAdded}
						socket={socket}
					/>
				</div>
			</div>
		</SalesPageLayoutMain>
	);
}

export default SalesMainPage;


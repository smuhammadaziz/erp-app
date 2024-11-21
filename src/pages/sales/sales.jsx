import React from "react";
import SalesMainAllProducts from "../../components/SalesAllProducts/products";
import SalespageSummaSection from "../../components/summa/summa";
import SalesSoldProducts from "../../components/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../components/SalesLayout/saleslayout";

function SalesMainPage() {
	return (
		<SalesPageLayoutMain>
			<div>
				<div className="flex gap-4 justify-between">
					<div className="w-[90vw]">
						<SalesSoldProducts />
					</div>
					<div className="">
						<SalespageSummaSection />
					</div>
				</div>
				<div className="">
					<SalesMainAllProducts />
				</div>
			</div>
		</SalesPageLayoutMain>
	);
}

export default SalesMainPage;

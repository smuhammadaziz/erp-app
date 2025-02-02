import React from "react";
import SalesMainAllProducts from "../../components/salesPage/SalesAllProducts/products";
import SalespageSummaSection from "../../components/salesPage/summa/summa";
import SalesSoldProducts from "../../components/salesPage/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../layout/SalesLayout/saleslayout";

function SalesMainPage() {
	return (
		<SalesPageLayoutMain>
			<div className="">
				<div className="flex gap-4 justify-between">
					<div className="w-[90vw] ">
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

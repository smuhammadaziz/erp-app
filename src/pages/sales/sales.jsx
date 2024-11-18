import React from "react";
import SalesMainAllProducts from "../../components/SalesAllProducts/products";
import SalespageSummaSection from "../../components/summa/summa";
import SalesSoldProducts from "../../components/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../components/SalesLayout/saleslayout";

function SalesMainPage() {
	return (
		<SalesPageLayoutMain>
			<div>
				{/* Flex container for SoldProducts and SummaSection */}
				<div className="flex gap-4 justify-between">
					{/* SoldProducts section - 80% width */}
					<div className="w-[90vw]">
						<SalesSoldProducts />
					</div>

					{/* Summa section - 20% width */}
					<div className="">
						<SalespageSummaSection />
					</div>
				</div>

				{/* Main all products section */}
				<div className="">
					<SalesMainAllProducts />
				</div>
			</div>
		</SalesPageLayoutMain>
	);
}

export default SalesMainPage;

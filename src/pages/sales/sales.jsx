import React from "react";
import { Layout } from "../../components/Layout";

import SalesMainPageHeader from "../../components/SalesHeader/header";
import SalesMainAllProducts from "../../components/SalesAllProducts/products";
import SalesPagePaymentsSection from "../../components/Payments/payments";
import SalespageSummaSection from "../../components/summa/summa";
import SalesSoldProducts from "../../components/SalesSoldProducts/soldproducts";

function SalesMainPage() {
	return (
		<Layout>
			<header>
				<SalesMainPageHeader />
			</header>

			{/* Flex container for the table and payment section */}
			<div>
				<div className="flex items-start justify-between max-w-full overflow-x-hidden">
					{/* Products Table - Takes 85% width */}
					<div className="w-[85%] h-[35%]">
						<SalesMainAllProducts />
					</div>

					{/* Payments Section - Takes 15% width */}
					<div className="w-[15%]">
						<SalesPagePaymentsSection />
					</div>
				</div>
				<div className="flex items-start justify-between max-w-full overflow-x-hidden">
					{/* Products Table - Takes 85% width */}
					<div className="w-[85%] h-[35%]">
						<SalesSoldProducts />
					</div>

					{/* Payments Section - Takes 15% width */}
					<div className="w-[15%]">
						<SalespageSummaSection />
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default SalesMainPage;

import React from "react";
import { Layout } from "../../components/Layout";
import InnerLayoutSection from "../../components/InnerLayout/innerlayout";
import CustomersAllDetails from "../../components/customers/customers";

function CustomersPage() {
	return (
		<Layout>
			<InnerLayoutSection>
				<div>
					<CustomersAllDetails />
				</div>
			</InnerLayoutSection>
		</Layout>
	);
}

export default CustomersPage;

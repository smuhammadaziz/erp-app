import React from "react";
import { Layout } from "../../layout/Layout";
import InnerLayoutSection from "../../layout/InnerLayout/innerlayout";
import CustomersAllDetails from "../../components/clients/customers/customers";

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

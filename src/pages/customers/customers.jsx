import React from "react";
import { Layout } from "../../layout/HomeLayout/layout";
import InnerLayoutSection from "../../layout/InnerLayout/innerlayout";
import CustomersAllDetails from "../../components/clientsPage/customers/CustomersAllDetails";

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


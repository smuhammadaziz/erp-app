import React from "react";
import { Layout } from "../../components/Layout";
import InnerLayoutSection from "../../components/InnerLayout/innerlayout";
import ProductsPageComponent from "../../components/products/products";

function ProductsPage() {
	return (
		<Layout>
			<InnerLayoutSection>
				<div>
					<ProductsPageComponent />
				</div>
			</InnerLayoutSection>
		</Layout>
	);
}

export default ProductsPage;

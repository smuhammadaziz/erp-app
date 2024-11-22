import React from "react";
import { Layout } from "../../layout/Layout";
import InnerLayoutSection from "../../layout/InnerLayout/innerlayout";
import ProductsPageComponent from "../../components/product/products/products";

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

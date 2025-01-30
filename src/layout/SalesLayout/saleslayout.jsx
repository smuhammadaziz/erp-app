import React from "react";
import SalesPageLayoutFooter from "./footer/SalesPageLayoutFooter";
import SalesPageLayoutSidebar from "./sidebar";
import { Layout } from "../../layout/SalesHomeLayout/layout";
import SalesPageLayoutHeader from "./header";

function SalesPageLayoutMain({ children }) {
	return (
		<Layout>
			<div className="flex flex-col">
				<header className="relative z-[201]">
					<SalesPageLayoutHeader />
				</header>
				<div className="flex flex-1">
					<div className="flex-1 px-4 py-1 bg-white overflow-auto">
						{children}
					</div>

					<div className="w-52 bg-slate-100 text-white border-l-2">
						<SalesPageLayoutSidebar />
					</div>
				</div>

				<div className="fixed z-[201] bottom-0 left-0 w-full bg-white shadow-lg">
					<SalesPageLayoutFooter />
				</div>
			</div>
		</Layout>
	);
}

export default SalesPageLayoutMain;

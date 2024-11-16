import React from "react";
import SalesPageLayoutFooter from "./footer";
import SalesPageLayoutSidebar from "./sidebar";
import { Layout } from "../Layout";

function SalesPageLayoutMain({ children }) {
	return (
		<Layout>
			<div className="flex flex-col">
				{/* Main Content Area */}
				<div className="flex flex-1">
					{/* Content Area */}
					<div className="flex-1 p-6 bg-white overflow-auto">
						{children}
					</div>

					{/* Sidebar */}
					<div className="w-52 bg-slate-100 text-white border-2">
						<SalesPageLayoutSidebar />
					</div>
				</div>

				{/* Footer */}
				<div className="fixed bottom-0 left-0 w-full bg-white shadow-lg">
					<SalesPageLayoutFooter />
				</div>
			</div>
		</Layout>
	);
}

export default SalesPageLayoutMain;

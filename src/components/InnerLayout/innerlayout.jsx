import React from "react";
import HeaderInner from "./header";
import SidebarInner from "./sidebar";

function InnerLayoutSection({ children }) {
	return (
		<div className="flex bg-gray-100">
			<SidebarInner />
			<div className="flex-1 flex flex-col">
				<HeaderInner />
				<main className="p-4 flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}

export default InnerLayoutSection;

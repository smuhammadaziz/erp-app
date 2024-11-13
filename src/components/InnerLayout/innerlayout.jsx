import React from "react";
import HeaderInner from "./header";
import SidebarInner from "./sidebar";

function InnerLayoutSection({ children }) {
	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar with fixed positioning */}
			<SidebarInner className="w-64" />

			{/* Main content area */}
			<div className="flex-1 ml-64 flex flex-col overflow-y-hidden">
				<HeaderInner />
				<main className="p-4 flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}

export default InnerLayoutSection;

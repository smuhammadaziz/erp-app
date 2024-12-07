// InnerLayoutSection.js
import React, { useState } from "react";
import HeaderInner from "./header";
import SidebarInner from "./sidebar";

function InnerLayoutSection({ children }) {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

	const handleSidebarToggle = (expanded) => {
		setIsSidebarExpanded(expanded);
	};

	return (
		<div className="flex min-h-screen bg-slate-100">
			<SidebarInner onToggle={handleSidebarToggle} />

			<div className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
				<HeaderInner />
				<main className="p-4 bg-slate-100">{children}</main>
			</div>
		</div>
	);
}

export default InnerLayoutSection;


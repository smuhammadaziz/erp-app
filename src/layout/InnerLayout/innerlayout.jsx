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
		<div className="flex h-full bg-slate-100">
			<SidebarInner onToggle={handleSidebarToggle} />

			<div
				className={`flex-1 flex flex-col transition-all duration-300 ${
					isSidebarExpanded ? "ml-64" : "ml-20"
				}`}
			>
				<HeaderInner />
				<main className="p-4 h-full flex-1">{children}</main>
			</div>
		</div>
	);
}

export default InnerLayoutSection;

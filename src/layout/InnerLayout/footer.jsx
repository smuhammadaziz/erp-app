import React from "react";

function InnerFooter() {
	const daysLeft = 2;

	return (
		<div className="fixed bottom-0 left-0 w-full bg-white text-black p-2 overflow-hidden border-t border-gray-200">
			<div
				className={`flex space-x-40 w-max animate-marquee ${
					daysLeft < 3 ? "bg-red-50" : "bg-white"
				}`}
			>
				{[...Array(4)].map((_, index) => (
					<p
						key={index}
						className={`whitespace-nowrap text-base ${
							daysLeft < 3
								? "text-red-600 font-semibold animate-pulse"
								: "text-gray-900"
						}`}
					>
						Техник қўллаб қувватлаш (ITS) муддати тугашига{" "}
						<span className="font-bold">{daysLeft} кун</span> қолди.
						Қўшимча маълумот учун: +998 78 298 09 99
					</p>
				))}
			</div>
		</div>
	);
}

export default InnerFooter;


import React from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { MdAssignmentReturn, MdOutlineMobileScreenShare } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { BsCardList } from "react-icons/bs";

function SalesPageLayoutSidebar() {
	// Function to handle the "Cash" button click
	const handleCashButtonClick = async () => {
		try {
			// Send POST request to the API
			const response = await fetch("http://localhost:5000/api/buy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// Assuming you need to send some data along with the request, here I am using a placeholder object.
				body: JSON.stringify({
					productId: 1, // Example product ID
					quantity: 1, // Example quantity
				}),
			});

			if (response.ok) {
				// If successful, show the success alert
				alert("Products successfully sold!");
			} else {
				// If the request failed, show an error
				alert("Error: Could not process the sale.");
			}
		} catch (error) {
			console.error("Error during API request:", error);
			alert("Error: Could not process the sale.");
		}
	};

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col justify-between">
			{/* Top Buttons Section */}
			<div>
				<div className="flex flex-col items-center gap-5">
					{/* Cash Button */}
					<button
						onClick={handleCashButtonClick} // Add the onClick handler
						className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
					>
						<HiOutlineCash className="mr-3 text-xl" />
						<span className="font-semibold">Cash</span>
					</button>

					{/* Card Button */}
					<button className="flex items-center justify-center w-full max-w-xs bg-blue-700 hover:bg-blue-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
						<HiOutlineCreditCard className="mr-3 text-xl" />
						<span className="font-semibold">Card</span>
					</button>
				</div>

				{/* Middle Buttons Section */}
				<div className="flex flex-col items-center gap-5 mt-8">
					{/* Return Button */}
					<button className="flex items-center justify-center w-full max-w-xs bg-indigo-700 hover:bg-indigo-600 text-slate-100 px-5 py-2 text-sm rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400">
						<MdAssignmentReturn className="mr-3 text-xl" />
						<span className="font-semibold">
							Возврат от покупателя
						</span>
					</button>

					{/* Cash Movement Button */}
					<button className="flex items-center justify-center w-full max-w-xs bg-teal-700 hover:bg-teal-600 text-slate-100 px-5 py-2 text-sm rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400">
						<GiCash className="mr-3 text-xl" />
						<span className="font-semibold">Движения касса</span>
					</button>
				</div>
			</div>

			{/* Bottom Buttons Section */}
			<div className="flex flex-col items-center gap-5 mt-8 mb-8">
				{/* Button Group for List and Smartphone */}
				<div className="flex items-center justify-between gap-5 w-full">
					{/* List Button */}
					<button className="flex items-center justify-center w-full bg-slate-700 hover:bg-slate-600 text-slate-100 px-5 py-3 text-sm rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400">
						<BsCardList className="text-xl" />
					</button>

					{/* Smartphone Button */}
					<button className="flex items-center justify-center w-full bg-slate-700 hover:bg-slate-600 text-slate-100 px-5 py-3 text-sm rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400">
						<MdOutlineMobileScreenShare className="text-xl" />
					</button>
				</div>

				{/* Exit Button */}
			</div>
		</div>
	);
}

export default SalesPageLayoutSidebar;

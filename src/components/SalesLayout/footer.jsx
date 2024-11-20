import React from "react";
import { FiSettings } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { BsCurrencyDollar, BsFillTagsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";

import { useNavigate } from "react-router-dom";

function SalesPageLayoutFooter() {
	const navigate = useNavigate();
	const handleExitClick = () => {};

	return (
		<div className="salesfooter bg-slate-100 px-4 py-1 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				{/* Settings Section */}
				<div className="flex items-center gap-4">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FiSettings className="text-xl" />
						<span className="font-medium">Settings</span>
					</span>

					{/* Kurs Information */}
					<div className="flex items-center gap-2 text-gray-800">
						<BsCurrencyDollar className="text-lg text-green-500" />
						<span className="font-medium">Kurs:</span>
						<span className="font-semibold text-green-600">
							12,800 UZS
						</span>
					</div>
				</div>

				{/* Dropdown Options */}
				<div className="flex items-center gap-4 mx-2">
					<select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
						<option value="">Asosiy sotish narxi</option>
						<option value="">Optom sotish narxi</option>
					</select>

					<select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
						<option value="">$</option>
						<option value="">SUM</option>
					</select>
				</div>

				{/* Add New Sale Button */}
				<div className="mx-2">
					<button className="bg-gradient-to-r from-green-500 to-green-700 text-white flex items-center py-2 px-6 rounded-lg shadow hover:from-green-600 hover:to-green-800 transition">
						<span className="mr-3 inline-block">
							<FaPlus />
						</span>
						Yangi Sotuv
					</button>
				</div>
			</div>
			<div className="mr-2.5">
				<a
					href="/"
					className="flex items-center justify-center w-100 bg-red-700 hover:bg-red-600 text-slate-100 px-12 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
					onClick={handleExitClick} // Add the onClick event handler
				>
					<ImExit className="mr-3 text-xl" />
					<span className="font-semibold">Exit</span>
				</a>
			</div>
		</div>
	);
}

export default SalesPageLayoutFooter;

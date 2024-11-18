import React from "react";
import { FiSettings } from "react-icons/fi";
import { FaCalendar, FaPlus } from "react-icons/fa";
import { BsCurrencyDollar, BsFillTagsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { MdCalendarToday, MdOutlineFormatListBulleted } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { FaBuilding } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";

function SalesPageLayoutHeader() {
	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				{/* Settings Section */}
				<div className="flex items-center gap-4 pr-5">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FaBuilding className="text-xl" />
						<span className="font-medium">Dekor Land</span>
					</span>
				</div>

				<div className="flex items-center">
					<button className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600">
						<BsClock className="mr-3 text-xl" />
						<span className="font-semibold">Smena yopish</span>
					</button>
					<button className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600">
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">Klientlar</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				<button className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600">
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">Skidka</span>
				</button>
				<button className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-greeb-600">
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-semibold">списка</span>
				</button>
				<button className="flex items-center justify-center bg-blue-900 hover:bg-blue-950 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-950">
					<MdCalendarToday className="mr-3 text-xl" />
					<span className="font-semibold">11.18.2024</span>
				</button>
			</div>
		</div>
	);
}

export default SalesPageLayoutHeader;

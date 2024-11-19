import React, { useState, useEffect } from "react";
import { FaBuilding, FaSignal } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import {
	MdOutlineFormatListBulleted,
	MdCalendarToday,
	MdOutlineSignalWifiStatusbarConnectedNoInternet4,
	MdOutlineSignalWifiStatusbar4Bar,
} from "react-icons/md";

function SalesPageLayoutHeader() {
	const [isModalOpen, setIsModalOpen] = useState({
		klientlar: false,
		smenaYopish: false,
		skidka: false,
	});
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	// Update online status
	const updateOnlineStatus = () => setIsOnline(navigator.onLine);

	useEffect(() => {
		// Add event listeners for network status changes
		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		// Clean up event listeners on unmount
		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, []);

	const handleOpenModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: true }));
	};

	const handleCloseModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: false }));
	};

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FaBuilding className="text-xl" />
						<span className="font-medium">Dekor Land</span>
					</span>
				</div>
				<div className="flex items-center">
					<button
						onClick={() => handleOpenModal("smenaYopish")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<BsClock className="mr-3 text-xl" />
						<span className="font-semibold">Smena yopish</span>
					</button>
					<button
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">Klientlar</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				{isOnline ? (
					<button className="flex items-center mr-2 justify-center bg-green-500 hover:bg-green-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
						<MdOutlineSignalWifiStatusbar4Bar className="mr-3 text-xl" />
						<span className="font-semibold">Online</span>
					</button>
				) : (
					<button className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600">
						<MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="mr-3 text-xl" />
						<span className="font-semibold">Offline</span>
					</button>
				)}
				<button
					onClick={() => handleOpenModal("skidka")}
					className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">Skidka</span>
				</button>
				<button className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
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

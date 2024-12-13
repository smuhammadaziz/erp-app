import React, { useState, useEffect } from "react";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import { IoSync } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");
	const [language, setLanguage] = useLang("uz");
	const [isSyncing, setIsSyncing] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	const handleLanguageChange = (e) => {
		setLanguage(e.target.value);
	};

	const handleSync = async () => {
		const ksbId = localStorage.getItem("ksbIdNumber");
		const deviceId = localStorage.getItem("device_id");
		if (!ksbId || !deviceId) {
			alert("Missing ksbIdNumber or device_id in localStorage.");
			return;
		}

		setIsSyncing(true);

		try {
			await fetch(
				`http://localhost:8000/api/first/sync/${ksbId}/${deviceId}`,
				{
					method: "GET",
				},
			);
			setIsModalOpen(true); // Show the modal on success
		} catch (error) {
			// Optionally handle error
		} finally {
			setIsSyncing(false);
		}
	};

	return (
		<>
			<header className="flex justify-between items-center px-4 py-3 bg-gray-900 shadow-xl border-b border-gray-800 transition-all duration-500">
				<button
					className={`text-white px-6 py-2.5 rounded-xl flex items-center transition-all duration-300 ${
						isSyncing
							? "bg-gray-700 cursor-not-allowed"
							: "bg-gray-500/50 hover:bg-gray-700/50"
					}`}
					onClick={handleSync}
					disabled={isSyncing}
				>
					{isSyncing ? (
						<>
							<FiLoader
								size={20}
								className="animate-spin text-blue-400 mr-2"
							/>
							<span className="font-medium">Syncing...</span>
						</>
					) : (
						<>
							<IoSync size={20} className="text-blue-400 mr-2" />
							<span className="font-medium">Синхронизация</span>
						</>
					)}
				</button>

				<div className="flex items-center gap-x-6">
					<h2 className="text-white text-xl font-semibold tracking-wide">
						{content[language].header}
					</h2>

					<div className="relative group ">
						<select
							value={language}
							onChange={handleLanguageChange}
							className="appearance-none z-[50] bg-gray-700/50 text-white text-lg font-medium px-6 py-2.5 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600/50 transition-all duration-300 ease-in-out w-36 backdrop-blur-sm"
						>
							<option
								value="ru"
								className="py-2 text-lg bg-gray-800"
							>
								{content[language].innerLayout.rus}
							</option>
							<option
								value="uz"
								className="py-2 text-lg bg-gray-800"
							>
								{content[language].innerLayout.uz}
							</option>
						</select>
						<span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white pointer-events-none transition-transform duration-300 group-hover:translate-y-[-45%]">
							&#x25BC;
						</span>
					</div>

					<div className="text-gray-300 text-md font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
						<HiOutlineCalendar className="text-xl text-blue-400" />
						{date}
					</div>

					<div className="text-white text-lg font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
						<HiOutlineCurrencyDollar className="text-2xl text-green-400" />
						{currencyRate}
					</div>
				</div>
			</header>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Sync Completed
						</h2>
						<p className="text-gray-600 mb-6">
							Your data has been successfully synchronized!
						</p>
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
							onClick={() => setIsModalOpen(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default HeaderInner;


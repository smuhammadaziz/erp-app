import React, { useState, useEffect } from "react";
import { TbHandStop } from "react-icons/tb";

import { TbAlertSquareRounded } from "react-icons/tb";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function PermissionComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [language] = useLang("uz");

	useEffect(() => {
		const permissionModal = localStorage.getItem("devicePermission");
		if (permissionModal === "0") {
			setIsModalOpen(true);
			// localStorage.setItem("devicePermission", "1");
		}
	}, []);

	if (!isModalOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[444]">
			<div className="bg-white w-100 rounded-lg shadow-xl p-8 relative">
				<div className="w-[500px]">
					<TbAlertSquareRounded className="text-5xl text-center text-red-600 flex justify-center mx-auto mb-7" />
					<h2 className="text-2xl font-semibold font-sans text-black mb-7 text-center">
						Қурилмада чеклов мавжуд.
					</h2>

					<div className="flex items-center space-x-4">
						<button
							// onClick={startDownload}
							className="w-full bg-black border border-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
						>
							Қайта текшириш
						</button>
						<button
							// onClick={startDownload}
							className="w-full bg-slate-100 text-black border border-slate-200  px-6 py-3 rounded-lg hover:opacity-70 transition"
						>
							Дастурдан чиқиш
						</button>
					</div>
				</div>

				{/* {downloadStatus === "completed" && (
					<div className="text-center w-[500px]">
						<FaCheckCircle className="text-6xl text-center text-green-600 flex justify-center mx-auto mb-5" />
						<h2 className="text-2xl font-semibold text-black mb-4">
							{content[language].firstSync.syncComplete}
						</h2>
						<p className="text-black mb-6 text-lg">
							{content[language].firstSync.dataSuccessfullySynced}
						</p>
						<button
							onClick={() => {
								closeModal();
								handleUserSettings();
								handleSetCurrency();
								handleDeleteItems();
							}}
							className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
						>
							OK
						</button>
					</div>
				)} */}

				{/* {downloadStatus === "error" && (
					<div className="text-center w-[500px]">
						<MdErrorOutline className="text-red-500 text-6xl mb-6 flex justify-center mx-auto" />
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							{content[language].firstSync.syncFailed}
						</h2>
						<p className="text-red-600 mb-6">
							{
								content[language].firstSync
									.deviceAlreadyRegistered
							}
						</p>
						<div className="flex items-center ">
							<button
								onClick={() => setDownloadStatus("idle")}
								className="w-full mx-3  bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
							>
								{content[language].firstSync.tryAgain}
							</button>
							<NavLink
								to="/intro"
								className="w-full mx-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
							>
								{content[language].firstSync.goToKSB}
							</NavLink>
						</div>
					</div>
				)} */}

				{/* {isNoInternetModalOpen && (
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[790] p-4">
						<div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out scale-100 opacity-100 p-6 text-center">
							<div className="mb-6">
								<span className="text-center mx-auto justify-center block">
									<MdOutlinePortableWifiOff
										size={70}
										className="text-center text-6xl mx-auto inline-block py-5"
									/>
								</span>
								<h2 className="text-2xl font-bold text-gray-800 mb-2">
									{content[language].firstSync.noInternet}
								</h2>
								<p className="text-gray-600 mb-4">
									{content[language].firstSync.pleaseCheck}
								</p>
							</div>
							<button
								onClick={() => {
									setIsNoInternetModalOpen(false);
									setDownloadStatus("idle");
								}}
								className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300 font-semibold"
							>
								{content[language].firstSync.tryAgain}
							</button>
						</div>
					</div>
				)} */}
			</div>
		</div>
	);
}

export default PermissionComponent;


import React, { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoRefreshOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdFirstPage } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

import content from "../localization/content";
import useLang from "../hooks/useLang";
import nodeUrl from "../links";

const DeadlineOverlay = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [timer, setTimer] = useState(60);
	const [isUpdating, setIsUpdating] = useState(false);
	const [language] = useLang("uz");
	const [isExitModalOpen, setIsExitModalOpen] = useState(false);

	const ksb_id = localStorage.getItem("ksbIdNumber");
	const [data, setData] = useState();

	const makeApiRequest = async () => {
		try {
			const response = await fetch(`${nodeUrl}/api/${ksb_id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Connection: "keep-alive",
				},
				keepalive: true,
			});

			const data = await response.json();
			setData(data);

			if (data && data.response && data.response.its) {
				const deadlineDate = new Date(data.response.its);
				const endOfDay = new Date(
					deadlineDate.getFullYear(),
					deadlineDate.getMonth(),
					deadlineDate.getDate(),
					9,
					59,
					59,
				);

				localStorage.setItem("its_deadline", endOfDay.toISOString());

				if (endOfDay > new Date()) {
					window.location.reload();
				}
			}

			return data;
		} catch (error) {
			console.log("API request error:", error);
			return null;
		}
	};

	const checkDeadline = () => {
		const deadline = localStorage.getItem("its_deadline");
		if (!deadline) return false;
		const deadlineDate = new Date(deadline);
		return new Date() > deadlineDate;
	};

	useEffect(() => {
		const isExpired = checkDeadline();
		if (isExpired) {
			setShowOverlay(true);
			setTimeout(() => {
				setIsVisible(true);
			}, 50);
		}

		const interval = setInterval(() => {
			const isExpired = checkDeadline();
			if (isExpired && !showOverlay) {
				setShowOverlay(true);
				setTimeout(() => {
					setIsVisible(true);
				}, 50);
			}
		}, 60000);

		return () => clearInterval(interval);
	}, [showOverlay]);

	useEffect(() => {
		let countdown;
		if (showOverlay && isVisible) {
			countdown = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}

		return () => clearInterval(countdown);
	}, [showOverlay, isVisible]);

	useEffect(() => {
		if (timer <= 1 && timer > 0 && showOverlay) {
			makeApiRequest();
		} else if (timer <= 0) {
			setTimer(60);
			if (showOverlay) {
				makeApiRequest();
			}
		}
	}, [timer, showOverlay]);

	const handleManualUpdate = () => {
		setIsUpdating(true);
		makeApiRequest().finally(() => {
			setIsUpdating(false);
		});
	};

	const handleExit = () => {
		setIsVisible(false);
		setTimeout(() => {
			setShowOverlay(false);
			window.close();
		}, 300);
	};

	if (!showOverlay) return null;

	return (
		<div
			className={`fixed inset-0 z-[790] transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`absolute inset-0 backdrop-blur-sm bg-black/80 transition-all duration-300 ${
					isVisible ? "scale-100" : "scale-95"
				}`}
			/>

			<div className="relative h-full flex flex-col items-center justify-center px-6 py-12">
				<div
					className={`w-full max-w-4xl flex flex-col items-center transition-all duration-300 ${
						isVisible
							? "scale-100 translate-y-0"
							: "scale-95 translate-y-4"
					}`}
				>
					<div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-12 w-full">
						<div className="text-center mb-12">
							<BiErrorCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
							<h2 className="text-3xl font-medium text-gray-900 mb-4">
								{content[language].itsDeadlineModal.yourITS}
							</h2>
							<p className="text-gray-600 text-xl max-w-lg mx-auto">
								{content[language].itsDeadlineModal.updateITS}
							</p>
						</div>

						<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
							<button
								onClick={handleManualUpdate}
								disabled={isUpdating}
								className={`w-full flex items-center justify-center ${
									isUpdating
										? "bg-green-500"
										: "bg-green-700 hover:bg-green-600"
								} text-white py-4 px-6 rounded-lg font-medium text-lg transition-all`}
							>
								<IoRefreshOutline className="w-5 h-5 mr-3" />
								<span>
									{content[language].enterpriseInfo.update} (
									{timer})
								</span>
							</button>
							{/* <NavLink
								to="/intro"
								className="w-full flex items-center justify-center border border-gray-300 bg-white text-black py-4 px-6 rounded-lg font-medium text-lg transition-all hover:bg-gray-100"
							>
								<MdFirstPage className="w-5 h-5 mr-3" />
								<span>
									{content[language].enterpriseInfo.signout}
								</span>
							</NavLink> */}
							<button
								onClick={() => setIsExitModalOpen(true)}
								className="w-full flex items-center justify-center bg-white border border-gray-300 text-black py-4 px-6 rounded-lg font-medium text-lg transition-all hover:bg-gray-100"
							>
								<FiLogOut className="w-5 h-5 mr-3" />
								<span>
									{
										content[language].itsDeadlineModal
											.exitProgram
									}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{isExitModalOpen && (
				<div className="fixed inset-0 z-10 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm">
					<div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out">
						<div className="text-center mb-8">
							<IoExitOutline className="text-4xl mx-auto mb-6 text-gray-800" />
							<h2 className="text-2xl font-medium text-gray-900 mb-3">
								{content[language].exit.exit}
							</h2>
							<p className="text-gray-600 text-lg mb-8">
								{content[language].exit.exitTest}
							</p>
						</div>
						<div className="flex space-x-4">
							<button
								onClick={handleExit}
								className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium text-lg transition-all hover:bg-gray-800"
							>
								OK
							</button>
							<button
								onClick={() => setIsExitModalOpen(false)}
								className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium text-lg transition-all hover:bg-gray-200"
							>
								{
									content[language].salesPage
										.headerDiscountCancel
								}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeadlineOverlay;


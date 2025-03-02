import React, { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoRefreshOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdFirstPage } from "react-icons/md";

import content from "../localization/content";
import useLang from "../hooks/useLang";

import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const DeadlineOverlay = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [timer, setTimer] = useState(60);
	const [isUpdating, setIsUpdating] = useState(false);

	const [language] = useLang("uz");

	const [isExitModalOpen, setIsExitModalOpen] = useState(false);

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
			// Delay the visibility for animation
			setTimeout(() => setIsVisible(true), 50);
		}

		const interval = setInterval(() => {
			checkDeadline();
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let countdown;
		if (isUpdating && timer > 0) {
			countdown = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else if (timer === 0) {
			setIsUpdating(false);
			setTimer(60);
			const isExpired = checkDeadline();
			if (isExpired) {
				setShowOverlay(true);
				setTimeout(() => setIsVisible(true), 50);
			}
		}
		return () => clearInterval(countdown);
	}, [isUpdating, timer]);

	const handleUpdate = () => {
		setIsUpdating(true);
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
				className={`absolute inset-0 backdrop-blur-md bg-red-400/30 transition-all duration-300 ${
					isVisible ? "scale-100" : "scale-95"
				}`}
			/>
			<div className="relative h-full flex flex-col items-center justify-center px-4">
				<div
					className={`w-full max-w-4xl flex flex-col items-center transition-all duration-300 ${
						isVisible
							? "scale-100 translate-y-0"
							: "scale-95 translate-y-4"
					}`}
				>
					<div className="mb-12 text-center">
						<BiErrorCircle className="w-24 h-24 text-red-600 mx-auto mb-8 animate-pulse" />
						<h2 className="text-3xl font-bold text-black text-center mb-2">
							Sizning ITS muddatingiz tugadi
						</h2>
						<p className="text-black mt-3 text-lg">
							Iltimos, obunangizni yangilang
						</p>
					</div>
					<div className="w-full flex justify-between mt-auto mb-16">
						<button
							onClick={handleUpdate}
							className="w-full flex items-center mx-4 justify-center space-x-3 bg-blue-600/90 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
						>
							<IoRefreshOutline className="w-6 h-6" />
							<span>Янгилаш (60)</span>
						</button>
						<NavLink
							to="/intro"
							className="w-full flex items-center mx-4 justify-center space-x-3 bg-orange-600/90 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
						>
							<MdFirstPage className="w-6 h-6" />
							<span>KSB-ID дан чиқиш</span>
						</NavLink>
						<button
							onClick={() => setIsExitModalOpen(true)}
							className="w-full flex items-center mx-4 justify-center space-x-3 bg-red-600/90 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
						>
							<FiLogOut className="w-6 h-6" />
							<span>Дастурдан чиқиш</span>
						</button>
					</div>
				</div>
			</div>

			{isExitModalOpen && (
				<div className="fixed inset-0 z-10  bg-black bg-opacity-80 flex items-center justify-center p-8">
					<div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-10 space-y-6 transform transition-all duration-300 ease-in-out">
						<div className="text-center">
							<IoExitOutline className="text-5xl font-bold mb-4 flex justify-center mx-auto text-center" />
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								{content[language].exit.exit}
							</h2>
							<p className="text-black text-lg mb-6">
								{content[language].exit.exitTest}
							</p>
						</div>
						<div className="flex space-x-4">
							<button
								onClick={handleExit}
								className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								<ImExit className="mr-2 text-xl" />
								OK
							</button>
							<button
								onClick={() => setIsExitModalOpen(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								<FaTimes className="mr-2 text-xl" />
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


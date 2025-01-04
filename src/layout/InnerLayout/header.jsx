import React, { useState, useEffect, useRef } from "react";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import { IoSync } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbUserHexagon } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameDay,
	isToday,
	getDay,
	addDays,
} from "date-fns";

import { RiExchangeLine } from "react-icons/ri";
import { MdOutlineCurrencyExchange } from "react-icons/md";

import nodeUrl from "../../links";

function HeaderInner({ onRefresh }) {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");
	const [language, setLanguage] = useLang("uz");
	const [isSyncing, setIsSyncing] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [rate, setRate] = useState([]);
	const calendarRef = useRef(null);
	const dateRef = useRef(null);

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");
	const basicUsername = localStorage.getItem("userType");
	let basicPassword = localStorage.getItem("userPassword");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");

	if (basicPassword === "EMPTY_PASSWORD_ALLOWED") {
		basicPassword = "";
	}
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target) &&
				dateRef.current &&
				!dateRef.current.contains(event.target)
			) {
				setIsCalendarOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
		if (!ksbId || !deviceId) {
			alert("Missing ksbIdNumber or device_id in localStorage.");
			return;
		}

		setIsSyncing(true);

		try {
			await fetch(`${nodeUrl}/api/first/sync/${ksbId}/${deviceId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"ipaddress:port": ipaddressPort,
					database: mainDatabase,
					userName: basicUsername,
					userPassword: basicPassword,
				}),
			});
			setIsModalOpen(true);
			if (onRefresh) onRefresh();
		} catch (error) {
			console.log(error);
		} finally {
			setIsSyncing(false);
		}
	};

	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	const handleDateSelect = (date) => {
		setSelectedDate(date);
		setIsCalendarOpen(false);
	};

	const renderCalendarDays = () => {
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(currentMonth);
		const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

		const firstDayOfMonth = getDay(monthStart);
		const emptyDays = Array(firstDayOfMonth).fill(null);

		const allDays = [...emptyDays, ...days];

		return allDays.map((day, index) => {
			if (!day) {
				return (
					<div key={index} className="text-xs p-1 text-center"></div>
				);
			}
			return (
				<button
					key={day.toString()}
					onClick={() => handleDateSelect(day)}
					className={`
						p-1 text-center rounded-lg transition-colors duration-200 text-xs
						${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : "text-gray-700"}
						${isToday(day) ? "border-2 border-green-500" : ""}
						hover:bg-blue-100 focus:outline-none
					`}
				>
					{format(day, "d")}
				</button>
			);
		});
	};

	const changeMonth = (direction) => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(newMonth.getMonth() + direction);
		setCurrentMonth(newMonth);
	};

	useEffect(() => {
		const localStorageKey = "currency_rate";

		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/currency/${ksbId}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							ipaddressPort: ipaddressPort,
							database: mainDatabase,
							userUsername: basicUsername,
							userPassword: basicPassword,
							deviceId: deviceId,
						}),
					},
				);

				const data = await response.json();

				localStorage.setItem(
					localStorageKey,
					JSON.stringify(data.detail),
				);
				setRate(data.detail);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		const cachedRate = localStorage.getItem(localStorageKey);

		if (cachedRate) {
			try {
				setRate(JSON.parse(cachedRate));
			} catch (error) {
				console.error("Error parsing localStorage data:", error);
				fetchProducts();
			}
		} else {
			fetchProducts();
		}

		fetchProducts();
	}, []);

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

				{/* <p className="text-white text-lg">{basicUsername}</p> */}

				<div className="flex items-center gap-x-6">
					<h2 className="text-white text-xl font-semibold tracking-wide">
						{content[language].header}
					</h2>

					<div className="relative group">
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

					<div className="relative">
						<div
							ref={dateRef}
							onClick={toggleCalendar}
							className="text-gray-300 text-lg font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300 cursor-pointer"
						>
							<HiOutlineCalendar className="text-xl text-blue-400" />
							{format(selectedDate, "MM.dd.yyyy")}
						</div>

						{isCalendarOpen && (
							<div
								ref={calendarRef}
								className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
							>
								<div className="flex justify-between items-center p-4 pb-0">
									<button
										onClick={() => changeMonth(-1)}
										className="text-gray-600 hover:text-blue-500 transition-colors"
									>
										←
									</button>
									<h2 className="text-xl font-semibold">
										{format(currentMonth, "MMMM yyyy")}
									</h2>
									<button
										onClick={() => changeMonth(1)}
										className="text-gray-600 hover:text-blue-500 transition-colors"
									>
										→
									</button>
								</div>

								{/* Weekday Headers */}
								<div className="grid grid-cols-7 gap-1 text-center text-gray-500 px-4 pt-2">
									{[
										"Sun",
										"Mon",
										"Tue",
										"Wed",
										"Thu",
										"Fri",
										"Sat",
									].map((day) => (
										<div key={day} className="text-xs">
											{day}
										</div>
									))}
								</div>

								<div className="grid grid-cols-7 gap-1 p-4">
									{renderCalendarDays()}
								</div>
							</div>
						)}
					</div>

					<div className="text-white text-lg font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
						<MdOutlineCurrencyExchange className="text-xl text-green-400" />
						{(() => {
							try {
								return rate &&
									rate.length > 0 &&
									rate[0].key === "usd"
									? `1 $ = ${rate[0].rate} сум`
									: "No data";
							} catch (error) {
								return "No data";
							}
						})()}
					</div>
					<div className="text-white text-md font-medium flex items-center gap-2 bg-gray-800/40 px-6 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
						{basicUsername ? basicUsername : "Loading..."}
						<HiOutlineUserCircle className="text-xl text-white ml-2" />
					</div>
				</div>
			</header>

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


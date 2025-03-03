import React, { useState, useEffect } from "react";
import { TbHandStop } from "react-icons/tb";
import { TbAlertSquareRounded } from "react-icons/tb";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import nodeUrl from "../../links";
import { NavLink } from "react-router-dom";

const { app } = window.require("@electron/remote");

function PermissionComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [language] = useLang("uz");

	const onQuit = () => app.quit();

	useEffect(() => {
		const permissionModal = localStorage.getItem("devicePermission");
		if (permissionModal === "0") {
			setIsModalOpen(true);
		}
	}, []);

	const ipaddress = localStorage.getItem("ipaddress:port");
	const database = localStorage.getItem("mainDatabase");
	const username = localStorage.getItem("userType");
	const userpassword = localStorage.getItem("userPassword");

	const ksb_id = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");

	const handleFetchData = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${nodeUrl}/api/permission/${ksb_id}/${device_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						ipaddress: ipaddress,
						database: database,
						username: username,
						password: userpassword,
					}),
				},
			);

			const data = await response.json();

			console.log(data);

			if (data.status === "successfully") {
				localStorage.setItem("devicePermission", "1");
				setIsModalOpen(false); // Close modal on success
			} else if (data.status === "error") {
				setToastMessage("Bu qurilma hali beri tasdiqlanmadi");
				setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
			} else if (data.status === "empty") {
				// Show only "KSB ID dan chiqish" and "Дастурдан чиқиш" buttons
			} else {
				localStorage.setItem("devicePermission", "0");
			}
		} catch (err) {
			console.log("error getting permission");
		}
	};

	if (!isModalOpen) return null;

	return (
		<>
			<div className="fixed inset-0 flex backdrop-blur-lg bg-black/80 items-center justify-center bg-black bg-opacity-50 z-[444]">
				<div className="bg-white w-100 rounded-lg shadow-xl p-8 relative">
					<div className="w-[500px]">
						<TbAlertSquareRounded className="text-5xl text-center text-red-600 flex justify-center mx-auto mb-7" />
						<h2 className="text-2xl font-semibold font-sans text-black mb-7 text-center">
							{toastMessage
								? "Qurilma topilmadi."
								: "Қурилмада чеклов мавжуд."}
						</h2>

						<div className="flex items-center space-x-4">
							{toastMessage ? (
								<>
									<button
										onClick={onQuit}
										className="w-full bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										Дастурдан чиқиш
									</button>
									<NavLink
										to="/intro"
										className="w-full bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										KSB ID dan chiqish
									</NavLink>
								</>
							) : (
								<>
									<button
										onClick={handleFetchData}
										className="w-full bg-black border border-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
									>
										Қайта текшириш
									</button>
									<button
										onClick={onQuit}
										className="w-full bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										Дастурдан чиқиш
									</button>
									{/* <NavLink
										to="/intro"
										className="w-full bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										KSB ID dan chiqish
									</NavLink> */}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{toastMessage && (
				<div className="fixed bottom-4 z-[400] right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
					{toastMessage}
				</div>
			)}
		</>
	);
}

export default PermissionComponent;


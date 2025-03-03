import React, { useState, useEffect } from "react";
import { TbAlertSquareRounded } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import nodeUrl from "../../links";

const { app } = window.require("@electron/remote");

function PermissionComponent({ onComplete }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [statusText, setStatusText] = useState("Қурилмада чеклов мавжуд.");
	const [status, setStatus] = useState();
	const [language] = useLang("uz");

	const ipaddress = localStorage.getItem("ipaddress:port");
	const database = localStorage.getItem("mainDatabase");
	const username = localStorage.getItem("userType");
	const userpassword = localStorage.getItem("userPassword");

	const ksb_id = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");

	const onQuit = () => app.quit();

	useEffect(() => {
		const permissionModal = localStorage.getItem("devicePermission");
		if (permissionModal === "0") {
			setIsModalOpen(true);
		}
	}, []);

	const handleFetchData = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/permission/${ksb_id}/${device_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						ipaddress,
						database,
						username,
						password: userpassword,
					}),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.status === "successfully") {
				setToastMessage(
					`${content[language].permissionModal.tasdiqlandi}`,
				);
				localStorage.setItem("devicePermission", "1");
				setIsModalOpen(false);
				onComplete();
				setStatus("successfully");
			} else if (data.status === "error") {
				setStatusText(
					`${content[language].permissionModal.haliBeriTasdiqlanmadi}`,
				);
				setToastMessage(
					`${content[language].permissionModal.haliBeriTasdiqlanmadi}`,
				);
				setStatus("error");
			} else if (data.status === "empty") {
				setToastMessage("Empty");
				setStatusText(
					`${content[language].permissionModal.qurilmaTopilmadi}`,
				);
				setStatus("empty");
			} else {
				localStorage.setItem("devicePermission", "0");
			}
		} catch (err) {
			console.error("Fetch Error:", err);
			setToastMessage(
				`${content[language].permissionModal.qurilmadaXatolik}`,
			);
		} finally {
			setTimeout(() => setToastMessage(""), 2000);
		}
	};

	if (!isModalOpen) return null;

	return (
		<>
			<div className="fixed inset-0 flex backdrop-blur-lg bg-black/80 items-center justify-center bg-opacity-50 z-[444]">
				<div className="bg-white w-100 rounded-lg shadow-xl p-8 relative">
					<div className="w-[500px]">
						<TbAlertSquareRounded className="text-5xl text-center text-red-600 flex justify-center mx-auto mb-7" />
						<h2 className="text-2xl font-semibold font-sans text-black mb-7 text-center">
							{statusText}
						</h2>

						<div className="flex items-center space-x-4">
							{status == "empty" ? (
								<>
									<button
										onClick={onQuit}
										className="w-full bg-black border border-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
									>
										{
											content[language].permissionModal
												.dasturdanChiqish
										}
									</button>
									<NavLink
										to="/intro"
										className="w-full text-center flex justify-center bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										{
											content[language].permissionModal
												.ksbidDanChiqish
										}
									</NavLink>
								</>
							) : (
								<>
									<button
										onClick={handleFetchData}
										className="w-full bg-black border border-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
									>
										{
											content[language].permissionModal
												.qaytaUrinish
										}
									</button>
									<button
										onClick={onQuit}
										className="w-full bg-slate-100 text-black border border-slate-200 px-6 py-3 rounded-lg hover:opacity-70 transition"
									>
										{
											content[language].permissionModal
												.dasturdanChiqish
										}
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{toastMessage && (
				<div className="fixed bottom-4 z-[500] right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
					{toastMessage}
				</div>
			)}
		</>
	);
}

export default PermissionComponent;


import React, { useState, useEffect } from "react";
import moment from "moment";

import content from "../../../localization/content";
import useLang from "../../../hooks/useLang";

import nodeUrl from "../../../links";

const DeviceIcon = ({ type }) => {
	return (
		<div className="relative">
			<div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg">
				{type === "Laptop" && (
					<svg
						className="w-6 h-6 text-blue-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect
							x="2"
							y="3"
							width="20"
							height="14"
							rx="2"
							ry="2"
						></rect>
						<line x1="2" y1="20" x2="22" y2="20"></line>
					</svg>
				)}
				{type === "Mobile" && (
					<svg
						className="w-6 h-6 text-purple-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect
							x="7"
							y="2"
							width="10"
							height="20"
							rx="2"
							ry="2"
						></rect>
						<line x1="12" y1="18" x2="12" y2="18"></line>
					</svg>
				)}
				{type === "Desktop" && (
					<svg
						className="w-6 h-6 text-emerald-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect
							x="2"
							y="3"
							width="20"
							height="14"
							rx="2"
							ry="2"
						></rect>
						<line x1="8" y1="21" x2="16" y2="21"></line>
						<line x1="12" y1="17" x2="12" y2="21"></line>
					</svg>
				)}
			</div>
		</div>
	);
};

const CurrentDeviceBadge = () => (
	<span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
		<svg
			className="w-3 h-3 mr-1"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2L2 7L12 12L22 7L12 2Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2 17L12 22L22 17"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2 12L12 17L22 12"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		Current Device
	</span>
);

const ActiveSessions = () => {
	const [language, setLanguage] = useLang("uz");

	const [users, setUsers] = useState([]);
	const device_id = localStorage.getItem("device_id");
	const ksb_id = localStorage.getItem("ksbIdNumber");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/active/users/${device_id}/${ksb_id}`,
					{
						method: "POST",
					},
				);
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
			<div className="p-6 border-b border-slate-100">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-slate-800">
						{content[language].settingsUsers.users}
					</h2>
					<span className="px-3 py-1 text-sm font-medium text-slate-600 bg-slate-100 rounded-full">
						{users.length} {content[language].settingsUsers.active}
					</span>
				</div>
			</div>

			<div className="p-6 space-y-4">
				{users.map((session) => (
					<div
						key={session.date}
						className={`group relative overflow-hidden rounded-lg border bg-white p-4 transition-all duration-200 hover:shadow-md
              ${
					session.isCurrentDevice
						? "border-blue-200 bg-blue-50/30"
						: "border-slate-200"
				}`}
					>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<DeviceIcon type="Laptop" />
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<h3 className="font-medium text-slate-900">
											{session.usertype}
										</h3>
										{session.isCurrentDevice && (
											<CurrentDeviceBadge />
										)}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<span className="text-sm text-slate-400">
									{moment(
										session.last_entered_time,
									).calendar()}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActiveSessions;

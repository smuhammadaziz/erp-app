import React, { useState } from "react";

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

const StatusBadge = ({ isActive }) => {
	return (
		<span
			className={`px-2 py-1 text-xs font-medium rounded-full ${
				isActive
					? "bg-green-100 text-green-700"
					: "bg-slate-100 text-slate-500"
			}`}
		>
			{isActive ? "Active" : "Inactive"}
		</span>
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

const LogoutButton = ({ onClick, isCurrentDevice }) => (
	<button
		onClick={onClick}
		className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
      ${
			isCurrentDevice
				? "text-red-600 hover:bg-red-50"
				: "text-slate-600 hover:bg-slate-50"
		}`}
	>
		<svg
			className={`w-4 h-4 transition-all duration-200 ${
				isCurrentDevice
					? "text-red-500"
					: "text-slate-400 group-hover:text-slate-500"
			}`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 17L21 12L16 7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M21 12H9"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		{isCurrentDevice ? "Sign out" : "Terminate session"}
	</button>
);

const ActiveSessions = () => {
	const [sessions, setSessions] = useState([
		{
			id: 1,
			location: "New York, USA",
			ip: "192.168.1.1",
			deviceName: "John's Laptop",
			deviceType: "Laptop",
			isActive: true,
			lastActive: "2 minutes ago",
			isCurrentDevice: true,
		},
		{
			id: 2,
			location: "London, UK",
			ip: "192.168.1.2",
			deviceName: "Sarah's Phone",
			deviceType: "Mobile",
			isActive: false,
			lastActive: "15 minutes ago",
			isCurrentDevice: false,
		},
	]);

	const handleLogout = (sessionId) => {
		const session = sessions.find((s) => s.id === sessionId);
		if (session.isCurrentDevice) {
			console.log("Logging out current device...");
		} else {
			setSessions(sessions.filter((s) => s.id !== sessionId));
		}
	};

	const activeCount = sessions.filter((s) => s.isActive).length;

	return (
		<div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
			<div className="p-6 border-b border-slate-100">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-slate-800">
						Active Sessions
					</h2>
					<span className="px-3 py-1 text-sm font-medium text-slate-600 bg-slate-100 rounded-full">
						{activeCount} active
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 space-y-4">
				{sessions.map((session) => (
					<div
						key={session.id}
						className={`group relative overflow-hidden rounded-lg border bg-white p-4 transition-all duration-200 hover:shadow-md
              ${
					session.isCurrentDevice
						? "border-blue-200 bg-blue-50/30"
						: "border-slate-200"
				}`}
					>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<DeviceIcon type={session.deviceType} />
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<h3 className="font-medium text-slate-900">
											{session.deviceName}
										</h3>
										<StatusBadge
											isActive={session.isActive}
										/>
										{session.isCurrentDevice && (
											<CurrentDeviceBadge />
										)}
									</div>
									<div className="flex items-center gap-4 text-sm text-slate-500">
										<span className="flex items-center gap-1">
											<svg
												className="h-4 w-4"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<circle
													cx="12"
													cy="12"
													r="10"
												></circle>
												<line
													x1="2"
													y1="12"
													x2="22"
													y2="12"
												></line>
												<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
											</svg>
											{session.location}
										</span>
										<span className="flex items-center gap-1">
											<svg
												className="h-4 w-4"
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
													y="2"
													width="20"
													height="8"
													rx="2"
													ry="2"
												></rect>
												<rect
													x="2"
													y="14"
													width="20"
													height="8"
													rx="2"
													ry="2"
												></rect>
												<line
													x1="6"
													y1="6"
													x2="6.01"
													y2="6"
												></line>
												<line
													x1="6"
													y1="18"
													x2="6.01"
													y2="18"
												></line>
											</svg>
											{session.ip}
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<span className="text-sm text-slate-400">
									{session.lastActive}
								</span>
								<LogoutButton
									onClick={() => handleLogout(session.id)}
									isCurrentDevice={session.isCurrentDevice}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActiveSessions;

import React, { useState } from "react";
import {
	FaUser,
	FaLock,
	FaBell,
	FaCog,
	FaQuestionCircle,
	FaSignOutAlt,
	FaDesktop,
	FaTabletAlt,
	FaMobile,
} from "react-icons/fa";

import { Layout } from "../../components/Layout";
import InnerLayoutSection from "../../components/InnerLayout/innerlayout";
import ActiveSessions from "../../components/settings/settings";

function SettingsPage() {
	const [activeSection, setActiveSection] = useState("Personal Information");

	const settingsItems = [
		{
			icon: <FaUser className="w-5 h-5 text-blue-500" />,
			title: "Personal Information",
			description: "Manage your personal details",
		},
		{
			icon: <FaLock className="w-5 h-5 text-green-500" />,
			title: "Security",
			description: "Password and two-factor authentication",
		},
		{
			icon: <FaBell className="w-5 h-5 text-purple-500" />,
			title: "Notifications",
			description: "Control your notification preferences",
		},
		{
			icon: <FaCog className="w-5 h-5 text-gray-500" />,
			title: "Preferences",
			description: "Customize your experience",
		},
		{
			icon: <FaQuestionCircle className="w-5 h-5 text-orange-500" />,
			title: "Support",
			description: "Get help and contact support",
		},
	];

	return (
		<Layout>
			<InnerLayoutSection>
				<div className="min-h-screen bg-gray-100">
					<div className="container mx-auto">
						<div className="flex space-x-6">
							{/* Sidebar Navigation */}
							<div className="w-1/4 bg-white shadow-lg rounded-xl p-6 h-fit">
								<h2 className="text-xl font-bold text-gray-800 mb-6">
									Settings
								</h2>
								<nav>
									{settingsItems.map((item, index) => (
										<div
											key={index}
											className={`flex items-center p-3 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer group mb-2 ${
												activeSection === item.title
													? "bg-blue-50 text-blue-600"
													: ""
											}`}
											onClick={() =>
												setActiveSection(item.title)
											}
										>
											<div className="mr-4">
												{item.icon}
											</div>
											<div className="flex-grow">
												<h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
													{item.title}
												</h3>
											</div>
										</div>
									))}
									<div className="mt-4 pt-4 border-t">
										<button className="w-full flex items-center text-red-500 hover:bg-red-50 p-3 rounded-lg transition-colors">
											<FaSignOutAlt className="mr-2 w-4 h-4" />
											<span className="text-sm">
												Logout
											</span>
										</button>
									</div>
								</nav>
							</div>

							{/* Main Content Area */}
							<div className="w-3/4 space-y-6">
								{/* Personal Information Section */}
								{activeSection === "Personal Information" && (
									<div className="bg-white shadow-lg rounded-xl p-6">
										<h2 className="text-xl font-bold text-gray-800 mb-4">
											Personal Information
										</h2>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													First Name
												</label>
												<input
													type="text"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="Enter first name"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Last Name
												</label>
												<input
													type="text"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="Enter last name"
												/>
											</div>
											<div className="col-span-2">
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Email
												</label>
												<input
													type="email"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="Enter email address"
												/>
											</div>
										</div>
									</div>
								)}

								{/* Security Section */}
								{activeSection === "Security" && (
									<>
										<ActiveSessions />

										{/* Security Section from original code */}
										<div className="bg-white shadow-lg rounded-xl p-6">
											<h2 className="text-xl font-bold text-gray-800 mb-4">
												Security
											</h2>
											<div className="space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Current Password
													</label>
													<input
														type="password"
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
														placeholder="Enter current password"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														New Password
													</label>
													<input
														type="password"
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
														placeholder="Enter new password"
													/>
												</div>
												<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
													Update Password
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</InnerLayoutSection>
		</Layout>
	);
}

export default SettingsPage;

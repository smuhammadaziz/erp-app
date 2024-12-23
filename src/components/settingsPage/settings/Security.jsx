import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SectionContainer from "./SectionContainer";
import { toast, Toaster } from "sonner";

import nodeUrl from "../../../links";

function Security() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const togglePasswordVisibility = (setter, currentState) => {
		setter(!currentState);
	};

	const handleUpdatePassword = async () => {
		const surname = localStorage.getItem("userType");

		if (!currentPassword || !newPassword || !confirmPassword) {
			toast.error("All fields are required.");
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("New password and confirm password do not match.");
			return;
		}

		try {
			const response = await fetch(`${nodeUrl}/api/change`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					surname: surname || "",
					old: currentPassword,
					news: newPassword,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				const errorMessage =
					data.message.uz || "Failed to update password.";
				toast.error(errorMessage);
				return;
			}

			toast.success("Password updated successfully.");

			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (error) {
			toast.error("An error occurred while updating the password.");
		}
	};

	return (
		<>
			<Toaster position="bottom-right" richColors />{" "}
			<SectionContainer title="Security">
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Enter Current Password
						</label>
						<div className="relative">
							<input
								type={showCurrentPassword ? "text" : "password"}
								className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter current password"
								value={currentPassword}
								onChange={(e) =>
									setCurrentPassword(e.target.value)
								}
							/>
							<button
								type="button"
								onClick={() =>
									togglePasswordVisibility(
										setShowCurrentPassword,
										showCurrentPassword,
									)
								}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
							>
								{showCurrentPassword ? (
									<FaEyeSlash size={20} />
								) : (
									<FaEye size={20} />
								)}
							</button>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Enter New Password
						</label>
						<div className="relative">
							<input
								type={showNewPassword ? "text" : "password"}
								className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter new password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() =>
									togglePasswordVisibility(
										setShowNewPassword,
										showNewPassword,
									)
								}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
							>
								{showNewPassword ? (
									<FaEyeSlash size={20} />
								) : (
									<FaEye size={20} />
								)}
							</button>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Enter Your New Password Again
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter new password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
							<button
								type="button"
								onClick={() =>
									togglePasswordVisibility(
										setShowConfirmPassword,
										showConfirmPassword,
									)
								}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
							>
								{showConfirmPassword ? (
									<FaEyeSlash size={20} />
								) : (
									<FaEye size={20} />
								)}
							</button>
						</div>
					</div>

					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
						onClick={handleUpdatePassword}
					>
						Update Password
					</button>
				</div>
			</SectionContainer>
		</>
	);
}

export default Security;

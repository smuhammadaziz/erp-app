import React from "react";
import SectionContainer from "./SectionContainer";
import ActiveSessions from "./settings";

function Security() {
	return (
		<>
			<ActiveSessions />
			<SectionContainer title="Security">
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
			</SectionContainer>
		</>
	);
}

export default Security;

import React from "react";
import SectionContainer from "./SectionContainer";
import ActiveSessions from "./settings";

function PersonalInformation() {
	return (
		<>
			{/* <SectionContainer title="Personal Information">
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
			</SectionContainer> */}
			<ActiveSessions />
		</>
	);
}

export default PersonalInformation;

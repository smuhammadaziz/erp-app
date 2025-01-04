import React from "react";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCheck,
	FaTimes,
	FaEye,
	FaTrash,
} from "react-icons/fa";

const CustomerRow = ({ customer, onView, index }) => {
	return (
		<tr
			className="hover:bg-gray-50 transition-colors duration-200 active:bg-gray-300 cursor-pointer"
			onDoubleClick={() => onView(customer)}
		>
			<td className="px-6 whitespace-nowrap text-sm font-medium text-gray-900">
				{index}
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
						<FaUser className="text-blue-600" />
					</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-gray-900">
							{customer.name}
						</div>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center text-sm text-gray-600">
					<FaPhone className="mr-2 text-gray-400" />
					{customer.phone_number || "No phone number"}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="whitespace-nowrap text-center">
					<button
						onClick={() => onView(customer)}
						className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors rounded px-3 py-1 flex items-center space-x-2"
						title="View Details"
					>
						<FaEye />
						<span>View</span>
					</button>
				</div>
			</td>
		</tr>
	);
};

export default CustomerRow;

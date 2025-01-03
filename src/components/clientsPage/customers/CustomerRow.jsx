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

const CustomerRow = ({ customer, onView, onDelete }) => {
	const getStatusColor = (status) =>
		status === "Active"
			? "bg-green-100 text-green-700"
			: "bg-red-100 text-red-700";

	return (
		<tr className="hover:bg-gray-50 transition-colors duration-200">
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
						<FaUser className="text-blue-600" />
					</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-gray-900">
							{customer.name} {customer.surname}
						</div>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center text-sm text-gray-600">
					<FaPhone className="mr-2 text-gray-400" />
					{customer.phone_number}
				</div>
			</td>
			{/* <td className="px-6 py-4 whitespace-nowrap">
				<span
					className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
						customer.status,
					)}`}
				>
					{customer.status === "Active" ? (
						<FaCheck className="mr-1" />
					) : (
						<FaTimes className="mr-1" />
					)}
					{customer.status}
				</span>
			</td> */}
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex justify-center space-x-4">
					<button
						onClick={() => onView(customer)}
						className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors rounded px-3 py-1 flex items-center space-x-2"
						title="View Product"
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


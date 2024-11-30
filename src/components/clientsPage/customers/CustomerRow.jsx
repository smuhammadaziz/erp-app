// CustomerRow.js
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
					<FaEnvelope className="mr-2 text-gray-400" />
					{customer.email}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center text-sm text-gray-600">
					<FaPhone className="mr-2 text-gray-400" />
					{customer.phone_number}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
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
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => onView(customer)}
						className="flex items-center text-blue-600 hover:text-blue-900 transition-colors duration-200"
					>
						<FaEye className="mr-1" />
						<span>View</span>
					</button>
					<button
						onClick={() => onDelete(customer.id)}
						className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200"
					>
						<FaTrash className="mr-1" />
						<span>Delete</span>
					</button>
				</div>
			</td>
		</tr>
	);
};

export default CustomerRow;

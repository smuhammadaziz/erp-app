import React from "react";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCheck,
	FaTimes,
	FaEye,
	FaTrash,
	FaUsers,
	FaUserPlus,
	FaSearch,
} from "react-icons/fa";

import { SlBasket } from "react-icons/sl";

import data from "./data.json";

const ProductsPageComponent = () => {
	// Sample data with more entries to demonstrate scrolling

	const getStatusColor = (status) => {
		return status === "Active"
			? "bg-green-100 text-green-700"
			: "bg-red-100 text-red-700";
	};

	return (
		<div className="bg-gray-50 h-screen">
			{/* Container with 40% width */}
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Header Section */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 px-3 bg-blue-50 rounded-lg">
								<SlBasket className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								Product Details
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							{/* Search Bar */}
							<div className="relative flex-grow">
								<input
									type="text"
									placeholder="Search customers..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							</div>
							{/* Add Customer Button */}
							<button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
								<FaUserPlus className="mr-2" />
								<span>Add Product</span>
							</button>
						</div>
					</div>
				</div>

				{/* Table Section with fixed height and scroll */}
				<div className="overflow-x-auto h-[65vh]">
					{" "}
					{/* Reduced height to make space for the header */}
					<table className="w-full">
						<thead className="bg-gray-50 sticky top-0 z-10">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									product_name
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									currency
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									box
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									remaining
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									price_in_currency
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									price_in_UZS
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									warehouse
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((customer) => (
								<tr
									key={customer.id}
									className="hover:bg-gray-50 transition-colors duration-200"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.product_name}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.currency}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.box}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.remaining}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.price_in_currency}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.price_in_UZS}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center text-sm text-gray-600">
											{customer.warehouse}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div className="flex items-center space-x-4">
											<button className="flex items-center text-blue-600 hover:text-blue-900 transition-colors duration-200">
												<FaEye className="mr-1" />
												<span>View</span>
											</button>
											<button className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200">
												<FaTrash className="mr-1" />
												<span>Delete</span>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProductsPageComponent;

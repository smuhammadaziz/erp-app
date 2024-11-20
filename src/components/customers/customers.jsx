import React, { useState } from "react";
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
	FaMapMarkerAlt,
	FaBirthdayCake,
	FaIdCard,
	FaTimes as FaClose,
} from "react-icons/fa";

import data from "./data.json";

const Modal = ({ isOpen, onClose, children, title }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<FaClose />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

const CustomersAllDetails = () => {
	const [customers, setCustomers] = useState(data);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [newCustomer, setNewCustomer] = useState({
		name: "",
		surname: "",
		email: "",
		phone_number: "",
		status: "Active",
	});

	// Search functionality
	const filteredCustomers = customers.filter((customer) =>
		Object.values(customer)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase()),
	);

	const handleAddCustomer = (e) => {
		e.preventDefault(); // Prevent form submission
		const customerToAdd = {
			...newCustomer,
			id: customers.length + 1,
		};

		setCustomers([...customers, customerToAdd]);
		setShowAddModal(false);
		setNewCustomer({
			name: "",
			surname: "",
			email: "",
			phone_number: "",
			status: "Active",
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCustomer((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDeleteCustomer = (id) => {
		const updatedCustomers = customers.filter(
			(customer) => customer.id !== id,
		);
		setCustomers(updatedCustomers);
	};

	const handleViewCustomer = (customer) => {
		setSelectedCustomer(customer);
		setShowViewModal(true);
	};

	const getStatusColor = (status) => {
		return status === "Active"
			? "bg-green-100 text-green-700"
			: "bg-red-100 text-red-700";
	};

	const InputField = ({ label, name, value, onChange, type = "text" }) => (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);

	return (
		<div className="bg-gray-50 h-screen">
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Header Section */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-blue-50 rounded-lg">
								<FaUsers className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								Customer Details
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-grow">
								<input
									type="text"
									placeholder="Search customers..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							</div>
							<button
								onClick={() => setShowAddModal(true)}
								className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
							>
								<FaUserPlus className="mr-2" />
								<span>Add Customer</span>
							</button>
						</div>
					</div>
				</div>

				{/* Table Section */}
				<div className="overflow-x-auto h-[65vh]">
					<table className="w-full">
						<thead className="bg-gray-50 sticky top-0 z-10">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Name
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Email
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Phone
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Status
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredCustomers.map((customer) => (
								<tr
									key={customer.id}
									className="hover:bg-gray-50 transition-colors duration-200"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
												<FaUser className="text-blue-600" />
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">
													{customer.name}{" "}
													{customer.surname}
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
												onClick={() =>
													handleViewCustomer(customer)
												}
												className="flex items-center text-blue-600 hover:text-blue-900 transition-colors duration-200"
											>
												<FaEye className="mr-1" />
												<span>View</span>
											</button>
											<button
												onClick={() =>
													handleDeleteCustomer(
														customer.id,
													)
												}
												className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200"
											>
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

			{/* Add Customer Modal */}
			<Modal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				title="Add New Customer"
			>
				<form onSubmit={handleAddCustomer} className="space-y-4">
					<InputField
						label="First Name"
						name="name"
						value={newCustomer.name}
						onChange={handleInputChange}
					/>
					<InputField
						label="Last Name"
						name="surname"
						value={newCustomer.surname}
						onChange={handleInputChange}
					/>
					<InputField
						label="Email"
						name="email"
						type="email"
						value={newCustomer.email}
						onChange={handleInputChange}
					/>
					<InputField
						label="Phone"
						name="phone_number"
						value={newCustomer.phone_number}
						onChange={handleInputChange}
					/>
					<div className="flex justify-end space-x-3 mt-6">
						<button
							type="button"
							onClick={() => setShowAddModal(false)}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							Add Customer
						</button>
					</div>
				</form>
			</Modal>

			{/* View Customer Modal */}
			<Modal
				isOpen={showViewModal}
				onClose={() => setShowViewModal(false)}
				title="Customer Details"
			>
				{selectedCustomer && (
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<FaIdCard className="text-blue-500" />
							<span className="font-medium">
								{selectedCustomer.name}{" "}
								{selectedCustomer.surname}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<FaEnvelope className="text-blue-500" />
							<span>{selectedCustomer.email}</span>
						</div>
						<div className="flex items-center space-x-2">
							<FaPhone className="text-blue-500" />
							<span>{selectedCustomer.phone_number}</span>
						</div>
						<div className="flex items-center space-x-2">
							{selectedCustomer.status === "Active" ? (
								<FaCheck className="text-green-500" />
							) : (
								<FaTimes className="text-red-500" />
							)}
							<span>Status: {selectedCustomer.status}</span>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default CustomersAllDetails;

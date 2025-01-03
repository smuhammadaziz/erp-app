import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import CustomerTable from "./CustomerTable";
import InputField from "./InputField";
import { TbUserSearch } from "react-icons/tb";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import nodeUrl from "../../../links";

const CustomersAllDetails = () => {
	const [customers, setCustomers] = useState([]);
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

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const ksbIdNumber = localStorage.getItem("ksbIdNumber");
				const device_id = localStorage.getItem("device_id");

				const response = await fetch(
					`${nodeUrl}/api/get/client/${ksbIdNumber}/${device_id}`,
				);
				const result = await response.json();
				setCustomers(result.data);
			} catch (error) {
				console.error("Error fetching customers:", error);
			}
		};

		fetchCustomers();
	}, []);

	const filteredCustomers = customers.filter((customer) =>
		Object.values(customer)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase()),
	);

	const handleAddCustomer = (e) => {
		e.preventDefault();
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

	const handleDeleteCustomer = (id) => {
		const updatedCustomers = customers.filter(
			(customer) => customer.id !== id,
		);
		setCustomers(updatedCustomers);
	};

	return (
		<div className="h-screen">
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 px-3 bg-blue-50 rounded-lg">
								<TbUserSearch className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								Client Details
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<SearchBar
								value={searchTerm}
								onChange={setSearchTerm}
							/>
						</div>
					</div>
				</div>

				<CustomerTable
					customers={filteredCustomers}
					onView={(customer) => {
						setSelectedCustomer(customer);
						setShowViewModal(true);
					}}
					onDelete={handleDeleteCustomer}
				/>

				<Modal
					isOpen={showAddModal}
					onClose={() => setShowAddModal(false)}
					title="Add Customer"
				>
					<form onSubmit={handleAddCustomer}>
						<InputField
							label="First Name"
							name="name"
							value={newCustomer.name}
							onChange={(e) =>
								setNewCustomer({
									...newCustomer,
									name: e.target.value,
								})
							}
						/>
						<InputField
							label="Last Name"
							name="surname"
							value={newCustomer.surname}
							onChange={(e) =>
								setNewCustomer({
									...newCustomer,
									surname: e.target.value,
								})
							}
						/>
						<InputField
							label="Email"
							name="email"
							value={newCustomer.email}
							onChange={(e) =>
								setNewCustomer({
									...newCustomer,
									email: e.target.value,
								})
							}
						/>
						<InputField
							label="Phone Number"
							name="phone_number"
							value={newCustomer.phone_number}
							onChange={(e) =>
								setNewCustomer({
									...newCustomer,
									phone_number: e.target.value,
								})
							}
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
						>
							Add Customer
						</button>
					</form>
				</Modal>

				<Modal
					isOpen={showViewModal}
					onClose={() => setShowViewModal(false)}
					title="Client Details"
				>
					{selectedCustomer && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-500">
										Name
									</label>
									<p className="text-gray-900">
										{selectedCustomer.name}
									</p>
								</div>
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-500">
										Phone
									</label>
									<p className="text-gray-900">
										{selectedCustomer.phone_number ||
											"No phone number"}
									</p>
								</div>
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-500">
										Client ID
									</label>
									<p className="text-gray-900">
										{selectedCustomer.client_id}
									</p>
								</div>
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-500">
										Status
									</label>
									<div className="flex space-x-4">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												selectedCustomer.delete
													? "bg-red-100 text-red-800"
													: "bg-green-100 text-green-800"
											}`}
										>
											{selectedCustomer.delete
												? "Deleted"
												: "Active"}
										</span>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												selectedCustomer.archive
													? "bg-gray-100 text-gray-800"
													: "bg-green-100 text-green-800"
											}`}
										>
											{selectedCustomer.archive
												? "Archived"
												: "Current"}
										</span>
									</div>
								</div>
							</div>

							<div className="border-t border-gray-200 pt-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Balance History
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="bg-red-50 rounded-lg p-4">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-red-700">
												Negative Balance
											</span>
											<span className="text-2xl font-semibold text-red-700">
												{
													selectedCustomer
														.negative_balance.length
												}
											</span>
										</div>
									</div>
									<div className="bg-green-50 rounded-lg p-4">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-green-700">
												Positive Balance
											</span>
											<span className="text-2xl font-semibold text-green-700">
												{
													selectedCustomer
														.positive_balance.length
												}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default CustomersAllDetails;

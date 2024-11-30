import React, { useState } from "react";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import CustomerTable from "./CustomerTable";
import InputField from "./InputField";
import data from "./data.json";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbUserSearch } from "react-icons/tb";
import { FaUserPlus, FaSearch } from "react-icons/fa";

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
		<div className="bg-gray-50 h-screen">
			<div className="h-[85%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
				<div className="p-6 border-b border-gray-200">
					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 px-3 bg-blue-50 rounded-lg">
								<TbUserSearch className="text-blue-600 text-2xl" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">
								Product Details
							</h1>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<SearchBar
								value={searchTerm}
								onChange={setSearchTerm}
							/>
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

				<CustomerTable
					customers={filteredCustomers}
					onView={(customer) => {
						setSelectedCustomer(customer);
						setShowViewModal(true);
					}}
					onDelete={handleDeleteCustomer}
				/>

				{/* Add Modal */}
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

				{/* View Modal */}
				<Modal
					isOpen={showViewModal}
					onClose={() => setShowViewModal(false)}
					title="View Customer Details"
				>
					{selectedCustomer && (
						<div className="space-y-2">
							<p>
								<strong>Name:</strong> {selectedCustomer.name}{" "}
								{selectedCustomer.surname}
							</p>
							<p>
								<strong>Email:</strong> {selectedCustomer.email}
							</p>
							<p>
								<strong>Phone:</strong>{" "}
								{selectedCustomer.phone_number}
							</p>
							<p>
								<strong>Status:</strong>{" "}
								{selectedCustomer.status}
							</p>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default CustomersAllDetails;

// CustomersAllDetails.js
import React, { useState } from "react";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import CustomerTable from "./CustomerTable";
import InputField from "./InputField";
import data from "./data.json";

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
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<SearchBar value={searchTerm} onChange={setSearchTerm} />
				<button
					onClick={() => setShowAddModal(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					Add Customer
				</button>
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
							<strong>Status:</strong> {selectedCustomer.status}
						</p>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default CustomersAllDetails;

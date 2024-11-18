import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineFormatListBulleted, MdCalendarToday } from "react-icons/md";

// Sample data for clients (you can replace this with your actual client data)
const clients = [
	{ id: 1, name: "Client 1" },
	{ id: 2, name: "Client 2" },
	{ id: 3, name: "Client 3" },
	{ id: 4, name: "Client 4" },
	{ id: 5, name: "Client 5" },
	{ id: 6, name: "Client 6" },
	{ id: 7, name: "Client 7" },
];

// Sample product information for Smena yopish modal
const productInfo = [
	{ id: 1, name: "Product 1", price: "$10", quantity: 20 },
	{ id: 2, name: "Product 2", price: "$15", quantity: 30 },
	{ id: 3, name: "Product 3", price: "$20", quantity: 50 },
];

function SalesPageLayoutHeader() {
	const [isModalOpen, setIsModalOpen] = useState({
		klientlar: false,
		smenaYopish: false,
		skidka: false,
	});
	const [selectedClient, setSelectedClient] = useState(null);
	const [formData, setFormData] = useState({
		discountName: "",
		amount: "",
		startDate: "",
	});

	const handleOpenModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: true }));
	};

	const handleCloseModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: false }));
		if (modalType === "skidka") {
			setFormData({ discountName: "", amount: "", startDate: "" }); // Reset form
		}
		if (modalType === "klientlar") {
			setSelectedClient(null); // Reset client selection
		}
	};

	const handleApplySkidka = () => {
		alert(`Discount applied: ${formData.discountName}`); // Handle discount application
		setIsModalOpen((prevState) => ({ ...prevState, skidka: false }));
	};

	const handleCancelSkidka = () => {
		setIsModalOpen((prevState) => ({ ...prevState, skidka: false }));
	};

	const handleApply = () => {
		alert(`Client selected: ${selectedClient?.name}`);
		setIsModalOpen((prevState) => ({ ...prevState, klientlar: false }));
	};

	const handleCancel = () => {
		setIsModalOpen((prevState) => ({ ...prevState, klientlar: false }));
		setSelectedClient(null);
	};

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FaBuilding className="text-xl" />
						<span className="font-medium">Dekor Land</span>
					</span>
				</div>

				<div className="flex items-center">
					<button
						onClick={() => handleOpenModal("smenaYopish")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<BsClock className="mr-3 text-xl" />
						<span className="font-semibold">Smena yopish</span>
					</button>
					<button
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">Klientlar</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				<button
					onClick={() => handleOpenModal("skidka")}
					className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">Skidka</span>
				</button>
				<button className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-semibold">списка</span>
				</button>
				<button className="flex items-center justify-center bg-blue-900 hover:bg-blue-950 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-950">
					<MdCalendarToday className="mr-3 text-xl" />
					<span className="font-semibold">11.18.2024</span>
				</button>
			</div>

			{/* Klientlar Modal */}
			{isModalOpen.klientlar && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
						<h2 className="text-xl font-bold mb-4">
							Select Client
						</h2>
						<div className="mb-4">
							<label className="block text-sm font-semibold mb-2">
								Client
							</label>
							<select
								value={selectedClient?.id || ""}
								onChange={(e) =>
									setSelectedClient(
										clients.find(
											(client) =>
												client.id ===
												parseInt(e.target.value),
										),
									)
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md"
							>
								<option value="" disabled>
									Select a client
								</option>
								{clients.map((client) => (
									<option key={client.id} value={client.id}>
										{client.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex justify-between">
							<button
								onClick={handleCancel}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
							>
								Cancel
							</button>
							<button
								onClick={handleApply}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Smena Yopish Modal */}
			{isModalOpen.smenaYopish && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg w-[600px] shadow-lg relative">
						<h2 className="text-xl font-bold mb-4">
							Product Information
						</h2>
						<div className="space-y-3">
							{productInfo.map((product) => (
								<div
									key={product.id}
									className="flex justify-between"
								>
									<span>{product.name}</span>
									<span>{product.price}</span>
									<span>{product.quantity} units</span>
								</div>
							))}
						</div>
						<div className="flex justify-between mt-4">
							<button
								onClick={() => handleCloseModal("smenaYopish")}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
							>
								Cancel
							</button>
							<button
								onClick={() => handleCloseModal("smenaYopish")}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Skidka Modal */}
			{isModalOpen.skidka && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
						<h2 className="text-xl font-bold mb-4">
							Apply Discount
						</h2>
						<form>
							<div className="mb-4">
								<label className="block text-sm font-semibold mb-2">
									Discount Name
								</label>
								<input
									type="text"
									value={formData.discountName}
									onChange={(e) =>
										setFormData({
											...formData,
											discountName: e.target.value,
										})
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-md"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-semibold mb-2">
									Amount
								</label>
								<input
									type="text"
									value={formData.amount}
									onChange={(e) =>
										setFormData({
											...formData,
											amount: e.target.value,
										})
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-md"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-semibold mb-2">
									Start Date
								</label>
								<input
									type="date"
									value={formData.startDate}
									onChange={(e) =>
										setFormData({
											...formData,
											startDate: e.target.value,
										})
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-md"
								/>
							</div>
						</form>
						<div className="flex justify-between mt-4">
							<button
								onClick={handleCancelSkidka}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
							>
								Cancel
							</button>
							<button
								onClick={handleApplySkidka}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SalesPageLayoutHeader;

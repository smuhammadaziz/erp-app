import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import nodeUrl from "../../links";

const PaymentModal = ({ isOpen, onClose, totalAmount }) => {
	const [selectedClient, setSelectedClient] = useState(null);
	const [cashAmount, setCashAmount] = useState(totalAmount);
	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);
	const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [price, setPrice] = useState(0);

	const ksbIdNumber = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");
	const sales_id = localStorage.getItem("sales_id");

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/client/${ksbIdNumber}/${device_id}`,
				);
				const result = await response.json();

				setCustomers(Array.isArray(result.data) ? result.data : []);
			} catch (error) {
				console.error("Error fetching customers:", error);
				setCustomers([]);
			}
		};

		fetchCustomers();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/sales/${sales_id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();

				setPrice(parseFloat(data[sales_id].summa));
			} catch (err) {
				console.log(err);
			}
		};
		const intervalId = setInterval(fetchProducts, 400);
		return () => clearInterval(intervalId);
	}, [nodeUrl, sales_id]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black text-black bg-opacity-80 flex items-center justify-center p-6 z-[50]">
			<div className="bg-white rounded-lg w-full max-w-3xl shadow-lg px-6 py-2 transition-all duration-300 transform scale-95">
				<div className="flex justify-between items-center mb-4 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						Оплата
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-600 hover:text-gray-800 transition duration-200"
					>
						<IoClose className="w-6 h-6" />
					</button>
				</div>

				<div className="space-y-6">
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-8">
							<label className="text-sm font-medium text-gray-700">
								К Оплата
							</label>
							<div className="bg-green-50 p-4 rounded-md flex items-center">
								<div className="font-bold text-left text-3xl text-gray-800">
									{price.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
							</div>
						</div>

						<div className="col-span-4">
							<label className="text-sm font-medium text-gray-700">
								Скидка
							</label>
							<div className="bg-red-50 p-4 rounded-md flex items-center">
								<div className="font-bold text-left text-3xl text-gray-800">
									{discountAmount.toLocaleString()}
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between gap-4">
							<label className="w-1/4 text-lg font-medium text-gray-700">
								Клиент:
							</label>
							<div className="w-3/4 relative group">
								<input
									type="text"
									value={
										selectedClient
											? selectedClient.name
											: ""
									}
									readOnly
									placeholder="оддий харидор"
									className="w-full px-4 pr-16 py-2 text-right text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
								<button
									onClick={() => setIsClientSearchOpen(true)}
									className="absolute right-4 p-1 rounded-lg top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									<IoSearchOutline className="w-6 h-6" />
								</button>

								<span className="absolute left-1/2 transform -translate-x-1/2 mt-10 w-max px-3 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{selectedClient
										? selectedClient.name
										: "No client selected"}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-between gap-4">
							<label className="w-1/4 text-lg font-medium text-gray-700">
								К оплате:
							</label>
							<input
								type="text"
								value={price.toLocaleString("ru-RU", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
								disabled
								className="w-3/4 px-4 py-1 text-right text-3xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
							/>
						</div>

						<div className="border-t-2 py-5">
							<div className="flex items-center justify-between gap-4 mb-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									Наличные:
								</label>
								<input
									type="number"
									value={cardAmount}
									onChange={(e) =>
										setCardAmount(Number(e.target.value))
									}
									className="w-3/4 px-4 py-1 text-right text-3xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>

							<div className="flex items-center justify-between gap-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									Пластик карта:
								</label>
								<input
									type="number"
									value={cashAmount}
									onChange={(e) =>
										setCashAmount(Number(e.target.value))
									}
									className="w-3/4 px-4 py-1 text-right text-3xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-start justify-between bg-gray-50  rounded-md border border-gray-200">
						<div className="w-3/5 px-6 py-6">
							<input
								type="text"
								value={totalAmount.toLocaleString("en-US", {
									minimumFractionDigits: 2,
								})}
								disabled
								className="w-full px-4 py-3 text-right text-3xl font-bold border border-gray-300 rounded-md bg-white"
							/>
							<label className="text-lg font-medium text-gray-700">
								Оплата итого
							</label>
						</div>
						<div className="w-2/5 p-6">
							<textarea
								className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md bg-white resize-none"
								placeholder="Комментарий"
								rows="4"
							/>
						</div>
					</div>
				</div>

				<div className="flex gap-6 mt-4 justify-center items-center pb-2">
					<button
						onClick={onClose}
						className="w-40 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-200 text-xl"
					>
						OK
					</button>
					<button
						onClick={onClose}
						className="w-40 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200 text-xl"
					>
						Отмена
					</button>
				</div>
			</div>

			<ClientSearchModal
				isOpen={isClientSearchOpen}
				onClose={() => setIsClientSearchOpen(false)}
				onSelect={setSelectedClient}
				clients={customers}
			/>
		</div>
	);
};

const ClientSearchModal = ({ isOpen, onClose, onSelect, clients = [] }) => {
	const [searchTerm, setSearchTerm] = useState("");

	if (!isOpen) return null;

	const clientsArray = Array.isArray(clients) ? clients : [];

	const filteredClients =
		searchTerm.trim() === ""
			? clientsArray
			: clientsArray.filter(
					(client) =>
						client?.name
							?.toLowerCase()
							.includes(searchTerm.toLowerCase().trim()) ||
						client?.phone_number
							?.toLowerCase()
							.includes(searchTerm.toLowerCase().trim()),
			  );

	return (
		<div className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
			<div
				className="bg-white rounded-lg w-[600px] shadow-xl flex flex-col"
				style={{ height: "500px" }}
			>
				<div className="px-5 py-3 border-b flex justify-between items-center bg-white sticky top-0">
					<h2 className="text-lg font-semibold">Select Client</h2>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				<div className="px-4 pt-4 bg-white sticky top-0 z-10">
					<div className="relative">
						<input
							type="text"
							placeholder="Search clients..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
						/>
						<IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
					</div>
				</div>

				<div
					className="flex-1 overflow-y-auto mt-4 px-4"
					style={{ minHeight: "300px" }}
				>
					{filteredClients.length === 0 ? (
						<div className="flex items-center justify-center h-full text-gray-500">
							No clients found
						</div>
					) : (
						filteredClients.map((client) => (
							<div
								key={client.client_id}
								onClick={() => {
									onSelect(client);
									onClose();
									setSearchTerm("");
								}}
								className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg border border-transparent hover:border-gray-200 mb-2"
							>
								<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
									<span className="text-green-700 font-medium">
										{client.name.charAt(0)}
									</span>
								</div>
								<div className="min-w-0 flex-1">
									<div className="font-medium truncate">
										{client.name}
									</div>
									<div className="text-sm text-gray-500 truncate">
										{client.phone_number}
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;

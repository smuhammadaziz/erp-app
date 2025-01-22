import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

// Client Search Modal Component
const ClientSearchModal = ({ isOpen, onClose, onSelect, clients }) => {
	const [searchTerm, setSearchTerm] = useState("");

	if (!isOpen) return null;

	const filteredClients = clients.filter((client) =>
		client.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
			<div className="bg-white rounded-lg w-[600px] max-h-[500px] shadow-xl flex flex-col relative overflow-hidden">
				<div className="px-5 py-3 border-b flex justify-between items-center bg-white z-10">
					<h2 className="text-lg font-semibold">Select Client</h2>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				<div className="flex flex-col flex-1 min-h-0">
					<div className="p-4 bg-white z-10">
						<input
							type="text"
							placeholder="Search clients..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<div className="flex-1 overflow-y-auto px-4 pb-4">
						<div className="space-y-2">
							{filteredClients.map((client) => (
								<div
									key={client.id}
									onClick={() => {
										onSelect(client);
										onClose();
									}}
									className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg border border-transparent hover:border-gray-200"
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
											{client.email}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const PaymentModal = ({ isOpen, onClose, totalAmount = 50000000000 }) => {
	const [selectedClient, setSelectedClient] = useState(null);
	const [cashAmount, setCashAmount] = useState(totalAmount);
	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);
	const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);

	const clients = [
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jane Smith", email: "jane@example.com" },
		{ id: 3, name: "Bob Johnson", email: "bob@example.com" },
		{ id: 4, name: "Alice Brown", email: "alice@example.com" },
		{ id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
		{ id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
		{ id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
		{ id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
		{ id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
	];

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
			<div className="bg-white rounded-lg w-full max-w-4xl shadow-xl">
				<div className="px-5 py-1 border-b flex justify-between items-center">
					<h2 className="text-lg text-black font-semibold">Оплата</h2>
					<button
						onClick={onClose}
						className="p-1 rounded-full transition duration-200"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				<div className="px-6 py-3 space-y-6">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-8">
							<div className="text-green-700 text-sm font-medium">
								К Оплата
							</div>
							<div className="bg-green-50 px-4 py-1 rounded-lg h-14 flex items-center">
								<div
									className={`font-bold text-green-800 ${
										totalAmount.toString().length > 15
											? "text-2xl"
											: "text-3xl"
									}`}
								>
									{totalAmount.toLocaleString()}
								</div>
							</div>
						</div>

						<div className="col-span-4">
							<div className="text-red-700 text-sm font-medium">
								Скидка
							</div>
							<div className="bg-red-50 px-4 py-1 rounded-lg h-14 flex items-center">
								<div
									className={`font-bold text-red-800 ${
										discountAmount.toString().length > 15
											? "text-2xl"
											: "text-3xl"
									}`}
								>
									{discountAmount.toLocaleString()}
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2 py-0">
							<label className="w-40 text-lg font-medium">
								Client:
							</label>
							<div className="flex-1 max-w-[390px] relative">
								<input
									type="text"
									value={
										selectedClient
											? selectedClient.name
											: ""
									}
									readOnly
									placeholder="Select a client"
									className="w-full px-3 text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold pr-12"
								/>
								<button
									onClick={() => setIsClientSearchOpen(true)}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
								>
									<IoSearchOutline className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="flex items-center gap-2 py-0">
							<label className="w-40 text-lg font-medium">
								K oplate:
							</label>
							<input
								type="number"
								value={cashAmount}
								onChange={(e) =>
									setCashAmount(Number(e.target.value))
								}
								className="flex-1 px-3 max-w-[390px] text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold"
							/>
						</div>

						<div className="flex items-center gap-2 py-0">
							<label className="w-40 text-lg font-medium">
								Card:
							</label>
							<input
								type="number"
								value={cardAmount}
								onChange={(e) =>
									setCardAmount(Number(e.target.value))
								}
								className="flex-1 px-3 max-w-[390px] text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold"
							/>
						</div>

						<div className="flex items-center gap-2 py-0">
							<label className="w-40 text-lg font-medium">
								Cash:
							</label>
							<input
								type="number"
								value={cashAmount}
								onChange={(e) =>
									setCashAmount(Number(e.target.value))
								}
								className="flex-1 px-3 max-w-[390px] text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold"
							/>
						</div>

						<div className="flex items-center gap-2 py-0">
							<label className="w-40 text-lg font-medium">
								Discount Card:
							</label>
							<input
								type="number"
								value={discountAmount}
								onChange={(e) =>
									setDiscountAmount(Number(e.target.value))
								}
								className="flex-1 px-3 max-w-[390px] text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold"
							/>
						</div>
					</div>

					<div className="flex items-start gap-6 py-4 px-2 border border-green-500 rounded-md bg-[#fdfbed]">
						<div className="space-y-4 w-2/3">
							<div className="flex items-center">
								<label className="w-40 text-lg font-medium text-gray-700">
									Оплата итого:
								</label>
								<input
									type="text"
									value={totalAmount.toLocaleString("en-US", {
										minimumFractionDigits: 2,
									})}
									disabled
									className="flex-1 px-3 py-2 border border-green-500 rounded-lg text-lg bg-white text-right w-full"
								/>
							</div>
							<div className="flex items-center">
								<label className="w-40 text-lg font-medium text-gray-700">
									Сдача:
								</label>
								<input
									type="text"
									value={(
										cashAmount -
										totalAmount -
										discountAmount
									).toFixed(2)}
									disabled
									className="flex-1 px-3 py-2 border border-green-500 rounded-lg text-lg bg-white text-right w-full"
								/>
							</div>
						</div>
						<div className="w-1/3">
							<textarea
								className="w-full px-3 py-2 border border-green-500 resize-none rounded-lg text-lg bg-white text-gray-700"
								placeholder="Комментарий"
								rows="4"
							/>
						</div>
					</div>
				</div>

				<div className="p-4 flex gap-4 w-[500px] justify-right relative block items-center">
					<button
						onClick={onClose}
						className="flex-1 block max-w-40 bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-200 text-lg"
					>
						OK
					</button>
					<button
						onClick={onClose}
						className="flex-1 block max-w-40 bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-200 text-lg"
					>
						Отмена
					</button>
				</div>
			</div>

			<ClientSearchModal
				isOpen={isClientSearchOpen}
				onClose={() => setIsClientSearchOpen(false)}
				onSelect={setSelectedClient}
				clients={clients}
			/>
		</div>
	);
};

export default PaymentModal;

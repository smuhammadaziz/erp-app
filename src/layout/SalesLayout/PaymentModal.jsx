import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const PaymentModal = ({ isOpen, onClose, totalAmount = 50000000000 }) => {
	const [cashAmount, setCashAmount] = useState(totalAmount);
	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);

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
						{/* Payment Section */}
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

						{/* Discount Section */}
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
						{[
							{
								label: "Client",
								value: cashAmount,
								setter: setCashAmount,
							},
							{
								label: "K oplate",
								value: cashAmount,
								setter: setCashAmount,
							},
							{
								label: "Card",
								value: cardAmount,
								setter: setCardAmount,
							},
							{
								label: "Cash",
								value: cashAmount,
								setter: setCashAmount,
							},
							{
								label: "Discount Card",
								value: discountAmount,
								setter: setDiscountAmount,
							},
						].map(({ label, value, setter }, index) => (
							<div
								key={index}
								className="flex items-center gap-2 py-0"
							>
								<label className="w-40 text-lg font-medium">
									{label}:
								</label>
								<input
									type="number"
									value={value}
									onChange={(e) =>
										setter(Number(e.target.value))
									}
									className="flex-1 px-3 max-w-[390px] text-right py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-2xl font-semibold"
								/>
							</div>
						))}
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

				<div className=" p-4 flex gap-4 w-[500px] justify-right relative block items-center">
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
		</div>
	);
};

export default PaymentModal;

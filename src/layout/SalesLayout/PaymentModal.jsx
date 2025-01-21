import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineCash, HiOutlineCreditCard } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdDiscount } from "react-icons/md";

const PaymentModal = ({ isOpen, onClose, totalAmount = 47500.0 }) => {
	const [cashAmount, setCashAmount] = useState(totalAmount);
	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg w-full max-w-2xl shadow-xl">
				{/* Header */}
				<div className="p-3 border-b flex justify-between items-center">
					<h2 className="text-lg font-semibold">Payment</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-gray-100 rounded-full transition duration-200"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-4 space-y-4">
					{/* Total Amount Display */}
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-green-50 p-3 rounded-lg">
							<div className="text-green-700 text-xs font-medium">
								Total Amount
							</div>
							<div className="text-2xl font-bold text-green-800">
								{totalAmount.toLocaleString()} UZS
							</div>
						</div>
						<div className="bg-red-50 p-3 rounded-lg">
							<div className="text-red-700 text-xs font-medium">
								Discount
							</div>
							<div className="text-2xl font-bold text-red-800">
								{discountAmount.toLocaleString()} UZS
							</div>
						</div>
					</div>

					{/* Payment Methods */}
					<div className="space-y-3">
						{/* Cash Payment */}
						<div className="border rounded-lg p-2">
							<div className="flex items-center gap-2 mb-1">
								<FaMoneyBillWave className="text-green-600 w-4 h-4" />
								<span className="font-medium text-sm">
									Cash
								</span>
							</div>
							<input
								type="number"
								value={cashAmount}
								onChange={(e) =>
									setCashAmount(Number(e.target.value))
								}
								className="w-full p-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
							/>
						</div>

						{/* Card Payment */}
						<div className="border rounded-lg p-2">
							<div className="flex items-center gap-2 mb-1">
								<BsCreditCard2Front className="text-blue-600 w-4 h-4" />
								<span className="font-medium text-sm">
									Card
								</span>
							</div>
							<input
								type="number"
								value={cardAmount}
								onChange={(e) =>
									setCardAmount(Number(e.target.value))
								}
								className="w-full p-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
							/>
						</div>

						{/* Discount Card */}
						<div className="border rounded-lg p-2">
							<div className="flex items-center gap-2 mb-1">
								<MdDiscount className="text-purple-600 w-4 h-4" />
								<span className="font-medium text-sm">
									Discount Card
								</span>
							</div>
							<input
								type="number"
								value={discountAmount}
								onChange={(e) =>
									setDiscountAmount(Number(e.target.value))
								}
								className="w-full p-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
							/>
						</div>
					</div>

					{/* Change/Balance */}
					<div className="bg-gray-50 p-3 rounded-lg">
						<div className="text-gray-700 text-xs font-medium">
							Change
						</div>
						<div className="text-2xl font-bold text-gray-800">
							{Math.max(
								0,
								cashAmount + cardAmount - totalAmount,
							).toLocaleString()}{" "}
							UZS
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t p-3 flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 bg-green-500 text-white py-1.5 px-4 rounded-lg hover:bg-green-600 transition duration-200 text-sm"
					>
						Confirm Payment
					</button>
					<button
						onClick={onClose}
						className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-4 rounded-lg hover:bg-gray-200 transition duration-200 text-sm"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;

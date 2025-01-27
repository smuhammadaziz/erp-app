import React, { useState } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import PaymentModal from "./PaymentModal";

function SalesPageLayoutSidebar() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col">
			{/* Top buttons container */}
			<div className="flex flex-col items-center gap-5 mt-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<HiOutlineCash className="mr-3 text-xl" />
					<span className="font-semibold">Cash</span>
				</button>
				<button className="flex items-center justify-center w-full max-w-xs bg-blue-700 hover:bg-blue-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
					<HiOutlineCreditCard className="mr-3 text-xl" />
					<span className="font-semibold">Card</span>
				</button>
			</div>

			{/* Bottom button container */}
			<div className="relative mt-auto mb-10">
				<div className="absolute -top-2 -left-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
					10
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-base rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<CiClock1 className="mr-3 text-base" />
					<span className="font-semibold">В процессе</span>
				</button>
			</div>

			<PaymentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				totalAmount={50000}
			/>
		</div>
	);
}

export default SalesPageLayoutSidebar;

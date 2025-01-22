import React, { useState } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { MdAssignmentReturn, MdOutlineMobileScreenShare } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { BsCardList } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { FaExclamationTriangle } from "react-icons/fa";

import PaymentModal from "./PaymentModal";

function SalesPageLayoutSidebar() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col justify-between">
			<div>
				<div className="flex flex-col items-center gap-5">
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

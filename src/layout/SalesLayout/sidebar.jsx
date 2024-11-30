import React, { useState } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { MdAssignmentReturn, MdOutlineMobileScreenShare } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { BsCardList } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { FaExclamationTriangle } from "react-icons/fa";

function SalesPageLayoutSidebar() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState({
		title: "",
		message: "",
		icon: null,
		style: "",
	});

	const handleCashButtonClick = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/buy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				setModalContent({
					title: "Success!",
					message: "Products successfully sold!",
					icon: (
						<SiTicktick className="text-white text-6xl  text-center mx-auto" />
					),
					style: "bg-green-500 text-white",
				});
			} else {
				setModalContent({
					title: "Error",
					message: "Could not process the sale. Please try again.",
					icon: (
						<FaExclamationTriangle className="text-white text-6xl text-center mx-auto" />
					),
					style: "bg-red-500 text-white",
				});
			}
		} catch (error) {
			console.error("Error during API request:", error);
			setModalContent({
				title: "Error",
				message: "An unexpected error occurred. Please try again.",
				icon: (
					<FaExclamationTriangle className="text-white text-6xl text-center mx-auto" />
				),
				style: "bg-red-600 text-white",
			});
		}
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col justify-between">
			<div>
				<div className="flex flex-col items-center gap-5">
					<button
						onClick={handleCashButtonClick}
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

			{/* Modal */}
			{modalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
					onClick={closeModal}
				>
					<div
						className={`max-w-sm w-full p-6 rounded-lg shadow-lg ${modalContent.style} relative`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="text-center">
							<div className="mb-4 mx-auto text-center justify-center block">
								{modalContent.icon}
							</div>
							<h2 className="text-xl font-bold">
								{modalContent.title}
							</h2>
							<p className="mt-2 text-sm">
								{modalContent.message}
							</p>
						</div>
						<div className="mt-6 text-center">
							<button
								onClick={closeModal}
								className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
							>
								OK
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SalesPageLayoutSidebar;

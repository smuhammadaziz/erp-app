import React from "react";
import { IoClose } from "react-icons/io5";

const PrintingModal = ({
	setPrintModal,
	setSuccessModal,
	setErrorModal,
	handleSaveSales,
	handleSaveSalesWithPrint,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
			<div className="bg-white w-[400px] rounded-lg shadow-xl overflow-hidden">
				<div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
					<h2 className="text-base font-medium text-white">
						Print Receipt
					</h2>
					<button
						onClick={() => setPrintModal(false)}
						className="p-1 text-white/80 hover:text-white"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>
				<div className="p-4">
					<p className="text-sm text-gray-700 mb-6 text-center">
						Are you sure you want to print receipt?
					</p>
					<div className="flex justify-center gap-4">
						<button
							onClick={() => {
								setPrintModal(false);
								handleSaveSales();
							}}
							className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
						>
							NO
						</button>
						<button
							onClick={() => {
								setPrintModal(false);
								handleSaveSalesWithPrint();
							}}
							className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
						>
							YES
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrintingModal;


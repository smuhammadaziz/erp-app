import React from "react";
import { IoClose, IoPrint } from "react-icons/io5";

const PrintingModal = ({
	setPrintModal,
	setSuccessModal,
	setErrorModal,
	handleSaveSales,
	handleSaveSalesWithPrint,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
			<div className="bg-white w-[450px] py-8 px-6 rounded-lg shadow-2xl flex flex-col items-center relative">
				<button
					onClick={() => setPrintModal(false)}
					className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
				>
					<IoClose className="w-6 h-6" />
				</button>
				<IoPrint className="w-16 h-16 text-blue-600 mb-4" />
				<h2 className="text-lg font-medium text-gray-800 text-center mb-6">
					Do you want to print the receipt?
				</h2>
				<div className="flex w-full justify-between">
					<button
						onClick={() => {
							setPrintModal(false);
							handleSaveSales();
						}}
						className="w-1/2 py-3 bg-gray-200 text-gray-800 text-md font-medium rounded-lg hover:bg-gray-300 transition-all duration-200 mr-2"
					>
						NO
					</button>
					<button
						onClick={() => {
							setPrintModal(false);
							handleSaveSalesWithPrint();
						}}
						className="w-1/2 py-3 bg-blue-600 text-white text-md font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 ml-2"
					>
						YES
					</button>
				</div>
			</div>
		</div>
	);
};

export default PrintingModal;


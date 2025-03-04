import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
			<div className="bg-white w-[400px] rounded-lg shadow-xl overflow-hidden p-6">
				<div className="flex flex-col items-center">
					<FaCheckCircle className="w-16 h-16 text-green-500 mb-4" />
					<p className="text-gray-700 text-lg font-medium text-center">
						Transaction Successful!
					</p>
				</div>
			</div>
		</div>
	);
};

export default SuccessModal;


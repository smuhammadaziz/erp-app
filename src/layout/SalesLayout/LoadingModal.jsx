import React from "react";

const LoadingModalSendSales = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
			<div className="bg-white w-[450px] rounded-lg shadow-2xl p-8 flex flex-col items-center">
				<div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-6"></div>
				<p className="text-gray-800 text-lg font-medium text-center">
					Processing your transaction...
				</p>
			</div>
		</div>
	);
};

export default LoadingModalSendSales;


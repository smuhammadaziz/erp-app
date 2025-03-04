import React from "react";

const LoadingModalSendSales = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
			<div className="bg-white w-[400px] rounded-lg shadow-xl overflow-hidden p-6">
				<div className="flex flex-col items-center">
					<div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
					<p className="text-gray-700 text-center">
						Processing your transaction...
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoadingModalSendSales;


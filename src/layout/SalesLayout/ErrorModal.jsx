import React from "react";
import { MdClear } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

function ErrorModal({ setPrintModal }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-white w-[500px] rounded-xl shadow-2xl relative">
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-gray-800">
							<IoIosWarning />
						</h2>
						<button
							onClick={() => setPrintModal(false)}
							className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
						>
							<MdClear size={24} className="text-gray-500" />
						</button>
					</div>
					<p className="text-base text-black mb-4">Чек чиқариш</p>
					<div className="flex justify-center mt-5">
						<button
							// onClick={() => setShowErrorModal(false)}
							className="px-10 mx-5 py-2 bg-white border-2 border-black text-black text-lg font-medium rounded-lg hover:bg-slate-100 transform hover:scale-105 transition-all duration-200"
						>
							OK (10)
						</button>
						<button
							// onClick={() => setShowErrorModal(false)}
							className="px-8 py-2 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200"
						>
							Отмена
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ErrorModal;


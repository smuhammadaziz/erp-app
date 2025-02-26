import React from "react";
import { MdClear } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";

function ErrorModal({ setPrintModal }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-white w-[500px] rounded-xl shadow-2xl relative">
				<div className="p-6">
					<h2 className="text-6xl text-center justify-center flex font-bold text-orange-400">
						<IoIosWarning size={140} />
					</h2>

					<p className="text-xl text-center text-black mb-4">
						Савдони юборишда хатолик мавжуд!
					</p>
					<div className="flex justify-center mt-5">
						<button
							// onClick={() => setShowErrorModal(false)}
							className="px-10 mx-5 py-2 bg-white border-2 border-black text-black text-lg font-medium rounded-lg hover:bg-slate-100 transform hover:scale-105 transition-all duration-200"
						>
							Қайта юбориш
						</button>
						<button
							// onClick={() => setShowErrorModal(false)}
							className="px-8 py-2 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200"
						>
							Кейинроқ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ErrorModal;


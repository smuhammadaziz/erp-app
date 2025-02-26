import React, { useState, useEffect } from "react";
import { MdClear } from "react-icons/md";
import SuccessModal from "./SuccessModal";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import icons from "../../assets/tick.json";

function PrintingModal({ setPrintModal, setSuccessModal }) {
	const [countdown, setCountdown] = useState(10);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			showSuccessModal();
		}
	}, [countdown]);

	const showSuccessModal = () => {
		setPrintModal(false);
		setSuccessModal(true);
		setTimeout(() => setSuccessModal(false), 1000);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-white w-[500px] rounded-xl shadow-2xl relative">
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-gray-800">
							Печать
						</h2>
						<button
							onClick={() => setPrintModal(false)}
							className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
						>
							<MdClear size={24} className="text-gray-500" />
						</button>
					</div>
					<div className="flex flex-col">
						<p>
							<DotLottieReact
								src="https://lottie.host/d5389980-4b6f-4baa-a4ff-9a5be6a63576/u2mwyfC6SH.lottie"
								loop
								autoplay
							/>
						</p>
						<p className="text-lg font-semibold text-black mb-4 text-center">
							Савдодан чек чиқарасизми?
						</p>
					</div>
					<div className="flex justify-center mt-5">
						<button
							onClick={showSuccessModal}
							className="px-10 w-[150px] mx-5 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
						>
							Да ({countdown})
						</button>
						<button
							onClick={() => setPrintModal(false)}
							className="px-12 py-2 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200"
						>
							Нет
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PrintingModal;


import React, { useState, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";

function ErrorModal({ setPrintModal }) {
	const [showPopup, setShowPopup] = useState(false);
	const [blink, setBlink] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setBlink((prev) => !prev);
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-white w-[500px] rounded-xl shadow-2xl relative">
				{/* Blinking Indicator in Top-Right */}
				<span
					onClick={() => setShowPopup(!showPopup)}
					className={`absolute top-3 right-3 bg-red-600 p-1 px-2 rounded-full cursor-pointer text-white font-semibold text-sm ${
						blink ? "opacity-100" : "opacity-30"
					} transition-opacity duration-500`}
				>
					⚠️
				</span>

				{/* Popup Window */}
				{showPopup && (
					<div className="absolute top-10 right-5 bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-80 text-sm text-gray-700">
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Iste officia non exercitationem? Iste obcaecati
						error iusto neque perferendis. Perferendis, et quae
						laboriosam ea nobis perspiciatis incidunt sed eveniet
						reiciendis recusandae.
					</div>
				)}

				<div className="p-6">
					<h2 className="text-6xl text-center justify-center flex font-bold text-orange-400">
						<IoIosWarning size={140} />
					</h2>

					<p className="text-xl text-center text-black mb-4">
						Савдони юборишда хатолик мавжуд!
					</p>

					<div className="flex justify-center mt-5">
						<button className="px-10 mx-5 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-black text-lg font-medium rounded-lg hover:from-gray-300 hover:to-gray-400 transform hover:scale-105 transition-all duration-200 shadow-md">
							Қайта юбориш
						</button>
						<button className="px-8 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white text-lg font-medium rounded-lg hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-md">
							Кейинроқ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ErrorModal;


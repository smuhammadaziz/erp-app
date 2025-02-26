import React, { useState, useEffect, useRef } from "react";
import { MdClear } from "react-icons/md";
import SuccessModal from "./SuccessModal";
import LoadingModalSendSales from "./LoadingModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function PrintingModal({ setPrintModal, setSuccessModal, setErrorModal }) {
	const [countdown, setCountdown] = useState(10);
	const [showLoading, setShowLoading] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		if (!isProcessing && countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		} else if (!isProcessing && countdown === 0) {
			startLoadingAndShowSuccess();
		}
	}, [countdown, isProcessing]);

	const startLoadingAndShowSuccess = () => {
		setShowLoading(true);
		setIsProcessing(true);
		setTimeout(() => {
			setShowLoading(false);
			showSuccessModal();
		}, 2000);
	};

	const handleConfirm = () => {
		startLoadingAndShowSuccess();
	};

	const showSuccessModal = () => {
		setPrintModal(false);
		setErrorModal(true);
		// setTimeout(() => setErrorModal(false), 10000);
	};

	const okButton = useRef();
	const cancelButton = useRef();

	useEffect(() => {
		if (okButton.current) {
			okButton.current.focus();
		}

		const handleKeyDown = (e) => {
			if (
				document.activeElement === okButton.current ||
				document.activeElement === cancelButton.current
			) {
				if (e.key === "Enter") {
					document.activeElement.click();
				} else if (e.key === "ArrowRight") {
					cancelButton.current?.focus();
				} else if (e.key === "ArrowLeft") {
					okButton.current?.focus();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	if (showLoading) {
		return <LoadingModalSendSales />;
	}

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
							ref={okButton}
							onClick={handleConfirm}
							className="px-10 w-[150px] mx-5 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
							disabled={isProcessing}
						>
							{isProcessing
								? "Обработка..."
								: `Да (${countdown})`}
						</button>
						<button
							ref={cancelButton}
							onClick={handleConfirm}
							className="px-12 py-2 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200"
							disabled={isProcessing}
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


import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SuccessModal() {
	const [status, setStatus] = useState("loading"); // "loading" -> "success"

	useEffect(() => {
		const timer = setTimeout(() => {
			setStatus("success");
		}, 2000); // Switch to success after 2 seconds

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-transparent w-[450px] h-[300px] relative flex items-center justify-center">
				{(() => {
					switch (status) {
						case "loading":
							return (
								<div className="text-black text-4xl animate-spin">
									<FiLoader />
								</div>
							);
						case "success":
							return (
								<DotLottieReact
									src="https://lottie.host/fc406ebe-b131-43cf-99c1-36e8a4361abd/VnuvL768sW.lottie"
									autoplay
								/>
							);
						default:
							return null;
					}
				})()}
			</div>
		</div>
	);
}

export default SuccessModal;


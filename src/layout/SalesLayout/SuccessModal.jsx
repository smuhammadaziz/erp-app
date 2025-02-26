import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SuccessModal() {
	const [status, setStatus] = useState("loading");

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-transparent w-[350px] h-[300px] relative flex items-center justify-center">
				<DotLottieReact
					src="https://lottie.host/fc406ebe-b131-43cf-99c1-36e8a4361abd/VnuvL768sW.lottie"
					autoplay
				/>
			</div>
		</div>
	);
}

export default SuccessModal;


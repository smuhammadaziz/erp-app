import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function LoadingModalSendSales() {
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		const timer = setTimeout(() => {
			setStatus("success");
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-transparent w-[450px] h-[300px] relative flex items-center justify-center">
				<div className="text-black text-4xl animate-spin">
					<FiLoader />
				</div>
			</div>
		</div>
	);
}

export default LoadingModalSendSales;


import React from "react";
import { MdClear } from "react-icons/md";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SuccessModal({ setSuccessModal }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center  z-[100]">
			<div className="bg-transparent w-[400px] h-[300px]  relative">
				<div className="p-6">
					<p className="text-base text-black mb-4 justify-center">
						<DotLottieReact
							src="https://lottie.host/fc406ebe-b131-43cf-99c1-36e8a4361abd/VnuvL768sW.lottie"
							// loop
							autoplay
						/>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SuccessModal;


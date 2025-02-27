import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import successIcon from "../../assets/success.gif";

function SuccessModal() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-[100]">
			<div className="bg-transparent w-[350px] h-[300px] relative flex items-center justify-center">
				<img
					src={successIcon}
					alt=""
					width="300"
					className="mx-auto justify-center flex"
				/>
			</div>
		</div>
	);
}

export default SuccessModal;


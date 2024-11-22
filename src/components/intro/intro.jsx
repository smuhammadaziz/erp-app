import React, { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import { Toaster, toast } from "sonner";
import { FaCheckCircle, FaExclamationCircle, FaKey } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function IntroPageKSB() {
	const [ksbId, setKsbId] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const [language, setLanguage] = useLang("uz");

	useEffect(() => {
		setTimeout(() => setLoading(false), 555);
	}, []);

	const handleSubmit = () => {
		if (ksbId === "123") {
			toast.success("Muvaffaqiyatli", {
				icon: <FaCheckCircle />,
				style: { backgroundColor: "#22c55e", color: "white" },
			});

			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				navigate("/login", { replace: true });
			}, 555);
		} else if (ksbId === "111") {
			toast.error("KSB-ID ning muddati tugagan", {
				icon: <FaExclamationCircle />,
				style: { backgroundColor: "#ef4444", color: "white" },
			});
		} else {
			toast("Iltimos KSB-ID ni to'g'ri kiriting.", {
				icon: <FaExclamationCircle />,
				style: { backgroundColor: "#f5c000", color: "black" },
			});
		}
	};

	return (
		<Layout>
			{loading ? (
				<Loader />
			) : (
				<div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-600">
					<div className="bg-white p-10 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 space-y-8 max-w-md">
						<div className="text-center space-y-4">
							<img
								src={logo}
								alt="logo"
								className="w-48 mx-auto"
							/>
							<h1 className="text-3xl font-bold text-gray-800">
								{content[language].intro.welcome}
							</h1>
							<p className="text-gray-600">
								{content[language].intro.please}
							</p>
						</div>

						<div className="relative">
							<input
								type="text"
								placeholder={content[language].intro.enter}
								value={ksbId}
								onChange={(e) => setKsbId(e.target.value)}
								className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
							/>
							<FaKey
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
						</div>

						<div>
							<button
								onClick={handleSubmit}
								className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg"
							>
								{content[language].intro.send}
							</button>
						</div>
					</div>
				</div>
			)}
			<Toaster position="bottom-right" />
		</Layout>
	);
}

export default IntroPageKSB;

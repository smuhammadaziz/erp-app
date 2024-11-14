import React from "react";
import { Layout } from "../../components/Layout";

import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import SalesMainPageHeader from "../../components/SalesHeader/header";

function SalesMainPage() {
	return (
		<Layout>
			<SalesMainPageHeader />

			<div className="flex gap-6 mt-10 justify-center">
				<NavLink
					to="/login"
					className="flex items-center gap-2 py-3 px-10 bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
				>
					<FaSignInAlt className="text-lg" />
					<span className="text-lg font-medium">Go to Login</span>
				</NavLink>
				<NavLink
					to="/intro"
					className="flex items-center gap-2 py-3 px-10 bg-green-600 text-white hover:bg-green-700 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
				>
					<FaInfoCircle className="text-lg" />
					<span className="text-lg font-medium">Go to Intro</span>
				</NavLink>
				<NavLink
					to="/sales"
					className="flex items-center gap-2 py-3 px-10 bg-green-600 text-white hover:bg-green-700 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
				>
					<MdCurrencyExchange className="text-lg" />
					<span className="text-lg font-medium">Go to Sales</span>
				</NavLink>
			</div>
		</Layout>
	);
}

export default SalesMainPage;

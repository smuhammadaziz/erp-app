import { FC } from "react";
import { Layout } from "../components/Layout";
import InnerLayoutSection from "../components/InnerLayout/innerlayout";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";

export const IndexPage: FC = () => {
	return (
		<Layout>
			<InnerLayoutSection>
				<div className="p-10 text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
					<h1 className="text-4xl font-semibold mb-4">
						Welcome to Our App
					</h1>
					<p className="text-lg text-gray-200">
						Discover our features and start your journey with us!
					</p>
				</div>

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
				</div>
			</InnerLayoutSection>
		</Layout>
	);
};

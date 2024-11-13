import { FC } from "react";
import { Layout } from "../components/Layout";
import InnerLayoutSection from "../components/InnerLayout/innerlayout";
import { NavLink } from "react-router-dom";

export const IndexPage: FC = () => {
	return (
		<Layout>
			<InnerLayoutSection>
				<div className="p-10 text-center text-white bg-slate-500">
					hello world
				</div>

				<div>
					<NavLink
						to="/login"
						className="py-2 px-8 bg-slate-800 text-white hover:bg-slate-900 rounded-full mx-auto"
					>
						go to the login
					</NavLink>
				</div>
			</InnerLayoutSection>
		</Layout>
	);
};

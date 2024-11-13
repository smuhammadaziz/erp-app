import { FC } from "react";
import { Layout } from "../components/Layout";
import InnerLayoutSection from "../components/InnerLayout/innerlayout";

export const IndexPage: FC = () => {
	return (
		<Layout>
			<InnerLayoutSection>
				<div className="p-10 text-center text-white bg-slate-500">
					hello world
				</div>
			</InnerLayoutSection>
		</Layout>
	);
};

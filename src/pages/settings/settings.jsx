import React from "react";
import { Layout } from "../../components/Layout";
import InnerLayoutSection from "../../components/InnerLayout/innerlayout";
import SettingsSectionForSettings from "../../components/settings/settings";

function SettingsPage() {
	return (
		<Layout>
			<InnerLayoutSection>
				<div>
					<SettingsSectionForSettings />
				</div>
			</InnerLayoutSection>
		</Layout>
	);
}

export default SettingsPage;

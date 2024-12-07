import React, { useState } from "react";
import { Layout } from "../../layout/HomeLayout/layout";
import InnerLayoutSection from "../../layout/InnerLayout/innerlayout";
import Sidebar from "../../components/settingsPage/settings/Sidebar";
import PersonalInformation from "../../components/settingsPage/settings/PersonalInformation";
import Security from "../../components/settingsPage/settings/Security";
import MessageNotifications from "../../components/settingsPage/settings/Notifications";

function SettingsPage() {
	const [activeSection, setActiveSection] = useState("Personal Information");

	return (
		<Layout>
			<InnerLayoutSection>
				<div className="min-h-screen bg-gray-100">
					<div className="container mx-auto flex space-x-6">
						<Sidebar
							activeSection={activeSection}
							setActiveSection={setActiveSection}
						/>
						<div className="w-3/4">
							{activeSection === "Personal Information" && (
								<PersonalInformation />
							)}
							{activeSection === "Security" && <Security />}
							{activeSection === "Notifications" && (
								<MessageNotifications />
							)}
						</div>
					</div>
				</div>
			</InnerLayoutSection>
		</Layout>
	);
}

export default SettingsPage;

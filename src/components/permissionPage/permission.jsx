import React, { useState, useEffect } from "react";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function PermissionComponent() {
	const [language] = useLang("uz");

	return <div>PermissionComponent</div>;
}

export default PermissionComponent;


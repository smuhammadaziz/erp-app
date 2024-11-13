import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { PopupPage } from "./pages/popup";
import LoginPageKSB from "./components/Login/login";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPage />} />
					<Route path="popup" element={<PopupPage />} />
				</Route>
				<Route path="/login" element={<LoginPageKSB />} />
			</Routes>
		</HashRouter>
	);
};

import { FC, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import { PopupPage } from "./pages/popup";

import LoginPageKSB from "./components/Login/login";
import IntroPageKSB from "./components/intro/intro";
import Loader from "./common/loader";
import SalesMainPage from "./pages/sales/sales";
import CustomersPage from "./pages/customers/customers";
import ProductsPage from "./pages/products/products";
import SettingsPage from "./pages/settings/settings";

export const Router: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 555);
	}, []);
	return loading ? (
		<Loader />
	) : (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPage />} />
					<Route path="popup" element={<PopupPage />} />
				</Route>
				<Route path="/login" element={<LoginPageKSB />} />
				<Route path="/intro" element={<IntroPageKSB />} />
				<Route path="/sales" element={<SalesMainPage />} />
				<Route path="/customers" element={<CustomersPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
		</HashRouter>
	);
};

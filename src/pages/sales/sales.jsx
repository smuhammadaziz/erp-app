import React, { useState, useEffect } from "react";
import SalesMainAllProducts from "../../components/salesPage/SalesAllProducts/products";
import SalespageSummaSection from "../../components/salesPage/summa/summa";
import SalesSoldProducts from "../../components/salesPage/SalesSoldProducts/soldproducts";
import SalesPageLayoutMain from "../../layout/SalesLayout/saleslayout";
import nodeUrl from "../../links";

function SalesMainPage({ socket }) {
	const [lastAddedProductId, setLastAddedProductId] = useState(null);

	const handleProductAdded = (productId) => {
		setLastAddedProductId(productId);
	};

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");
	const userType = localStorage.getItem("userType");
	const userPassword = localStorage.getItem("userPassword");

	const [lastUpdateTime, setLastUpdateTime] = useState(0);

	const fetchingProductUpdateData = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/update/product_update/data/${deviceId}/${ksbId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`ERROR PRODUCT_UPDATE: ${response.status}`);
			}
		} catch (error) {
			console.error("Error fetching symbol data:", error);
		}
	};

	const fetchingResponseSyncing = async () => {
		try {
			const responseSyncing = await fetch(
				`${nodeUrl}/api/syncing/${ksbId}/${deviceId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"ipaddress:port": ipaddressPort,
						database: mainDatabase,
						userName: userType,
						userPassword: userPassword,
					}),
				},
			);

			if (!responseSyncing.ok) {
				throw new Error(`ERROR SYNCING: ${responseSyncing.status}`);
			}
		} catch (error) {
			console.error("Error fetching symbol data:", error);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			fetchingResponseSyncing();
			fetchingProductUpdateData();
		}, 900000);

		return () => clearInterval(interval);
	}, []);

	return (
		<SalesPageLayoutMain socket={socket}>
			<div className="">
				<div className="flex gap-2 justify-between">
					<div className="w-[90vw] ">
						<SalesSoldProducts
							key={lastAddedProductId}
							socket={socket}
						/>
					</div>
					<div className="">
						<SalespageSummaSection socket={socket} />
					</div>
				</div>
				<div className="">
					<SalesMainAllProducts
						onProductAdded={handleProductAdded}
						socket={socket}
					/>
				</div>
			</div>
		</SalesPageLayoutMain>
	);
}

export default SalesMainPage;


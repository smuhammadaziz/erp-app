import React, { useState, useEffect } from "react";
import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import {
	MdOutlineFormatListBulleted,
	MdCalendarToday,
	MdOutlineSignalWifiStatusbarConnectedNoInternet4,
	MdOutlineSignalWifiStatusbar4Bar,
} from "react-icons/md";

const sales = [
	{
		id: "698316f5-aa40-49fd-a38d-819f3ab77e5a",
		ksb_id: "66419856",
		device_id: "654651-.000000--000000--000000",
		date: "12.12.2024",
		status: "process",
		client_id: "000000-000000-0000000",
		client_name: "oddiy xaridor",
		total_price: "800",
		details: [
			{
				document: "698316f5-aa40-49fd-a38d-819f3ab77e5a",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: 12700,
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: 5,
				comment: "something",
				below_cost: false,
			},
		],
		products: [
			{
				product: "176713b9-8e0e-11ef-bb1b-581122da5a09",
				product_name: "apple 2kg",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				quantity: 2,
				price: 5000,
				sum: 10000,
			},
			{
				product: "8888888888-8e0e-11ef-bb1b-581122da5a09",
				product_name: "banana",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				quantity: 5,
				price: 5000,
				sum: 25000,
			},
			{
				product: "999999999-8e0e-11ef-bb1b-581122da5a09",
				product_name: "mango new",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				quantity: 2,
				price: 10000,
				sum: 20000,
			},
		],
		payments: [
			{
				cash: "00000000-0000-0000-0000-000000000000",
				currency: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				sum: 10000,
			},
		],
	},
	{
		id: "d2236bda-74f5-4294-b7bf-97f0c26bb923",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T11:50:47.186Z",
		status: "process",
		client_id: "f44b56e4-8239-11ee-b956-581122da5a09",
		client_name: "Кора нон ва Ак-бел сыр  Фаргона хожи тога",
		total_price: "279000",
		details: [
			{
				document: "d2236bda-74f5-4294-b7bf-97f0c26bb923",
				client: "f44b56e4-8239-11ee-b956-581122da5a09",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "24%",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "ca34a00a-c26f-11ee-b9ce-581122da5a09",
				product_name: "Family water газланмаган 10 л",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 13000,
				sum: 13000,
			},
			{
				product: "21ce19ce-2a43-11ef-ba6c-581122da5a09",
				product_name: "Behamad  Mango  juice 1l",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "2",
				price: 15000,
				sum: 30000,
			},
			{
				product: "faf5b771-6e85-11ef-bae9-581122da5a09",
				product_name: "Победа Classic Шоколад 32% cacao 250 гр",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 35000,
				sum: 35000,
			},
			{
				product: "f06aaa1c-7f09-11ee-b94e-581122da5a09",
				product_name: "Яшкино Фэнси Конфет",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 52000,
				sum: 52000,
			},
			{
				product: "f8c2d1a6-4057-11ef-ba93-581122da5a09",
				product_name: "ARKO men пена для бритья  COOL 200мл",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: 2,
				price: 37000,
				sum: 74000,
			},
			{
				product: "05c5e9c8-7bc7-11ee-b949-581122da5a09",
				product_name: "Toy story Киндер",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "5",
				price: 15000,
				sum: 75000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "279000",
			},
		],
	},
	{
		id: "adace374-8f25-4dbc-9fc5-0f6eb9b26916",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T15:16:00.813Z",
		status: "process",
		client_id: "4c409252-2572-11ef-ba65-581122da5a09",
		client_name: "Хаёт лаззати булочкалари Қудратилло ",
		total_price: "21000",
		details: [
			{
				document: "adace374-8f25-4dbc-9fc5-0f6eb9b26916",
				client: "4c409252-2572-11ef-ba65-581122da5a09",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "24%",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "70106199-0b86-11ef-ba40-581122da5a09",
				product_name: "Parvoz сасиска куриные 400гр",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 19000,
				sum: 19000,
			},
			{
				product: "7972e200-4401-11ef-ba9a-581122da5a09",
				product_name: "Маркер для доски рангли хар хил",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 2000,
				sum: 2000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "21000",
			},
		],
	},
	{
		id: "f5439ec5-06ff-4ee6-9eaa-d9ac77419069",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T16:12:34.839Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "60000",
		details: [
			{
				document: "f5439ec5-06ff-4ee6-9eaa-d9ac77419069",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "24%",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "8d67bc34-40db-11ef-ba94-581122da5a09",
				product_name: "Nivea Men чистая кожа  гель для бритья 200 мл",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 60000,
				sum: 60000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "60000",
			},
		],
	},
	{
		id: "2be580c5-df74-424e-b1bf-c99353d1f682",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T16:13:25.270Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "60000",
		details: [
			{
				document: "2be580c5-df74-424e-b1bf-c99353d1f682",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "24%",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "8d67bc34-40db-11ef-ba94-581122da5a09",
				product_name: "Nivea Men чистая кожа  гель для бритья 200 мл",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 60000,
				sum: 60000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "60000",
			},
		],
	},
	{
		id: "04bb8b7e-f290-4356-b2c2-a52a24530a0d",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T16:13:54.831Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "60000",
		details: [
			{
				document: "04bb8b7e-f290-4356-b2c2-a52a24530a0d",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "24%",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "8d67bc34-40db-11ef-ba94-581122da5a09",
				product_name: "Nivea Men чистая кожа  гель для бритья 200 мл",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 60000,
				sum: 60000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "60000",
			},
		],
	},
	{
		id: "04640314-50b4-40a0-94b8-faa3c6b36758",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T17:43:36.637Z",
		status: "process",
		client_id: "485e9854-eb5a-11ee-ba0d-581122da5a09",
		client_name: "Eco Water Suvlari ",
		total_price: "24000",
		details: [
			{
				document: "04640314-50b4-40a0-94b8-faa3c6b36758",
				client: "485e9854-eb5a-11ee-ba0d-581122da5a09",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "0",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "7972e200-4401-11ef-ba9a-581122da5a09",
				product_name: "Маркер для доски рангли хар хил",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "12",
				price: 2000,
				sum: 24000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "24000",
			},
		],
	},
	{
		id: "515f45bd-1ad7-4035-b5ad-28693c845acb",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T17:47:14.971Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "192500",
		details: [
			{
				document: "515f45bd-1ad7-4035-b5ad-28693c845acb",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "0",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "986c12df-7c9d-11ee-b94b-581122da5a09",
				product_name: "Nestle Nan 2 Opti Pro 800гр",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 185000,
				sum: 185000,
			},
			{
				product: "1c71febb-3f41-11ef-ba92-581122da5a09",
				product_name: "Pepsi Напиток (шиша) zero 250Ml",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 7500,
				sum: 7500,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "192500",
			},
		],
	},
	{
		id: "98ff0ccb-b575-401c-805d-1060356c8c28",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T17:48:02.409Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "36000",
		details: [
			{
				document: "98ff0ccb-b575-401c-805d-1060356c8c28",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "0",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "f180d1e2-7be7-11ee-b949-581122da5a09",
				product_name: "Пон Пончик с шоколдодной",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "12",
				price: 3000,
				sum: 36000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "36000",
			},
		],
	},
	{
		id: "0e3c708b-9b54-42ba-b23a-682ae43af790",
		ksb_id: "66419856",
		device_id: "120c11a0-d00b-456a-8593-e702edeb43e6",
		date: "2025-01-27T17:58:15.845Z",
		status: "process",
		client_id: "00000000-0000-0000-0000-000000000000",
		client_name: "Оддий Харидор",
		total_price: "252000",
		details: [
			{
				document: "0e3c708b-9b54-42ba-b23a-682ae43af790",
				client: "00000000-0000-0000-0000-000000000000",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				price_type: "e51e4ee7-d689-11e7-b79f-00ac1948df3a",
				rate: "12700",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				discount: "0",
				comment: "hello",
				below_cost: 0,
			},
		],
		products: [
			{
				product: "ca34a00a-c26f-11ee-b9ce-581122da5a09",
				product_name: "Family water газланмаган 10 л",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "12",
				price: 13000,
				sum: 156000,
			},
			{
				product: "28d537d7-3f95-11ef-ba92-581122da5a09",
				product_name: "Deep Depil для депиляции unisex 20 шт",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 34000,
				sum: 34000,
			},
			{
				product: "f06aaa1c-7f09-11ee-b94e-581122da5a09",
				product_name: "Яшкино Фэнси Конфет",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 52000,
				sum: 52000,
			},
			{
				product: "4eca5980-9343-11ee-b976-581122da5a09",
				product_name: "Напитка Kids Toys яблока 0,390 л",
				warehouse: "e51e4ee3-d689-11e7-b79f-00ac1948df3a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				quantity: "1",
				price: 10000,
				sum: 10000,
			},
		],
		payments: [
			{
				cash: "411c77fa-3d75-11e8-86d1-2089849ccd5a",
				currency: "e51e4ee6-d689-11e7-b79f-00ac1948df3a",
				sum: "252000",
			},
		],
	},
];

import {
	MdOutlineShoppingCart,
	MdAccessTime,
	MdPriceCheck,
	MdPersonOutline,
	MdOutlineInfo,
	MdClose,
	MdPayment,
	MdInventory,
	MdWarehouse,
	MdSearch,
	MdFilterList,
} from "react-icons/md";
import { BsBasket3, BsCreditCard2Back, BsBarChart } from "react-icons/bs";
function SalesPageLayoutHeader() {
	const [isModalOpen, setIsModalOpen] = useState({
		klientlar: false,
		smenaYopish: false,
		skidka: false,
	});

	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [status, setStatus] = useState("checking");

	const checkNetworkStatus = async () => {
		if (!navigator.onLine) {
			setStatus("offline");
			return;
		}

		try {
			const response = await fetch("https://www.google.com/favicon.ico", {
				method: "HEAD",
				cache: "no-store",
			});

			if (response.ok) {
				setStatus("online");
			} else {
				setStatus("no-internet");
			}
		} catch (error) {
			setStatus("no-internet");
		}
	};

	useEffect(() => {
		checkNetworkStatus();

		const handleOnline = () => checkNetworkStatus();
		const handleOffline = () => setStatus("offline");

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	const handleOpenModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: true }));
	};

	const handleCloseModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: false }));
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const openDetailModal = (sale) => {
		setSelectedSale(sale);
		setIsDetailModalOpen(true);
	};

	const renderStatusButton = () => {
		switch (status) {
			case "online":
				return (
					<button className="flex items-center mr-2 justify-center bg-green-500 hover:bg-green-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
						<MdOutlineSignalWifiStatusbar4Bar className="mr-3 text-xl" />
						<span className="font-semibold">Online</span>
					</button>
				);
			case "no-internet":
				return (
					<button className="flex items-center mr-2 justify-center bg-green-500 hover:bg-green-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
						<MdOutlineSignalWifiStatusbar4Bar className="mr-3 text-xl" />
						<span className="font-semibold">Online</span>
					</button>
				);
			case "offline":
				return (
					<button className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600">
						<MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="mr-3 text-xl" />
						<span className="font-semibold">Offline</span>
					</button>
				);
			default:
				return (
					<button className="flex items-center mr-2 justify-center bg-gray-400 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500">
						<span className="font-semibold">Checking...</span>
					</button>
				);
		}
	};

	const basicUsername = localStorage.getItem("userType");

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FaUserAlt className="text-xl" />
						<span className="font-medium">{basicUsername}</span>
					</span>
				</div>
				<div className="flex items-center">
					<button
						onClick={() => handleOpenModal("smenaYopish")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<BsClock className="mr-3 text-xl" />
						<span className="font-semibold">Smena yopish</span>
					</button>
					<button
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">Klientlar</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				{renderStatusButton()}
				<button
					onClick={() => handleOpenModal("skidka")}
					className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">Skidka</span>
				</button>
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
				>
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-semibold">списка</span>
				</button>
				<button className="flex items-center justify-center bg-blue-900 hover:bg-blue-950 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-950">
					<MdCalendarToday className="mr-3 text-xl" />
					<span className="font-semibold">11.18.2024</span>
				</button>
			</div>
			{isListModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
					<div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
						<div className="p-4 border-b border-gray-200 flex justify-between items-center bg-green-600 text-white">
							<h2 className="text-xl font-semibold flex items-center">
								<BsBasket3 className="mr-2" /> Sales Overview
							</h2>
							<button
								onClick={() => setIsListModalOpen(false)}
								className="p-1 hover:bg-green-700 rounded-full transition-colors"
							>
								<MdClose className="text-2xl" />
							</button>
						</div>

						<div className="overflow-y-auto max-h-[calc(80vh-4rem)]">
							<div className="grid gap-4 p-4">
								{sales.map((sale) => (
									<div
										key={sale.id}
										className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
									>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
											<div className="flex items-center">
												<MdPersonOutline className="text-gray-500 mr-2 text-xl" />
												<div>
													<p className="text-sm text-gray-500">
														Client
													</p>
													<p className="font-medium truncate">
														{sale.client_name}
													</p>
												</div>
											</div>

											<div className="flex items-center">
												<MdPriceCheck className="text-gray-500 mr-2 text-xl" />
												<div>
													<p className="text-sm text-gray-500">
														Total
													</p>
													<p className="font-medium">
														${sale.total_price}
													</p>
												</div>
											</div>

											<div className="flex items-center">
												<MdAccessTime className="text-gray-500 mr-2 text-xl" />
												<div>
													<p className="text-sm text-gray-500">
														Date
													</p>
													<p className="font-medium">
														{formatDate(sale.date)}
													</p>
												</div>
											</div>

											<div className="flex items-center justify-between">
												<div className="flex items-center">
													<div className="mr-4">
														<p className="text-sm text-gray-500">
															Status
														</p>
														<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
															{sale.status}
														</span>
													</div>
												</div>

												<button
													onClick={() =>
														openDetailModal(sale)
													}
													className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
												>
													<MdOutlineInfo className="mr-1" />
													View
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Detail Modal */}
			{isDetailModalOpen && selectedSale && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
						<div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
							<h2 className="text-xl font-semibold flex items-center">
								<MdOutlineInfo className="mr-2" /> Sale Details
							</h2>
							<button
								onClick={() => setIsDetailModalOpen(false)}
								className="p-1 hover:bg-blue-700 rounded-full transition-colors"
							>
								<MdClose className="text-2xl" />
							</button>
						</div>

						<div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
							<div className="p-6 space-y-6">
								{/* Client Information */}
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdPersonOutline className="mr-2" />{" "}
										Client Information
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<p>
											<span className="text-gray-600">
												Name:
											</span>{" "}
											{selectedSale.client_name}
										</p>
										<p>
											<span className="text-gray-600">
												ID:
											</span>{" "}
											{selectedSale.client_id}
										</p>
									</div>
								</div>

								{/* Products */}
								<div>
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdInventory className="mr-2" />{" "}
										Products
									</h3>
									<div className="space-y-3">
										{selectedSale.products.map(
											(product, index) => (
												<div
													key={index}
													className="border rounded-lg p-3 hover:bg-gray-50"
												>
													<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
														<p className="font-medium">
															{
																product.product_name
															}
														</p>
														<p>
															Quantity:{" "}
															{product.quantity}
														</p>
														<p>
															Price: $
															{product.price}
														</p>
														<p className="font-medium">
															Total: $
															{product.sum}
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>

								{/* Payment Information */}
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdPayment className="mr-2" /> Payment
										Details
									</h3>
									<div className="space-y-2">
										{selectedSale.payments.map(
											(payment, index) => (
												<div
													key={index}
													className="flex justify-between"
												>
													<span>
														Payment {index + 1}
													</span>
													<span className="font-medium">
														${payment.sum}
													</span>
												</div>
											),
										)}
										<div className="border-t pt-2 mt-2">
											<div className="flex justify-between font-semibold">
												<span>Total Amount</span>
												<span>
													${selectedSale.total_price}
												</span>
											</div>
										</div>
									</div>
								</div>

								{/* Additional Details */}
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdWarehouse className="mr-2" />{" "}
										Additional Details
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<p>
											<span className="text-gray-600">
												Status:
											</span>{" "}
											{selectedSale.status}
										</p>
										<p>
											<span className="text-gray-600">
												Date:
											</span>{" "}
											{formatDate(selectedSale.date)}
										</p>
										<p>
											<span className="text-gray-600">
												Device ID:
											</span>{" "}
											{selectedSale.device_id}
										</p>
										<p>
											<span className="text-gray-600">
												KSB ID:
											</span>{" "}
											{selectedSale.ksb_id}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SalesPageLayoutHeader;

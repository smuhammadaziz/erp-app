import { NavLink } from "react-router-dom";

type Content = {
	[key: string]: {
		intro: {
			welcome: string;
			please: string;
			enter: string;
			send: string;
		};
		login: {
			login: string;
			select: string;
			password: string;
			enterPass: string;
		};
		home: {
			totalSales: string;
			activeClient: string;
			products: string;
			salesDashboard: string;
			clientManagement: string;
			productCatalog: string;
			salesChart: string;
			time: {
				day: string;
				week: string;
				month: string;
				year: string;
			};
		};
	};
};

const content: Content = {
	uz: {
		intro: {
			welcome: "KSB Portalga Hush Kelibsiz",
			please: "Davom etish uchun KSB-ID ni kiriting",
			enter: "KSB-ID ni kiriting",
			send: "Kirish",
		},
		login: {
			login: "Kirish",
			select: "Foydalanuvchini tanlang",
			password: "Parol",
			enterPass: "Parolni kiriting",
		},
		home: {
			totalSales: "Umumiy Savdo Summasi",
			activeClient: "Aktiv Klientlar",
			products: "Mahsulotlar",
			salesDashboard: "Savdo Oynasi",
			clientManagement: "Klientlar Oynasi",
			productCatalog: "Mahsulotlar Oynasi",
			salesChart: "Savdo grafigi",
			time: {
				day: "Kunlik",
				week: "Haftalik",
				month: "Oylik",
				year: "Yillik",
			},
		},
	},
	ru: {
		intro: {
			welcome: "Добро пожаловать на портал KSB",
			please: "Пожалуйста, введите свой KSB-ID",
			enter: "Введите свой KSB-ID",
			send: "Войти",
		},
		login: {
			login: "Войти",
			select: "Выберите пользователя",
			password: "Пароль",
			enterPass: "Введите пароль",
		},
		home: {
			totalSales: "Общая сумма продаж",
			activeClient: "Активные клиенты",
			products: "Продукты",
			salesDashboard: "Торговое окно",
			clientManagement: "Окно клиента",
			productCatalog: "Окно продуктов",
			salesChart: "Торговый график",
			time: {
				day: "День",
				week: "Неделя",
				month: "Месяц",
				year: "Год",
			},
		},
	},
};

export default content;

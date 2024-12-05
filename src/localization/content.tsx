import { NavLink } from "react-router-dom";

type Content = {
	[key: string]: {
		intro: {
			welcome: string;
			please: string;
			enter: string;
			send: string;
			network: string;
			try: string;
			pleaseEnterKsb: string;
			pleaseEnter8: string;
			requestTimeOut: string;
			checking: string;
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
		innerLayout: {
			home: string;
			customers: string;
			products: string;
			settings: string;
			rus: string;
			uz: string;
		};
	};
};

const content: Content = {
	uz: {
		intro: {
			welcome: "KSB Порталга Хуш Келибсиз",
			please: "Давом етиш учун KSB-ID ни киритинг",
			enter: "KSB-ID ни киритинг",
			send: "Тизимга Кириш",
			network: "Тармоққа уланиш йўқ",
			try: "Қайта уланишга уриниш...",
			pleaseEnterKsb: "Илтимос, КСБ ИД ни киритинг",
			pleaseEnter8: "Илтимос, 8 та рақам киритинг",
			requestTimeOut:
				"Сўровни кутиш вақти тугаши. Илтимос, қайта уриниб коʻринг.",
			checking: "Текширилмоқда...",
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
		innerLayout: {
			home: "Bosh sahifa",
			customers: "Mijozlar",
			products: "Mahsulotlar",
			settings: "Sozlamalar",
			rus: "Rus",
			uz: "O'zb",
		},
	},
	ru: {
		intro: {
			welcome: "Добро пожаловать на портал KSB",
			please: "Пожалуйста, введите свой KSB-ID",
			enter: "Введите свой KSB-ID",
			send: "Войти",
			network: "Нет сетевого подключения",
			try: "Попытка повторного подключения...",
			pleaseEnterKsb: "Пожалуйста, введите KSB ID",
			pleaseEnter8: "Пожалуйста, введите 8 цифр",
			requestTimeOut:
				"Запросить тайм-аут. Пожалуйста, попробуйте еще раз.",
			checking: "Проверка...",
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
		innerLayout: {
			home: "Дом",
			customers: "Клиенты",
			products: "Продукты",
			settings: "Настройки",
			rus: "Русский",
			uz: "Узбекский",
		},
	},
};

export default content;

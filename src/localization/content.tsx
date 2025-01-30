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
			error: string;
		};
		login: {
			login: string;
			loginButton: string;
			select: string;
			password: string;
			enterPass: string;
			error: string;
			selectUserType: string;
			databaseBlocked: string;
			serverError: string;
			fetchError: string;
			requestTimeOut: string;
			noInternetConnection: string;
			connectionError: string;
			passwordSetSuccessfully: string;
			failedToSetPassword: string;
			pleaseEnterPassword: string;
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
		enterpriseInfo: {
			infos: string;
			signout: string;
			update: string;
		};
		syncing: {
			complete: string;
			data: string;
			close: string;
		};
		noInternet: {
			title: string;
			message: string;
			close: string;
		};
		client: {
			detail: string;
			name: string;
			phone: string;
			no_phone: string;
			actions: string;
			view: string;
			contact: string;
			search: string;
		};
		product: {
			detail: string;
			search: string;
			name: string;
			type: string;
			symbol: string;
			currency: string;
			article: string;
			box: string;
			extra: string;
			view: string;
			main: string;
			stock: string;
			price: string;
			barcodes: string;
			quantity: string;
			sale: string;
			not_available: string;
		};
		settingsUsers: {
			users: string;
			active: string;
			security: string;
			recovery: string;
			logout: string;
			currenctPass: string;
			newPassword: string;
			confirmNewPassword: string;
			updatePassword: string;
			recoveryYourInformation: string;
			recoveryNow: string;
			recoveryEnterYourPassword: string;
			recoveryProcessingRequest: string;
			recoveryDataSuccess: string;
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
			error: "Номаълум хатолик",
		},
		login: {
			login: "Базага кириш",
			loginButton: "кириш",
			select: "Фойдаланувчи",
			password: "Парол",
			enterPass: "Паролни киритинг",
			error: "Фойдаланувчиларни олиб бўлмади",
			selectUserType: "Фойдаланувчи турини танланг",
			databaseBlocked: "Маълумотлар базаси блокланган",
			serverError:
				"Ички сервер хатоси юз берди.  Кейинроқ қайта уриниб кўринг.",
			fetchError:
				"Кутилмаган хатолик юз берди. Илтимос, қайта уриниб коʻринг.",
			requestTimeOut:
				"Сўров муддати тугади. Илтимос, уланишингизни текширинг ва қайтадан урининг.",
			noInternetConnection:
				"Интернет алоқаси ёъқ. Илтимос, тармоқингизни текширинг ва қайтадан урининг.",
			connectionError: "Уланиш хатоси. Интернет уланишингизни текширинг.",
			passwordSetSuccessfully: "Парол муваффақиятли оʻрнатилди",
			failedToSetPassword:
				"Тизимга кириш хатоси. Фойдаланувчи номи ва паролни текширинг.",
			pleaseEnterPassword: "Илтимос, паролни киритинг",
		},
		home: {
			totalSales: "Умумий Савдо Суммаси",
			activeClient: "Актив Клиентлар",
			products: "Маҳсулотлар",
			salesDashboard: "Савдо Ойнаси",
			clientManagement: "Клиентлар Ойнаси",
			productCatalog: "Маҳсулотлар Ойнаси",
			salesChart: "Савдо графиги",
			time: {
				day: "Кунлик",
				week: "Ҳафталик",
				month: "Ойлик",
				year: "Йиллик",
			},
		},
		innerLayout: {
			home: "Бош саҳифа",
			customers: "Мижозлар",
			products: "Маҳсулотлар",
			settings: "Созламалар",
			rus: "Рус",
			uz: "Узб",
		},
		enterpriseInfo: {
			infos: "Корхона маълумотлари",
			signout: "KSB-ID дан чиқиш",
			update: "Янгилаш",
		},
		syncing: {
			complete: "Синхронизация тугади",
			data: "Маълумотларингиз муваффақиятли синхронлаштирилди!",
			close: "Ok",
		},
		noInternet: {
			title: "Интернет алоқаси йўқ",
			message:
				"Илтимос, тармоқ уланишингизни текширинг ва қайтадан уриниб кўринг.",
			close: "Ёпиш",
		},
		client: {
			detail: "Мижоз маълумотлари",
			name: "Тўлиқ исми",
			phone: "Телефон",
			no_phone: "-",
			actions: "Қўшимча",
			view: "Кўпроқ",
			contact: "Контакт маълумотлари",
			search: "Мижозларни қидириш",
		},
		product: {
			detail: "Маҳсулот маълумотлари",
			search: "Маҳсулот Қидириш",
			name: "Имя",
			type: "тури",
			symbol: "ўлчов",
			currency: "валюта",
			article: "Статья",
			box: "Коробка",
			extra: "қўшимча",
			view: "кўпроқ",
			main: "асосий",
			stock: "Запас",
			price: "нарх",
			barcodes: "Штрих-кодлар",
			quantity: "миқдор",
			sale: "сотиш",
			not_available: "Запасда йўқ",
		},
		settingsUsers: {
			users: "Фойдаланувчилар",
			active: "Актив",
			security: "Хавсизлик",
			recovery: "Қайта тиклаш",
			logout: "Аккаунтдан чиқиш",
			currenctPass: "Жорий парол",
			newPassword: "Янги парол",
			confirmNewPassword: "Янги паролни тасдиқланг",
			updatePassword: "Ўзгартириш",
			recoveryYourInformation: "Маълумотларингизни қайта тикланг",
			recoveryNow: "Тиклаш",
			recoveryEnterYourPassword:
				"Маълумотингизни тиклаш учун қуйида паролингизни киритинг. ",
			recoveryProcessingRequest: "Сўровингиз кўриб чиқилмоқда...",
			recoveryDataSuccess:
				"Қайта тиклаш муваффақиятли!  Маълумотларингиз тикланди. ",
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
			error: "Неизвестная ошибка",
		},
		login: {
			login: "Доступ к базе",
			loginButton: "войти",
			select: "Пользователь",
			password: "Пароль",
			enterPass: "Введите пароль",
			error: "Не удалось получить пользователей.",
			selectUserType: "Выберите тип пользователя",
			databaseBlocked: "База данных заблокирована",
			serverError:
				"Произошла внутренняя ошибка сервера. Повторите попытку позже.",
			fetchError: "Произошла непредвиденная ошибка. Попробуйте еще раз.",
			requestTimeOut:
				"Запрос истек. Проверьте соединение и попробуйте еще раз.",
			noInternetConnection:
				"Нет подключения к интернету. Проверьте сеть и попробуйте еще раз.",
			connectionError:
				"Ошибка подключения. Проверьте подключение к интернету.",
			passwordSetSuccessfully: "Пароль успешно установлен",
			failedToSetPassword:
				"Ошибка авторизации. Проверьте имя пользователя и пароль.",
			pleaseEnterPassword: "Пожалуйста, введите пароль",
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
			rus: "Рус",
			uz: "Узб",
		},
		enterpriseInfo: {
			infos: "Информация о компании",
			signout: "Выйти из KSB-ID",
			update: "Обновить",
		},
		syncing: {
			complete: "Синхронизация завершена",
			data: "Ваши данные успешно синхронизированы!",
			close: "Ок",
		},
		noInternet: {
			title: "Нет подключения к интернету",
			message:
				"Пожалуйста, проверьте сетевое подключение и попробуйте снова.",
			close: "Закрыть",
		},
		client: {
			detail: "Информация о клиенте",
			name: "Полное имя",
			phone: "Телефон",
			no_phone: "-",
			actions: "Дополнительно",
			view: "Подробнее",
			contact: "Контактная информация",
			search: "Поиск клиентов",
		},
		product: {
			detail: "Информация о продукте",
			search: "Поиск продуктов",
			name: "Имя",
			type: "Тип",
			symbol: "Измерение",
			currency: "Валюта",
			article: "Статья",
			box: "Коробка",
			extra: "Дополнительный",
			view: "Более",
			main: "Главная",
			stock: "Запас",
			price: "Цена",
			barcodes: "Штрих-коды",
			quantity: "Количество",
			sale: "Распродажа",
			not_available: "нет в наличии",
		},
		settingsUsers: {
			users: "Пользователи",
			active: "Актив",
			security: "Безопасность",
			recovery: "Восстановление",
			logout: "Выйти",
			currenctPass: "Текущий пароль",
			newPassword: "Новый пароль",
			confirmNewPassword: "Подтвердите новый пароль",
			updatePassword: "Изменять",
			recoveryYourInformation: "Маълумотларингизни қайта тикланг",
			recoveryNow: "Восстановление",
			recoveryEnterYourPassword:
				"Введите пароль ниже, чтобы восстановить вашу информацию.",
			recoveryProcessingRequest: "Ваш запрос обрабатывается...",
			recoveryDataSuccess:
				"Восстановление прошло успешно! Ваши данные восстановлены. ",
		},
	},
};

export default content;


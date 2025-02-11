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
			positive: string;
			negative: string;
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
			loading: string;
		};
		settingsUsers: {
			users: string;
			active: string;
			current: string;
			currentDevice: string;
			others: string;
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
		salesPage: {
			headerClients: string;
			headerDiscount: string;
			headerList: string;
			headerDiscountSumma: string;
			headerDiscountToPay: string;
			headerDiscountCancel: string;
			soldName: string;
			soldCount: string;
			soldPrice: string;
			soldSumma: string;
			soldNoProduct: string;
			sidebarCash: string;
			sidebarCashPay: string;
			sidebarCashToPay: string;
			sidebarCashCash: string;
			sidebarCashCard: string;
			sidebarCashTotalPrice: string;
			sidebarCashComment: string;
			sidebarCard: string;
			sidebarProcess: string;
			footerExit: string;
			footerExitConfirm: string;
			footerExitYes: string;
			footerNewSales: string;
			saleSearch: string;
			saleDeleteConfirm: string;
			saleDeleteYes: string;
			saleTableName: string;
			saleTableCurrency: string;
			saleTableOstatka: string;
			saleTablePriceCurrency: string;
			saleTablePrice: string;
			saleTableWarehouse: string;
			saleModalCount: string;
			saleModalNotEnough: string;
			sidebarClientSelect: string;
			sidebarClientSearch: string;
		};
		headerProfile: {
			settings: string;
			configure: string;
			logout: string;
			logtext: string;
		};
		changePassword: {
			noInternet: string;
			noInternetText: string;
			internetRequiredToChange: string;
			requiredField: string;
			newPasswordNotMatch: string;
			oldPasswordWrong: string;
			changeSuccess: string;
			errorToast: string;
		};
		exit: {
			exit: string;
			exitTest: string;
		};
		firstSync: {
			downloadSettings: string;
			clickToBelow: string;
			startSync: string;
			pleaseWait: string;
			syncComplete: string;
			dataSuccessfullySynced: string;
			syncFailed: string;
			deviceAlreadyRegistered: string;
			tryAgain: string;
			goToKSB: string;
			noInternet: string;
			pleaseCheck: string;
		};
		settingsDevice: {
			autoSendSales: string;
			setTimeToSend: string;
			currentSendTime: string;
			newSendTime: string;
			timeoutSettings: string;
			setTimeoutForYou: string;
			saveTimeout: string;
			timeoutSaved: string;
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
			activeClient: "Клиентлар",
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
			detail: "Клиентлар",
			name: "Клиент",
			phone: "Телефон",
			no_phone: "-",
			actions: "Қўшимча",
			view: "Кўпроқ",
			contact: "Контакт маълумотлари",
			search: "Қидириш...",
			positive: "Хакдорлик",
			negative: "Карздорлик",
		},
		product: {
			detail: "Маҳсулотлар",
			search: "Қидириш...",
			name: "Маҳсулот",
			type: "тури",
			symbol: "ўлчов",
			currency: "валюта",
			article: "Артикул",
			box: "Коробка",
			extra: "қўшимча",
			view: "батафсил",
			main: "асосий",
			stock: "Склад",
			price: "нарх",
			barcodes: "Штрих-кодлар",
			quantity: "миқдор",
			sale: "сотиш",
			not_available: "Ҳозирча мавжуд эмас",
			loading: "Юкланмоқда",
		},
		settingsUsers: {
			users: "Фойдаланувчилар",
			active: "Актив",
			current: "Жорий фойдаланувчи",
			currentDevice: "Жорий",
			others: "Бошқа фойдаланувчилар",
			security: "Хавсизлик",
			recovery: "Қайта тиклаш",
			logout: "Аккаунтдан чиқиш",
			currenctPass: "Жорий парол",
			newPassword: "Янги парол",
			confirmNewPassword: "Янги паролни тасдиқланг",
			updatePassword: "Ўзгартириш",
			recoveryYourInformation: "Маълумотларингизни қайта тикланг",
			recoveryNow: "Қайта тиклаш",
			recoveryEnterYourPassword:
				"Маълумотингизни тиклаш учун қуйида паролингизни киритинг. ",
			recoveryProcessingRequest: "Амалиёт бажарилмоқда...",
			recoveryDataSuccess:
				"Қайта тиклаш муваффақиятли!  Маълумотларингиз тикланди. ",
		},
		salesPage: {
			headerClients: "Клиентлар",
			headerDiscount: "Скидка",
			headerList: "Савдо рўйҳати",
			headerDiscountSumma: "Сумма",
			headerDiscountToPay: "Тўлов учун",
			headerDiscountCancel: "Бекор қилиш",
			soldName: "Маҳсулот",
			soldCount: "Сони",
			soldPrice: "Нархи",
			soldSumma: "Сумма",
			soldNoProduct: "Ҳозирча маҳсулотлар йўқ",
			sidebarCash: "Нақд",
			sidebarCashPay: "Тўлов",
			sidebarCashToPay: "Тўлов учун",
			sidebarCashCash: "Нақд",
			sidebarCashCard: "Пластик карта",
			sidebarCashTotalPrice: "Жами нарх",
			sidebarCashComment: "Изох",
			sidebarCard: "Онлайн",
			sidebarProcess: "Кечиктирилган",
			footerExit: "Чиқиш",
			footerExitConfirm: "Савдо ойнасидан чиқмоқчимисиз?",
			footerExitYes: "Ҳа, чиқиш",
			footerNewSales: "Янги Савдо",
			saleSearch: "Қидириш",
			saleDeleteConfirm: "Танланган барча маҳсулотларни ўчирмоқчимисиз?",
			saleDeleteYes: "Ҳа, ўчириш",
			saleTableName: "Маҳсулот",
			saleTableCurrency: "Валюта",
			saleTableOstatka: "Қолдиқ",
			saleTablePriceCurrency: "Нарх, Валюта",
			saleTablePrice: "Нарх",
			saleTableWarehouse: "Склад",
			saleModalCount: "Сони",
			saleModalNotEnough: "Қолдиқда йетарли эмас",
			sidebarClientSelect: "Клиент танлаш",
			sidebarClientSearch: "Клиент қидириш",
		},
		headerProfile: {
			settings: "Созламалар",
			configure: "Аккаунтизни созланг",
			logout: "Чиқиш",
			logtext: "Аккаунтдан чиқиш",
		},
		changePassword: {
			noInternet: "Интернет алоқаси йўқ",
			noInternetText: "Паролингизни ўзгартириш учун Интернетга уланинг. ",
			internetRequiredToChange:
				"Паролингизни ўзгартириш учун Интернетга уланинг.",
			requiredField: "Барча жойларни тўлдириш керак",
			newPasswordNotMatch: "Янги парол ва тасдиқлаш пароли мос келмади",
			oldPasswordWrong: "Жорий парол хато",
			changeSuccess: "Парол муваффақиятли ўзгартирилди",
			errorToast: "Хатолик.  Парол ўзгартиришда хатолик мавжуд",
		},
		exit: {
			exit: "Чиқиш",
			exitTest: "Дастурда ишни якунламоқчимисиз?",
		},
		firstSync: {
			downloadSettings: "Синхронизацияни бошланг",
			clickToBelow: "Бошланғич маълумотларингизни юклаб олинг",
			startSync: "Бошлаш",
			pleaseWait: "Илтимос кутинг, амалиёт бажарилмоқда",
			syncComplete: "Синхронизация тугади",
			dataSuccessfullySynced:
				"Маълумотларингиз муваффақиятли синхронизация қилинди",
			syncFailed: "Синхронизация жараёнида хатолик",
			deviceAlreadyRegistered:
				"Бу Фойдаланувчи аллақачон рўйхатдан ўтган.",
			tryAgain: "Қайта уриниб кўринг",
			goToKSB: "KSB-ID дан чиқиш",
			noInternet: "Интернетга уланмаган",
			pleaseCheck:
				"Бошланғич маълумотларингизни синхронизация қилиш учун интернетга уланишингиз керак. ",
		},
		settingsDevice: {
			autoSendSales: "Савдоларни автоматик юбориш",
			setTimeToSend: "Савдоларни автоматик юбориш учун вақт танланг",
			currentSendTime: "Жорий вақт",
			newSendTime: "Савдоларни автоматик юбориш янги вақтга ўзгарди: ",
			timeoutSettings: "TimeOut созламалари",
			setTimeoutForYou: "TimeOut учун вақт киритинг (секундларда)",
			saveTimeout: "Сақлаш",
			timeoutSaved: "TimeOut учун янги вақт сақланди:",
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
			activeClient: "Клиенты",
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
			detail: "Клиенты",
			name: "Имя",
			phone: "Телефон",
			no_phone: "-",
			actions: "Дополнительно",
			view: "Подробнее",
			contact: "Контактная информация",
			search: "Поиск...",
			positive: "Нам должны",
			negative: "Мы должны",
		},
		product: {
			detail: "Продукты",
			search: "Поиск...",
			name: "Продукт",
			type: "Тип",
			symbol: "Измерение",
			currency: "Валюта",
			article: "Артикул",
			box: "Коробка",
			extra: "Дополнительный",
			view: "Более",
			main: "Главная",
			stock: "Склад",
			price: "Цена",
			barcodes: "Штрих-коды",
			quantity: "Количество",
			sale: "Распродажа",
			not_available: "Пока недоступно",
			loading: "Загрузка",
		},
		settingsUsers: {
			users: "Пользователи",
			active: "Актив",
			current: "Текущий пользователь",
			currentDevice: "Текущий",
			others: "Другие пользователи",
			security: "Безопасность",
			recovery: "Восстановление",
			logout: "Выйти",
			currenctPass: "Текущий пароль",
			newPassword: "Новый пароль",
			confirmNewPassword: "Подтвердите новый пароль",
			updatePassword: "Изменять",
			recoveryYourInformation: "Восстановите ваши данные",
			recoveryNow: "Восстановление",
			recoveryEnterYourPassword:
				"Введите пароль ниже, чтобы восстановить вашу информацию.",
			recoveryProcessingRequest: "Процесс продолжается...",
			recoveryDataSuccess:
				"Восстановление прошло успешно! Ваши данные восстановлены. ",
		},
		salesPage: {
			headerClients: "Клиенты",
			headerDiscount: "Скидка",
			headerList: "Списка",
			headerDiscountSumma: "Сумма",
			headerDiscountToPay: "К оплате",
			headerDiscountCancel: "Отмена",
			soldName: "Наименование",
			soldCount: "Количество",
			soldPrice: "Цена",
			soldSumma: "Сумма",
			soldNoProduct: "Пока нет продуктов",
			sidebarCash: "Наличные",
			sidebarCashPay: "Оплата",
			sidebarCashToPay: "К оплате",
			sidebarCashCash: "Наличные",
			sidebarCashCard: "Пластик",
			sidebarCashTotalPrice: "Оплата итого",
			sidebarCashComment: "Комментарии",
			sidebarCard: "Онлайн",
			sidebarProcess: "Отложенный",
			footerExit: "Выход",
			footerExitConfirm: "Хотите выйти из окна продаж?",
			footerExitYes: "Да, выход",
			footerNewSales: "Новое продаж",
			saleSearch: "Поиск",
			saleDeleteConfirm: "Хотите очистить все выбранные продукты?",
			saleDeleteYes: "Да, очистить",
			saleTableName: "Наименование",
			saleTableCurrency: "Валюта",
			saleTableOstatka: "Остатка",
			saleTablePriceCurrency: "Цена, Валюта",
			saleTablePrice: "Цена",
			saleTableWarehouse: "Склад",
			saleModalCount: "Количество",
			saleModalNotEnough: "Осталось недостаточно.",
			sidebarClientSelect: "Выбрать клиента",
			sidebarClientSearch: "Поиск клиентов",
		},
		headerProfile: {
			settings: "Настройки",
			configure: "Настройте свой аккаунт",
			logout: "Выход",
			logtext: "Выйти из аккаунта",
		},
		changePassword: {
			noInternet: "Нет подключения к Интернету",
			noInternetText:
				"Пожалуйста, подключитесь к Интернету, чтобы изменить свой пароль.",
			internetRequiredToChange:
				"Пожалуйста, подключитесь к Интернету, чтобы изменить свой пароль.",
			requiredField: "Все поля должны быть заполнены.",
			newPasswordNotMatch:
				"Новый пароль и подтверждение пароля не совпадают.",
			oldPasswordWrong: "Текущий пароль неверный.",
			changeSuccess: "Пароль успешно изменен.",
			errorToast: "Ошибка. При смене пароля произошла ошибка.",
		},
		exit: {
			exit: "Выход",
			exitTest: "Хотите завершить работу в программе?",
		},
		firstSync: {
			downloadSettings: "Начать синхронизацию",
			clickToBelow: "Загрузите свои исходные данные",
			startSync: "Начать",
			pleaseWait: "Пожалуйста подождите, процесс продолжается",
			syncComplete: "Синхронизация закончена",
			dataSuccessfullySynced: "Ваши данные были успешно синхронизированы",
			syncFailed: "Ошибка во время процесса синхронизации",
			deviceAlreadyRegistered: "Это пользователь уже зарегистрировано.",
			tryAgain: "Попробуйте еще раз.",
			goToKSB: "Выйти из KSB-ID",
			noInternet: "Нет подключения к Интернету",
			pleaseCheck:
				"Чтобы синхронизировать ваши исходные данные, вам необходимо подключиться к Интернету. ",
		},
		settingsDevice: {
			autoSendSales: "Автоматически отправлять продажи",
			setTimeToSend: "Выберите время для автоматической отправки продажи",
			currentSendTime: "Текущее время",
			newSendTime:
				"Автоматическая отправка продажи изменена на новое время: ",
			timeoutSettings: "Настройки TimeOut",
			setTimeoutForYou: "Введите время для TimeOut (в секундах).",
			saveTimeout: "Сохранить",
			timeoutSaved: "Новое время сохранено для TimeOut: ",
		},
	},
};

export default content;


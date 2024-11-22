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
	},
};

export default content;

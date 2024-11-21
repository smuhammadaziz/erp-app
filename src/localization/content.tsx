import { NavLink } from "react-router-dom";

type Content = {
	[key: string]: {
		intro: {
			welcome: string;
			please: string;
			enter: string;
			send: string;
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
	},
	ru: {
		intro: {
			welcome: "Добро пожаловать на портал KSB",
			please: "Пожалуйста, введите свой KSB-ID",
			enter: "Введите свой KSB-ID",
			send: "Войти",
		},
	},
};

export default content;

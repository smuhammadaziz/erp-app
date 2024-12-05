/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideIn: {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				}
			},
			animation: {
				fadeIn: 'fadeIn 0.3s ease-out',
				slideIn: 'slideIn 0.4s ease-out',
			},
		},
	},
	darkMode: "media",
	plugins: [],
};

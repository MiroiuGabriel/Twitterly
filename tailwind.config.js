/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '500px',
			...defaultTheme.screens,
		},
		extend: {
			backgroundImage: {
				landing:
					"url('https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png')",
				controls: 'linear-gradient(transparent, #000000c4)',
			},
			boxShadow: {
				twitter:
					'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
				skin: 'rgb(29, 155, 240) 0px 0px 0px 2px',
				thumb: 'rgba(255, 255, 255, 0.2) 0px 0px 7px, rgba(255, 255, 255, 0.15) 0px 1px 3px 1px',
				gif: 'rgba(142, 205, 248) 0px 0px 0px 2px',
				thumb: 'box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px;',
			},
			dropShadow: {
				twitter: 'rgb(51, 54, 57) 1px -1px 1px',
			},
		},
		fontFamily: {
			chirp: 'Chirp',
		},
	},
	plugins: [
		({ addVariant }) => {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		},
	],
};

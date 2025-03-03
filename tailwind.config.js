import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Montserrat"', 'sans-serif']
			},
			colors: {
				'mpp': '#19924b',
				'kse-dark': '#0c5f2e',
				'kse-darker': '#094823',
				'kse-light': '#1bb85c',
				'kse-lighter': '#17e66c'
			},
			animation: {
				'carousel-scroll': 'carouselScroll 500s linear infinite',
			},
			keyframes: {
				carouselScroll: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animationPlayState: {
				paused: 'paused',
				running: 'running',
			},
		}
	},

	plugins: [typography, forms, containerQueries]
};

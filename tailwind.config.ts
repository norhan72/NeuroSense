import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				'background-secondary': 'hsl(var(--background-secondary))',
				foreground: 'hsl(var(--foreground))',
				'foreground-secondary': 'hsl(var(--foreground-secondary))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					medium: 'hsl(var(--primary-medium))',
					light: 'hsl(var(--primary-light))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))'
				},
				neon: {
					glow: 'hsl(var(--neon-glow))'
				},
				ai: {
					particle: 'hsl(var(--ai-particle))'
				},
				medical: {
					green: 'hsl(var(--medical-green))',
					red: 'hsl(var(--medical-red))'
				},
				dna: {
					helix: 'hsl(var(--dna-helix))'
				},
				neural: {
					blue: 'hsl(var(--neural-blue))'
				},
				button: {
					primary: 'hsl(var(--button-primary))',
					'primary-hover': 'hsl(var(--button-primary-hover))',
					glass: 'hsl(var(--button-glass))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'particle-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.3' },
					'50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '1' }
				},
				'dna-rotate': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'neural-pulse': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				},
				'hologram-flicker': {
					'0%, 100%': { opacity: '1', filter: 'hue-rotate(0deg)' },
					'25%': { opacity: '0.8', filter: 'hue-rotate(90deg)' },
					'50%': { opacity: '0.9', filter: 'hue-rotate(180deg)' },
					'75%': { opacity: '0.7', filter: 'hue-rotate(270deg)' }
				},
				'scan-line': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'heartbeat': {
					'0%, 100%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.3)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.3)' },
					'70%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'particle-float': 'particle-float 4s ease-in-out infinite',
				'dna-rotate': 'dna-rotate 8s linear infinite',
				'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
				'hologram-flicker': 'hologram-flicker 3s ease-in-out infinite',
				'scan-line': 'scan-line 2s linear infinite',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite'
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'inter': ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
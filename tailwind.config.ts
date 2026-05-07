import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'sans-serif'],
  			body: ['var(--font-krub)', 'Krub', 'ui-sans-serif', 'sans-serif'],
  		},
  		fontSize: {
  			'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' }],
  			'display-xl':  ['3.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.03em',  fontWeight: '700' }],
  			'display-lg':  ['3rem',     { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
  			'display-md':  ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '700' }],
  			'display-sm':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
  			'body-xl':     ['1.25rem',  { lineHeight: '1.7'  }],
  			'body-lg':     ['1.125rem', { lineHeight: '1.7'  }],
  			'body-md':     ['1.0625rem',{ lineHeight: '1.75' }],
  			'body-sm':     ['0.9375rem',{ lineHeight: '1.65' }],
  			'label':       ['0.8125rem',{ lineHeight: '1.5',  letterSpacing: '0.04em',  fontWeight: '600' }],
  		},
  		lineHeight: {
  			'reading':       '1.625',
  			'prose':         '1.75',
  			'heading-tight': '1.1',
  			'heading-snug':  '1.2',
  			'heading-base':  '1.3',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-hover': 'var(--primary-hover)',
  			/* Arctic palette — remapped from healthcare navy/ocean/bright */
  			'navy': {
  				'950': '#0c1f35',
  				'900': '#0f2236',
  				'800': '#1a3450',
  			},
  			'ocean': {
  				'700': '#0369a1',
  				'600': '#0284c7',
  				'500': '#0ea5e9',
  				'400': '#38bdf8',
  				'300': '#7dd3fc',
  				'200': '#bae6fd',
  				'100': '#dde8f0',
  				'50':  '#eef4f9',
  			},
  			'bright': {
  				'500': '#38bdf8',
  				'400': '#7dd3fc',
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'var(--card-foreground)',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'var(--muted-foreground)',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'100': '25rem',
  			'112': '28rem',
  			'128': '32rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideIn: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		animation: {
  			shimmer: 'shimmer 2s ease-in-out infinite',
  			fadeIn: 'fadeIn 0.3s ease-out',
  			slideIn: 'slideIn 0.3s ease-out',
  			float: 'float 3s ease-in-out infinite'
  		},
  		transitionTimingFunction: {
  			'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

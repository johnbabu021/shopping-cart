module.exports = {
    future: {
        removeDeprecatedGapUtilities: true
    },
    darkMode: 'class',
    theme: {
        fill: (theme) => ({
            purple: theme('colors.purple.medium'),
            red: theme('colors.red.primary')

        }),
        colors: {
            white: "#fff",
            black: "#000",
            gray: {
                medium: "#808080",
                back: '#f7fcfc',
                bgDark: '#121212',
                cardDark: '#1E1E1E',

            },
            blue: {
                medium: '#005c98'
            },
            purple: {
                medium: "#6D28D9",
                dark: "#4C1D95",
                end: '#a300fa'
            },
            red: {
                primary: "#fc0345"
            },
            pink: {
                medium: "#e092d7"
            }
        },
        screens: {
            'xs': '250px',

            'sm': '500px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        opacity: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '10': '.1',
            '20': '.2',
            '30': '.3',
            '40': '.4',
            '50': '.5',
            '60': '.6',
            '70': '.7',
            '80': '.8',
            '90': '.9',
            '100': '1',
        }
    },
    variants: {
        extend: {
            opacity: ['active'],
        }
    }
}
export default {
    maxWidth: 960,
    transition: {
        time: '0.30s'
    },
    media: {
        tab: '@media (max-width: 960px)',
        tabMini: '@media (max-width: 700px)',
        mob: '@media (max-width: 450px)'
    },
    indents: [
        {name: 'none', indent: 0},
        {name: 'micro', indent: 6},
        {name: 'mini', indent: 12},
        {name: 'normal', indent: 20},
        {name: 'md', indent: 24},
        {name: 'big', indent: 48}
    ],
    fontSizes: [
        {name: 'none', size: 0},
        {name: 'micro', size: 12},
        {name: 'mini', size: 14},
        {name: 'normal', size: 16},
        {name: 'normalPlus', size: 18},
        {name: 'md', size: 20},
        {name: 'mdPlus', size: 22},
        {name: 'big', size: 24},
        {name: 'bigPlus', size: 30}
    ],
    colors: {
        main: '#507d2a',
        lightMain: '#ADBF98',
        black: '#000',
        lightBlack: '#3a352f',
        white: '#ffffff'
    },
    colorsRGB: {
        main: {
            r: '80',
            g: '125',
            b: '42'
        }
    }
};
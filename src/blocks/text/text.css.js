import css from 'blocks/config/css';
import {jcss, isDesktop} from 'jcss';

const text = jcss({
    bold: {
        fontWeight: 600
    },
    colored: {
        color: css.colors.main
    },
    black: {
        color: css.colors.black
    },
    lightBlack: {
        color: css.colors.lightBlack
    },
    white: {
        color: css.colors.white
    },
    up: {
        textTransform: 'uppercase'
    },
    noUp: {
        textTransform: 'none'
    },
    noWrap: {
        whiteSpace: 'nowrap'
    },
    left: {
        textAlign: 'left'
    },
    right: {
        textAlign: 'right'
    },
    center: {
        textAlign: 'center'
    },
    justify: {
        textAlign: 'justify'
    },
    underline: {
        textDecoration: 'underline',
        '&:hover': isDesktop({
            textDecoration: 'none'
        })
    },
    preWrap: {
        whiteSpace: 'pre-wrap'
    },
    ...(() => {
        let sizes = {};
        
        css.fontSizes.forEach((item) => {
            sizes[item.name] = {
                fontSize: item.size
            };
        });
        
        return sizes;
    })()
});

export default text;
import {jcss} from 'jcss';
import item from 'blocks/item/item.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import css from 'blocks/config/css';

const mainSlider = jcss({
    img: {
        ...grid.w100,
        height: '100%',
        ...item.cover
    },
    text: {
        ...item.abs,
        ...item.colored,
        ...item.o70,
        ...grid.pNormal,
        ...text.mdPlus,
        ...text.center,
        right: 0,
        minWidth: '40%',
        top: '14%',
        [css.media.tabMini]: {
            ...grid.pMini,
            ...text.normal,
            minWidth: 'auto'
        }
    },
    wrapper: {
        '& .slick-slider': {
            ...item.rel
        },
        '& .slick-dots': {
            ...item.centred,
            ...item.abs,
            ...item.invColored,
            ...item.arrow,
            ...item.o70,
            ...grid.ptMini,
            ...grid.pbMini,
            'lineHeight': 0,
            bottom: '0',
            height: 'auto',
            '&:hover': null,
            [css.media.tabMini]: {
                ...grid.ptMicro,
                ...grid.pbMicro
            }
        },
        '& .slick-dots li.slick-active': {
            ...item.colored,
            '&:hover': null
        },
        '& .slick-dots li': {
            width: 'auto',
            height: 'auto',
            ...item.borderMain,
            ...item.invColored,
            ...item.circle,
            ...grid.pNone,
            ...grid.mlMicro,
            ...grid.mrMicro
        },
        '& .slick-dots li button': {
            ...grid.pNone,
            ...grid.mNone,
            width: 12,
            height: 12,
            [css.media.mob]: {
                width: 6,
                height: 6
            }
        },
        '& .slick-dots li button:before': {
            content: 'none'
        }
    }
});

export default mainSlider;
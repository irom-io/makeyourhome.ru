import {jcss} from 'jcss';
import item from 'blocks/item/item.css';
import grid from 'blocks/grid/grid.css';
import css from 'blocks/config/css';

const postSlider = jcss({
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

export default postSlider;
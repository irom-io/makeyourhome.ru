import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';
import css from 'blocks/config/css';

const tileLine = jcss({
    wrapper: {
        ...grid.row,
        ...grid.mbNormal,
        ...grid.normalCenter,
        ...item.shadow,
        ...item.rel,
        '&:last-child': {
            ...grid.mbNone
        },
        [css.media.mob]: {
            display: 'block'
        }
    },
    img: {
        ...item.abs,
        ...grid.w30,
        top: 0,
        bottom: 0,
        [css.media.tabMini]: {
            ...grid.w55
        }
    },
    imgWrapper: {
        ...grid.w30,
        [css.media.tabMini]: {
            ...grid.w55
        },
        [css.media.mob]: {
            ...item.none
        }
    },
    content: {
        ...grid.pMini,
        ...grid.mMini,
        ...grid.mtMd,
        ...text.normal,
        ...text.justify,
        [css.media.tab]: {
            ...grid.mMini,
            ...grid.mtMd,
            ...grid.pNone,
            ...text.mini
        },
        [css.media.tabMini]: {
            ...text.micro
        },
        [css.media.mob]: {
            ...grid.mNone,
            ...grid.pMini
        }
    }
});

export default tileLine;
import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';
import tile from 'blocks/tile/tile.css';
import css from 'blocks/config/css';

const projectItem = jcss({
    wrapper: {
        ...grid.row,
        ...grid.mbMini,
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
        ...item.cover,
        ...grid.w50,
        top: 0,
        bottom: 0
    },
    imgWrapper: {
        ...grid.w50,
        [css.media.mob]: {
            ...item.none
        }
    },
    content: {
        ...grid.mtMini,
        ...grid.mbMini,
        ...grid.pMicro,
        ...item.shadow
    },
    text: {
        ...tile.text,
        ...item.rel
    },
    iconWrapper: {
        ...grid.row,
        ...grid.justify,
        [css.media.mob]: {
            ...grid.col
        }
    },
    icon: {
        ...grid.row,
        ...grid.normalCenter,
        ...grid.pMini,
        ...item.rounded,
        ...item.borderMain,
        ...item.invColored,
        '&:last-child': {
            ...grid.mrNone,
            ...grid.mbNone
        },
        [css.media.tab]: {
            ...grid.pMicro,
            ...text.mini
        },
        [css.media.tabMini]: {
            ...grid.w100,
            ...grid.center,
            ...grid.mbMini
        }
    }
});

export default projectItem;
import {jcss, isDesktop} from 'jcss';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import item from 'blocks/item/item.css';
import css from 'blocks/config/css';

const menu = jcss({
    wrapper: {
        ...grid.row,
        ...grid.center,
        ...grid.w100,
        ...item.shadow,
        ...item.rel,
        ...item.z3,
        backgroundColor: css.colors.lightBlack
    },
    content: {
        ...grid.row,
        ...grid.row_tabMini,
        ...grid.justify,
        ...grid.w100,
        ...item.rel,
        maxWidth: css.maxWidth,
        [css.media.tab]: {
            display: 'block'
        }
    },
    items: {
        ...grid.row,
        ...grid.justify,
        ...grid.w100_tab,
        ...item.none_tabMini
    },
    itemsMob: {
        ...grid.col,
        ...grid.w60,
        ...grid.w100_mob,
        ...item.abs,
        ...item.none,
        ...item.block_tabMini,
        ...item.o90,
        top: '100%',
        right: 0
    },
    button: {
        ...grid.pMini,
        ...item.none,
        ...item.block_tabMini,
        width: 52
    },
    buttonContent: {
        ...grid.col,
        ...grid.justify,
        ...item.pointer,
        height: 20
    },
    line: {
        ...grid.w100,
        height: 0,
        borderBottom: `2px solid ${css.colors.white}`
    },
    item: {
        '&>a': {
            ...item.centred,
            ...item.invColored,
            ...item.rel,
            ...text.md,
            ...grid.pMini,
            color: css.colors.white,
            textDecoration: 'none',
            backgroundColor: css.colors.lightBlack
        },
        '&>a.menu_active': {
            ...item.colored,
            '&:hover': null
        },
        '&>ul': {
            ...item.abs,
            ...item.hidden,
            width: '100%',
            maxWidth: 190,
            backgroundColor: css.colors.lightBlack
        },
        '&:hover>ul': isDesktop({
            ...item.visible
        })
    },
    search: {
        ...grid.space,
        '&>input': {
            minHeight: '100%'
        }
    }
});

export default menu;
import {jcss, isDesktop} from 'jcss';
import css from 'blocks/config/css';
import item from 'blocks/item/item.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

const tab = {
    ...item.roundedTop,
    ...item.invColored,
    ...item.borderDotted,
    ...grid.ptNormal,
    ...grid.pbNormal,
    ...grid.w50,
    ...text.center,
    ...text.mdPlus,
    ...text.black,
    borderBottom: 'none',
    borderLeft: 'none',
    '&:hover': isDesktop({
        border: `1px solid ${css.colors.main}`,
        borderBottom: 'none',
        borderLeft: 'none',
        ...item.invColored
    }),
    [css.media.tabMini]: {
        ...text.normal,
        ...grid.ptMini,
        ...grid.pbMini
    },
    [css.media.mob]: {
        ...text.mini,
        ...grid.col,
        ...grid.center
    }
};

const mainToggle = jcss({
    content: {
        ...item.colored,
        ...item.arrow,
        ...grid.pNormal,
        ...grid.pMini_tabMini,
        ...grid.row,
        ...grid.justify,
        '&:hover': null,
        [css.media.mob]: {
            ...grid.col,
            ...grid.normalCenter
        }
    },
    tab: tab,
    active: {
        ...tab,
        ...item.colored,
        ...item.borderSmMain,
        ...item.arrow,
        '&:hover': null
    },
    item: {
        ...item.borderWhite,
        ...item.rounded,
        ...item.centred,
        ...item.colored,
        ...text.normalPlus,
        ...text.center,
        ...text.mini,
        width: 136,
        height: 128,
        lineHeight: 1.3,
        [css.media.tab]: {
            ...text.micro
        },
        [css.media.tabMini]: {
            width: 90,
            height: 80
        },
        [css.media.mob]: {
            width: '100%',
            ...grid.mbMicro,
            '&:last-child': {
                ...grid.mbNone
            }
        }
    },
    text: {
        ...grid.w70,
        ...grid.w90_tabMini
    }
});

export default mainToggle;
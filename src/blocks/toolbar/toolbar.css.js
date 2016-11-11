import jcss from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const icon = {
    ...grid.pMini,
    ...grid.mrMini,
    ...item.rounded,
    ...item.borderMain,
    ...item.invColored,
    [css.media.tabMini]: {
        ...grid.pMicro,
        ...grid.mrMicro
    },
    [css.media.mob]: {
        marginRight: 3
    },
    '&:focus': {
        outline: 0
    },
    '&.iconDisabled': {
        ...item.o50,
        ...item.notAllowed,
        '&:hover': {
            color: css.colors.main,
            backgroundColor: css.colors.white
        }
    },
    '&:last-child': {
        ...grid.mrNone
    }
};
const toolbar = jcss({
    wrapper: {
        ...grid.row,
        ...grid.justify,
        ...grid.normalCenter
    },
    iconsWrapper: {
        ...grid.row
    },
    icon: icon,
    iconBig: {
        ...icon,
        ...grid.pMicro,
        [css.media.tabMini]: {
            ...grid.pNone
        }
    },
    tip: {
        backgroundColor: `${css.colors.white} !important`,
        border: `${item.borderMain.border} !important`,
        color: `${css.colors.main} !important`,
        textAlign: `left !important`,
        padding: `${grid.pMicro.padding}px !important`,
        borderRadius: `${item.rounded.borderRadius}px !important`
    }
});

export default toolbar;
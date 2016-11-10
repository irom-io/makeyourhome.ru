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
    }
});

export default toolbar;
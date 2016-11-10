import jcss from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const icon = {
    ...grid.pMini,
    ...grid.mrMini,
    ...item.rounded,
    ...item.borderMain,
    ...item.invColored,
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
        ...grid.pMicro
    }
});

export default toolbar;
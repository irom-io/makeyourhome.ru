import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const admin = jcss({
    wrapper: {
        ...grid.row,
        ...item.abs,
        right: 6,
        top: 6
    },
    item: {
        ...grid.mrMini,
        ...grid.pMicro,
        ...item.circle,
        ...item.borderMain,
        ...item.invColored,
        '&:last-child': {
            ...grid.mNone
        }
    }
});

export default admin;
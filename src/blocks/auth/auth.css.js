import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const auth = jcss({
    item: {
        ...item.pointer
    },
    loginIcon: {
        ...item.pointer,
        ...item.colored,
        ...item.circle,
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        '&:hover': null,
        width: 48,
        height: 48
    },
    loginItem: {
        ...grid.pMini,
        ...text.colored,
        ...text.normal,
        ...item.borderMain,
        ...item.rounded
    },
    fb: {
        ...item.pointer,
        backgroundColor: 'inherit',
        outline: 'none',
        border: 'none'
    }
});

export default auth;
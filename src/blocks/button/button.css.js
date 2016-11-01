import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const button = jcss({
    item: {
        ...grid.pMini,
        ...text.center,
        ...item.invColored,
        ...item.borderMain,
        ...item.rounded,
        ...item.iBlock,
        '&:focus': {
            outline: 0
        },
        '&:disabled': {
            ...item.o50,
            '&:hover': {
                ...item.colored,
                ...item.notAllowed
            }
        }
    }
});

export default button;
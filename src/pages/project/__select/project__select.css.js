import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const projectSelect = jcss({
    subText: {
        ...grid.mtMicro,
        ...item.pointer,
        ...text.right,
        ...text.colored,
        ...text.micro
    },
    priceWrapper: {
        ...text.right
    },
    price: {
        ...text.colored,
        ...text.md
    }
});

export default projectSelect;
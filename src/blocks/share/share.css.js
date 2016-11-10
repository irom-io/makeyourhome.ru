import jcss from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const share = jcss({
    button: {
        ...grid.mrMicro,
        ...item.pointer,
        '&:last-child': {
            marginRight: grid.mNone.margin
        }
    }
});

export default share;
import jcss from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const share = jcss({
    button: {
        ...grid.mrMicro,
        ...item.pointer,
        [css.media.mob]: {
            marginRight: 0
        },
        '&:last-child': {
            marginRight: grid.mNone.margin
        }
    }
});

export default share;
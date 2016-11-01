import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import css from 'blocks/config/css';

const footer = jcss({
    wrapper: {
        ...grid.w100,
        ...item.z2
    },
    line: {
        ...grid.w100,
        borderTop: `2px solid ${css.colors.main}`
    },
    content: {
        ...grid.row,
        ...grid.justify,
        ...grid.pMini,
        'max-width': css.maxWidth,
        margin: '0 auto'
    }
});

export default footer;
import {jcss} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const rectangle = jcss({
    item: {
        ...item.rel,
        ...grid.w100
    },
    content: {
        ...item.abs,
        ...item.overNone,
        width: '100%',
        height: '100%'
    },
    cover: {
        ...item.cover
    }
});

export default rectangle;
import jcss from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const adminLoader = jcss({
    area: {
        ...grid.w100,
        ...item.rounded,
        ...item.overNone,
        ...item.pointer,
        ...item.borderDashed,
        ...item.o65,
        backgroundColor: css.colors.main
    },
    active: {
        ...item.o100
    },
    inner: {
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        ...text.white
    }
});

export default adminLoader;
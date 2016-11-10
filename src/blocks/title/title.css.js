import {jcss} from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const title = jcss({
    wrapper: {
        ...item.iBlock,
        ...item.overNone,
        ...text.big,
        ...text.normal_tabMini,
        ...text.mini_tabMini
    },
    line: {
        ...grid.mtMicro,
        ...grid.w40,
        height: 0,
        borderBottom: `2px solid ${css.colors.main}`
    }
});

export default title;
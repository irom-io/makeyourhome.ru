import jcss from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const projectImage = jcss({
    back: {
        ...grid.row,
        ...grid.normalCenter,
        ...grid.mbMini,
        ...grid.pMini,
        ...item.colored,
        ...item.shadow,
        ...text.md,
        [css.media.tabMini]: {
            ...grid.pMicro,
            ...text.normal
        }
    }
});

export default projectImage;
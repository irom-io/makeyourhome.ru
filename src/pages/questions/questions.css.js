import {jcss} from 'jcss';
import css from 'blocks/config/css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';
import grid from 'blocks/grid/grid.css';

const questions = jcss({
    wrapper: {
        ...item.shadow,
        ...grid.pMini,
        ...grid.mbNormal,
        '&:last-child': {
            ...grid.mbNone    
        }
    },
    title: {
        ...text.colored,
        ...text.normalPlus,
        ...grid.mbMini,
        [css.media.tab]: {
            ...text.normal
        },
        [css.media.tabMini]: {
            ...text.mini
        }
    },
    text: {
        ...text.normal,
        ...grid.plMini,
        [css.media.tab]: {
            ...text.mini
        },
        [css.media.tabMini]: {
            ...grid.pNone,
            ...text.micro
        }
    }
});

export default questions;
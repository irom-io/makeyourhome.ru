import {jcss, isIE} from 'jcss';
import 'normalize.css';
import 'blocks/fonts/fonts.css';
import './page.reset.css';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import item from 'blocks/item/item.css';

const page = jcss({
    wrapper: {
        minHeight: '100vh',
        ...isIE({height: '100vh'}),
        ...grid.col,
        ...grid.normalCenter,
        '& *': {
            fontFamily: 'a-avantelt',
            letterSpacing: '1.2px'
        }
    },
    header: {
        flexShrink: 0,
        ...grid.row,
        ...grid.col_mob,
        ...grid.justify,
        ...grid.pMini,
        ...grid.w100,
        'max-width': css.maxWidth
    },
    menu: {
        ...item.rel,
        zIndex: 99
    },
    block: {
        ...grid.w100,
        flexShrink: 0
    },
    space: {
        ...grid.w100,
        ...grid.normalCenter,
        ...grid.col,
        flex: '1 0 auto'
    },
    title: {
        ...grid.mbMicro,
        ...text.colored,
        ...text.bigPlus,
        ...text.md_tab,
        ...text.bold
    },
    descr: {
        ...text.normalPlus,  
        ...text.mini_tab  
    },
    content: {
        ...grid.w100,
        ...grid.pMini,
        ...item.shadow,
        ...item.z1,
        'max-width': css.maxWidth,
        flex: '1 0 auto'
    }
});

export default page;
import {jcss} from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const projectSlider = jcss({
    wrapper: {
        ...grid.row,
        ...grid.justify,
        ...grid.normalCenter
    },
    arrow: {
        ...item.pointer,
        ...item.z4,
        ...text.colored
    },
    search: {
        ...item.pointer,
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        ...text.colored,
        ...item.abs,
        ...item.o70,
        backgroundColor: css.colors.white,
        top: grid.pMicro.padding,
        right: grid.pMicro.padding,
        left: grid.pMicro.padding,
        bottom: grid.pMicro.padding
    },
    itemWrapper: {
        ...item.rel,
        ...grid.pMicro,
        '&>.search__wrapper': {
            ...item.hidden
        },
        '&:hover .search__wrapper': {
            ...item.visible
        }
    },
    item: {
        ...item.shadow
    }
});

export default projectSlider;
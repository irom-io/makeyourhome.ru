import {jcss} from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const layout = jcss({
    wrapper: {
        ...item.rel  
    },
    disabled: {
        ...item.abs,
        ...item.cover,
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        top: 0,
        left: 0,
        backgroundColor: `rgba(${css.colorsRGB.main.r}, ${css.colorsRGB.main.g}, ${css.colorsRGB.main.b}, 0.4)`
    }
});

export default layout;
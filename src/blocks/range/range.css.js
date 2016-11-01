import jcss from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import css from 'blocks/config/css';

const select = jcss({
    wrapper: {
        ...grid.w100,
        ...grid.pMini
    },
    item: {
        '& .rc-slider-track': {
            backgroundColor: css.colors.main
        }
    },
    handle: {
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        ...item.borderMain,
        ...item.circle,
        ...item.pointer,
        ...item.abs,
        ...item.invColored,
        transform: 'translate(-50%, -50%)',
        fontSize: 10,
        width: 30,
        height: 30,
        letterSpacing: 0.1,
        '&:hover': null
    }
});

export default select;
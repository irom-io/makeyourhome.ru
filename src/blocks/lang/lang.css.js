import {jcss} from 'jcss';
import css from 'blocks/config/css';
import item from 'blocks/item/item.css';
import grid from 'blocks/grid/grid.css';

const langItem = {
    ...item.invColored,
    borderRight: `2px solid ${css.colors.main}`,
    '& a': {
        ...item.iBlock,
        ...grid.pMicro
    },
    '&:last-child' : {
        borderRight: 'none'
    }
};

const lang = jcss({
    wrapper: {
        ...item.iBlock,
        ...item.borderMain,
        borderRadius: 6,
        overflow: 'hidden'
    },
    item: langItem,
    active: {
        ...langItem,
        ...item.colored,
        '&:hover': null
    }
});

export default lang;
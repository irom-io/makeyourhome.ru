import {jcss} from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import item from 'blocks/item/item.css';

const editItem = {
    ...grid.pMini,
    ...grid.w100,
    ...text.normal,
    ...text.bold,
    ...item.transition,
    ...text.black,
    border: `1px solid ${css.colors.main}`,
    backgroundColor: css.colors.white,
    boxShadow: `0 0 2px ${css.colors.main}`,
    outline: 'none',
    '&::-webkit-input-placeholder': {color: css.colors.lightBlack},
    '&::-moz-placeholder': {color: css.colors.lightBlack},
    '&:-moz-placeholder': {color: css.colors.lightBlack},
    '&:-ms-input-placeholder': {color: css.colors.lightBlack},
    '&:focus': {
        boxShadow: `0 0 9px ${css.colors.main}`
    }
};

const textEdit = jcss({
    input: {
        ...editItem
    },
    textarea: {
        ...editItem,
        resize: 'none',
        lineHeight: 1.3
    }
});

export default textEdit;
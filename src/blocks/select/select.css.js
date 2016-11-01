import jcss from 'jcss';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';
import css from 'blocks/config/css';

const select = jcss({
    item: {
        ...text.mini,
        ...text.colored,
        '& .Select-control': {
            borderColor: css.colors.main,
            ...item.transition
        },
        '& .Select-menu-outer': {
            borderColor: css.colors.main
        },
        '&.is-focused > .Select-control': {
            boxShadow: `0 0 9px ${css.colors.main}`,
            borderColor: css.colors.main
        },
        '& .Select-option': {
            ...item.invColored
        },
        '& .Select-option.is-selected': {
            ...item.colored,
            '&:hover': null
        },
        [css.media.tabMini]: {
            ...text.micro
        }
    }
});

export default select;
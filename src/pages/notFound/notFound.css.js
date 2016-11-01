import {jcss} from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import item from 'blocks/item/item.css';

const size = 400;
const margin = 60;

const notFound = jcss({
    numbers: {
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter
    },
    circle: {
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        ...item.borderMain,
        ...item.circle,
        ...item.z3,
        width: size/2,
        height: size/2,
        marginLeft: -(margin/2),
        marginRight: -margin,
        [css.media.tabMini]: {
            width: size/4,
            height: size/4,
            marginLeft: -(margin/4),
            marginRight: -margin/2
        },
        [css.media.mob]: {
            width: size/8,
            height: size/8,
            marginLeft: -(margin/8),
            marginRight: -margin/4
        }
    },
    circleInner: {
        ...grid.w90,
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter,
        ...text.colored,
        ...item.borderMain,
        ...item.circle,
        height: '90%'
    },
    number: {
        ...item.block,
        ...text.lightBlack,
        fontSize: size,
        fontWeight: 'bold',
        [css.media.tabMini]: {
            fontSize: size/2
        },
        [css.media.mob]: {
            fontSize: size/4
        }
    },
    text: {
        ...text.big,
        ...text.lightBlack,
        ...text.center,
        [css.media.tab]: {
            ...text.md
        },
        [css.media.tabMini]: {
            ...text.normal
        }
    }
});

export default notFound;
import jcss from 'jcss';
import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const projects = jcss({
    filters: {
        ...grid.row,
        ...grid.mbNormal,
        marginRight: -grid.mMini.margin,
        [css.media.mob]: {
            ...grid.mrNone
        }
    },
    filter: {
        width: '33.333333%',
        ...grid.prMini,
        [css.media.mob]: {
            ...grid.w100,
            ...grid.prNone,
            ...grid.mbMicro
        }
    },
    shareButton: {
        ...grid.mrMicro,
        ...item.pointer,
        '&:last-child': {
            marginRight: grid.mNone.margin
        }
    },
    params: {
        ...grid.row,
        ...grid.justify
    },
    paramWrapper: {
        ...text.center,
        [css.media.tabMini]: {
            ...grid.w50,
            ...grid.mbMicro
        }
    },
    param: {
        ...grid.mbMicro,
        ...text.colored,
        ...text.normal,
        [css.media.tab]: {
            ...text.mini
        },
        [css.media.tabMini]: {
            ...grid.mbNone,
            ...text.micro
        }
    }
});

export default projects;
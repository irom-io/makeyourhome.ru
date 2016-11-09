import {jcss, isDesktop} from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

const tile = jcss({
    wrapper: {
        ...grid.row,
        marginBottom: `-${grid.mMini.margin}px`,
        marginRight: `-${grid.mMini.margin}px`
    },
    indents: {
        ...grid.prMini,
        ...grid.pbMini
    },
    item: {
        width: '33.33333333%',
        ...text.none,
        ...grid.w50_tabMini,
        ...grid.w100_mob
    },
    link: {
        ...item.iBlock,
        ...grid.w100,
        '&:hover': isDesktop({
            ...item.shadow
        })
    },
    text: {
        ...grid.pMini,
        ...grid.w100,
        ...text.md,
        ...text.normal_tabMini,
        ...text.center,
        ...item.colored,
        ...item.o80,
        ...item.abs,
        bottom: 0,
        '&:hover': null
    },
    content: {
        ...item.pointer,
        height: '100%'
    },
    img: {
        ...grid.w100,
        height: '100%',
        ...item.cover
    }
});

export default tile;
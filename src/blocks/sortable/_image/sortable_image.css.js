import jcss from 'jcss';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

const sortableImage = jcss({
    wrapper: {
        ...grid.row,
        marginRight: -grid.mMini.margin,
        marginBottom: -grid.mMini.margin
    },
    item: {
        ...grid.prMini,
        ...grid.pbMini,
        width: '33.33333%'
    },
    inner: {
        ...item.shadow,
        ...item.pointer,
    }
});

export default sortableImage;
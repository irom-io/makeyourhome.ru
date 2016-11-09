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
        width: '12.5%'
    },
    inner: {
        ...item.shadow,
        ...item.pointer
    },
    delete: {
        ...item.abs,
        top: 3,
        right: 3
    }
});

export default sortableImage;
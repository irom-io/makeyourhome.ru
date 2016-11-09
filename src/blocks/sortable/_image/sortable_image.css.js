import jcss from 'jcss';
import grid from 'blocks/grid/grid.css';

const sortableImage = jcss({
    wrapper: {
        marginRight: -grid.mMini.margin,
        marginBottom: -grid.mMini.margin
    },
    item: {
        ...grid.prMini,
        ...grid.pbMini,
        width: '33.33333%'
    }
});

export default sortableImage;
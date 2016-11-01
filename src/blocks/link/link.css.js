import {jcss, isDesktop} from 'jcss';

const link = jcss({
    init: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': isDesktop({
            textDecoration: 'none'
        })
    }
});

export default link;
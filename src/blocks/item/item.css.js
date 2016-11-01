import css from 'blocks/config/css';
import grid from 'blocks/grid/grid.css';
import {jcss, isDesktop} from 'jcss';

const invColored = {
    backgroundColor: css.colors.white,
    color: css.colors.main
};
const colored = {
    backgroundColor: css.colors.main,
    color: css.colors.white
};
const lightColored = {
    backgroundColor: css.colors.lightMain,
    color: css.colors.black
};
const pointer = {
    cursor: 'pointer'
};
const relative = {
    position: 'relative'
};

const item = jcss({
    iBlock: {
        display: 'inline-block',
        verticalAlign: 'top'
    },
    centred: {
        ...grid.row,
        ...grid.center,
        ...grid.normalCenter
    },
    colored: {
        ...colored,
        ...pointer,
        '&:hover': isDesktop(invColored)
    },
    lightColored: {
        ...lightColored,
        ...pointer,
        '&:hover': isDesktop(invColored)
    },
    cover: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
    },
    invColored: {
        ...invColored,
        ...pointer,
        '&:hover': isDesktop(colored) 
    },
    pointer: pointer,
    notAllowed: {
        cursor: 'not-allowed'
    },
    arrow: {
        cursor: 'default'
    },
    borderMain: {
        border: `2px solid ${css.colors.main}`
    },
    borderWhite: {
        border: `2px solid ${css.colors.white}`
    },
    borderDotted: {
        border: `1px dotted ${css.colors.lightBlack}`
    },
    overNone: {
        overflow: 'hidden'
    },
    circle: {
        borderRadius: '50%'
    },
    rel: {
        position: 'relative'
    },
    abs: {
        position: 'absolute'
    },
    shadow: {
        'box-shadow': '0px 0px 8px 2px rgb(189, 201, 212)'
    },
    transition: {
        transition: `all ${css.transition.time} ease-in-out`
    },
    hidden: {visibility: 'hidden'},
    visible: {visibility: 'visible'},
    none: {display: 'none'},
    block: {display: 'block'},
    rounded: {
        borderRadius: 15
    },
    roundedTop: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    ...(() => {
        let zIndexes = {};

        for (let i = 1; i <= 5; i++) {
            zIndexes[`z${i}`] = {'z-index': 10*i, ...relative};
        }

        return zIndexes;
    })(),
    ...(() => {
        let opacities = {};

        for (let i = 0; i <= 20; i++) {
            opacities[`o${i*5}`] = {opacity: (i*5)/100};
        }

        return opacities;
    })()
});

export default item;
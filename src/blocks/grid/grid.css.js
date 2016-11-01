import css from 'blocks/config/css';
import {jcss} from 'jcss';

const flex = {
    display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex']
};
const grid = jcss({
    flex: flex,
    space: {
        '-ms-flex': '1 1 0.000000001px',
        '-webkit-flex': '1',
        '-webkit-box-flex': '1',
        'flex': '1'
    },
    row: {
        ...flex,
        '-ms-flex-direction': 'row',
        '-webkit-flex-direction': 'row',
        '-webkit-box-orient': 'horizontal',
        '-webkit-box-direction': 'normal',
        'flex-direction': 'row',
        '-webkit-flex-wrap': 'wrap',
        'flex-wrap': 'wrap',
        '-moz-flex-wrap': 'wrap'
    },
    col: {
        ...flex,
        '-ms-flex-direction': 'column',
        '-webkit-flex-direction': 'column',
        '-webkit-box-orient': 'vertical',
        '-webkit-box-direction': 'normal',
        'flex-direction': 'column'
    },
    justify: {
        '-ms-flex-pack': 'justify',
        '-webkit-justify-content': 'space-between',
        '-webkit-box-pack': 'justify',
        'justify-content': 'space-between'
    },
    center: {
        '-ms-flex-pack': 'center',
        '-webkit-justify-content': 'center',
        '-webkit-box-pack': 'center',
        'justify-content': 'center'
    },
    normalCenter: {
        '-ms-flex-align': 'center',
        '-webkit-align-items': 'center',
        '-webkit-box-align': 'center',
        'align-items': 'center'
    },
    hSeparator: {
        width: '100%',
        height: 0,
        borderBottom: `1px dotted ${css.colors.lightBlack}`
    },
    hSeparatorColored: {
        width: '100%',
        height: 0,
        borderBottom: `2px solid ${css.colors.main}`
    },
    ...(() => {
        let widths = {};

        for (let i = 0; i <= 20; i++) {
            widths[`w${i*5}`] = {width: `${i*5}%`};
        }

        return widths;
    })(),
    wAuto: {
        width: 'auto'  
    },
    ...(() => {
        const sides = [
            {shortName: 't', name: 'top'},
            {shortName: 'r', name: 'right'},
            {shortName: 'b', name: 'bottom'},
            {shortName: 'l', name: 'left'}
        ];
        let indents = {};

        css.indents.forEach((item) => {
            const upName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            
            indents[`m${upName}`] = {margin: item.indent};
            indents[`p${upName}`] = {padding: item.indent};

            sides.forEach((side) => {
                indents[`m${side.shortName}${upName}`] = {
                    [`margin-${side.name}`]: item.indent
                };

                indents[`p${side.shortName}${upName}`] = {
                    [`padding-${side.name}`]: item.indent
                };
            });
        });
        
        return indents;
    })()
});

export default grid;
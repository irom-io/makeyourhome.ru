import freeStyle from './freeStyle';
import css from 'blocks/config/css';
import mobile from 'ismobilejs';
let Style = freeStyle.create();

const isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);

export const renderStyles = () => {
    Style.inject();
};

export const jcss = (styles) => {
    let key;
    let exportStyles = {};

    for (key in styles) {
        if (styles.hasOwnProperty(key)) {
            exportStyles[key] = Style.registerStyle(styles[key], key);
            exportStyles[`${key}_tab`] = Style.registerStyle({[css.media.tab]: styles[key]}, key);
            exportStyles[`${key}_tabMini`] = Style.registerStyle({[css.media.tabMini]: styles[key]}, key);
            exportStyles[`${key}_mob`] = Style.registerStyle({[css.media.mob]: styles[key]}, key);
        }
    }

    return exportStyles;
};

export const isDesktop = (styles) => {
    if (mobile.any) {
        return null;
    } else {
        return styles;
    }
};

export const isIE = (styles) => {
    if (isIE11) {
        return styles;
    } else {
        return null;
    }
};

export default jcss;
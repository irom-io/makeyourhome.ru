import {getLang} from 'blocks/page/__lang/page__lang';
import objectPath from 'object-path';

import l10nMain from './__main/l10n__main.json';
import l10nMenu from './__menu/l10n__menu.json';

const l10n = {
    ...l10nMain,
    ...l10nMenu
};

const getTranslate = (key) => {
    const lang = getLang();

    let translate = objectPath.get(l10n, key);

    if (translate[lang]) {
        translate = translate[lang];
    } else {
        translate = 'no translate';
    }

    return translate;
};

export default getTranslate;
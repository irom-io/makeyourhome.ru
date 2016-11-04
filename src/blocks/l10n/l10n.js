import {getLang} from 'blocks/page/__lang/page__lang';
import objectPath from 'object-path';

import l10nMain from './__main/l10n__main.json';
import l10nMenu from './__menu/l10n__menu.json';
import l10nStyles from './__styles/l10n__styles';
import l10nCollections from './__collections/l10n__collections';
import l10nToggle from './__toggle/l10n__toggle.json';

const l10n = {
    ...l10nMain,
    ...l10nMenu,
    ...l10nStyles,
    ...l10nCollections,
    ...l10nToggle
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
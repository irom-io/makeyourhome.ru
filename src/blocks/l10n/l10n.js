import {getLang} from 'blocks/page/__lang/page__lang';
import objectPath from 'object-path';

import l10nMain from './__main/l10n__main.json';
import l10nMenu from './__menu/l10n__menu.json';
import l10nStyles from './__styles/l10n__styles.json';
import l10nCollections from './__collections/l10n__collections.json';

const l10n = {
    ...l10nMain,
    ...l10nMenu,
    ...l10nStyles,
    ...l10nCollections
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
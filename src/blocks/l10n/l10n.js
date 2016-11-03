import React from 'react';
import {getLang} from 'blocks/page/__lang/page__lang';
import objectPath from 'object-path';

import l10nMain from './__main/l10n__main.json';
import l10nMenu from './__menu/l10n__menu.json';

class L10n extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.getTranslate = this.getTranslate.bind(this);
        this.state = {
            l10n: {
                ...l10nMain,
                ...l10nMenu
            }
        };
    }
    getTranslate() {
        const p_ = this.props;
        const l10n = this.state.l10n;
        const lang = getLang();

        let translate = objectPath.get(l10n, p_.k);

        if (translate[lang]) {
            translate = translate[lang];
        } else {
            translate = 'no translate';
        }

        return translate;
    }
    render() {
        const translate = this.getTranslate();

        return (
            <span>{translate}</span>
        );
    }
}
L10n.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default L10n;
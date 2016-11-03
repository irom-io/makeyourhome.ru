import React from 'react';
import l10n from './l10n.json';
import {getLang} from 'blocks/page/__lang/page__lang';

class L10n extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.getTranslate = this.getTranslate.bind(this);
        this.state = {};
    }
    getTranslate() {
        const p_ = this.props;
        const lang = getLang();

        let translate = l10n[p_.k];

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
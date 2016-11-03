import React from 'react';
import l10n from './l10n.json';

let lang = 'ru';
export const getLang = () => {
    return lang;
};

class L10n extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.getTranslate = this.getTranslate.bind(this);
        this.state = {};
    }
    componentDidMount() {
        this.context.router.listen((route) => {
            lang = route.query.lang || lang;
        });
    }
    getTranslate() {
        const p_ = this.props;
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
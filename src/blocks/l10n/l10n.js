import React from 'react';
import l10n from './l10n.json';

class L10n extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            text: ''
        };
    }
    componentDidMount() {
        const self = this;
        const p_ = this.props;

        this.context.router.listen((route) => {
            let lang = route.query.lang || 'ru';
            let translate = l10n[p_.k];

            if (translate[lang]) {
                translate = translate[lang];
            } else {
                translate = 'no translate';
            }

            if (self.state.text !== translate) {
                self.setState({text: translate});
            }
        });
    }
    render() {
        const s_ = this.state;

        return (
            <span>{s_.text}</span>
        );
    }
}
L10n.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default L10n;
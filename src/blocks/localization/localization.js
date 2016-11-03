import React from 'react';
import localization from './localization.json';

class Localization extends React.Component {
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
            let translate = localization[p_.k];

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
Localization.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Localization;
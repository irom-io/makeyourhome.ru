import React from 'react';

let lang = 'ru';
export const getLang = () => {
    return lang;
};

class PageLang extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.context.router.listen((route) => {
            lang = route.query.lang || lang;
        });
        this.state = {};
    }
    render() {
        return (
            <span />
        );
    }
}
PageLang.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default PageLang;
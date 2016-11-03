import React from 'react';
import lang from './lang.css';
import grid from 'blocks/grid/grid.css';
import Link from 'blocks/link/link';
import queryString from 'query-string';

class Lang extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            items: [
                {name: 'Ru', key: 'ru'},
                {name: 'Esp', key: 'esp'},
                {name: 'En', key: 'en'}
            ]
        };
    }
    createHref(lang) {
        let current = '';
        const location = this.props.location;
        const query = location.query;
        let key;
        let newQuery = {lang: lang};

        if (location.pathname[0] !== '/') {
            current = `/${location.pathname}`;
        } else {
            current = `${location.pathname}`;
        }

        for (key in query) {
            if (query.hasOwnProperty(key) && key !== 'lang') {
                newQuery[key] = query[key];
            }
        }

        current = `${current}?${queryString.stringify(newQuery)}`;

        return current;
    }
    render() {
        const active = this.props.location.query.lang || 'ru';
        const s_ = this.state;

        return (
            <div className={lang.wrapper}>
                <div className={grid.row}>
                    {s_.items.map((item, index) => {
                        return (
                            <div
                                key={`lang__item_${index}`}
                                className={(active === item.key)? lang.active : lang.item}
                            >
                                <Link
                                    to={this.createHref(item.key)}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
Lang.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Lang;
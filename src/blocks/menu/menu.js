import React from 'react';
import Link from 'blocks/link/link';
import {Input} from 'blocks/text/_edit/text_edit';
import L10n from 'blocks/l10n/l10n';
import MenuButton from 'blocks/menu/__button/menu__button';
import {getLang} from 'blocks/page/__lang/page__lang';
import {createHref} from 'blocks/lang/lang';

import menu from './menu.css';
import item from 'blocks/item/item.css';

export const styleList = [
    {name: 'modern', to: '/projects?style=modern'},
    {name: 'classic', to: '/projects?style=classic'},
    {name: 'countryside', to: '/projects?style=countryside'},
    {name: 'european', to: '/projects?style=european'},
    {name: 'american', to: '/projects?style=american'},
    {name: 'wooden', to: '/projects?style=wooden'},
    {name: 'bungalow', to: '/projects?style=bungalow'}
];

export const collectionList = [
    {name: 'house', to: '/projects?collection=house'},
    {name: 'bath', to: '/projects?collection=bath'},
    {name: 'garage', to: '/projects?collection=garage'},
    {name: 'recreation', to: '/projects?collection=recreation'},
    {name: 'cabin', to: '/projects?collection=cabin'},
    {name: 'other', to: '/projects?collection=other'}
];

export const numberList = [
    {name: 'zero'},
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
    {name: 'four'},
    {name: 'five'},
    {name: 'six'}
];

export const additionList = [
    {name: 'withoutAdditions'},
    {name: 'mirroredVersion'},
    {name: 'сostEstimates'},
    {name: 'locationLighting'},
    {name: 'locationFurniture'},
    {name: 'connectionPlumbing'},
    {name: 'consultation'}
];

class Menu extends React.Component {
    constructor(p_, context) {
        super(p_, context);
        const items = [
            {
                name: 'catalog',
                to: '/projects'
            },
            {
                name: 'styles',
                to: '/styles',
                subItems: styleList
            },
            {
                name: 'collections',
                to: '/collections',
                subItems: collectionList
            },
            {
                name: 'questions',
                to: 'questions'
            },
            {
                name: 'posts',
                to: 'posts'
            },
            {
                name: 'favorites',
                to: 'favourite'
            }
        ];

        this.state = {
            search: p_.location.query.search || '',
            isShowMenu: false,
            items: items,
            itemsMob: [{name: 'home', to: '/'}, ...items]
        };
    }
    componentWillReceiveProps(p_) {
        this.setState({search: p_.location.query.search || ''});
    }
    onChangeSearch(value) {
        const p_ =this.props;
        let href;

        if (p_.location.pathname === '/projects') {
            href = createHref({search: value}, p_.location);
            this.context.router.push(href);
        } else {
            this.setState({search: value});
        }
    }
    onClickMobile() {
        this.setState({isShowMenu: !this.state.isShowMenu});
    }
    onClickOutsideMobile() {
        this.setState({isShowMenu: false});
    }
    onSubmit(e) {
        const p_ =this.props;
        const lang = getLang();
        let href;
        e.preventDefault();

        if (p_.location.pathname !== '/projects') {
            href = `/projects?lang=${lang}&search=${this.state.search}`;
        } else {
            href = createHref({search: this.state.search}, p_.location);
        }

        this.context.router.push(href);
    }
    render() {
        const s_ = this.state;

        return (
            <div className={menu.wrapper}>
                <div className={menu.content}>
                    <form
                        className={menu.search}
                        onSubmit={(e) => this.onSubmit(e)}
                    >
                        <Input
                            placeholder={L10n('menu.searchPlaceholder')}
                            value={s_.search}
                            onChange={(value) => this.onChangeSearch(value)}
                        />
                    </form>

                    <ul className={menu.items}>
                        {s_.items.map((item, index) => {
                            return (
                                <li key={`menu__item-${index}`} className={menu.item}>
                                    <Link
                                        to={item.to}
                                        activeClassName="menu_active"
                                    >
                                        {L10n(`menu.${item.name}`)}
                                    </Link>
                                    {item.subItems &&
                                    <ul>
                                        {item.subItems.map((subItem, subIndex) => {
                                            return (
                                                <li key={`menu__item-${index}${subIndex}`} className={menu.item}>
                                                    <Link
                                                        to={subItem.to}
                                                        activeClassName="menu_active"
                                                    >
                                                        {L10n(`${item.name}.${subItem.name}`)}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    }
                                </li>
                            );
                        })}
                    </ul>

                    <MenuButton
                        onClick={() => this.onClickMobile()}
                        onClickOutside={() => this.onClickOutsideMobile()}
                    />

                    <ul
                        className={`${menu.itemsMob} ${s_.isShowMenu? item.visible : item.hidden}`}
                    >
                        {s_.itemsMob.map((item, index) => {
                            return (
                                <li key={`menu__item-${index}`} className={menu.item}>
                                    <Link
                                        to={item.to}
                                        activeClassName="menu_active"
                                    >
                                        {L10n(`menu.${item.name}`)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Menu;
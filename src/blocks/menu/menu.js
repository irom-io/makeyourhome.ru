import React from 'react';
import menu from './menu.css';
import Link from 'blocks/link/link';
import {Input} from 'blocks/text/_edit/text_edit';
import L10n from 'blocks/l10n/l10n';

class Menu extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            isShowMenu: false,
            items: [
                {
                    name: 'catalog',
                    to: '/projects'
                },
                {
                    name: 'styles',
                    to: '/styles',
                    subItems: [
                        {name: 'modern', to: '/projects?style=modern'},
                        {name: 'classic', to: '/projects?style=classic'},
                        {name: 'countryside', to: '/projects?style=countryside'},
                        {name: 'european', to: '/projects?style=european'},
                        {name: 'american', to: '/projects?style=american'},
                        {name: 'wooden', to: '/projects?style=wooden'},
                        {name: 'bungalow', to: '/projects?style=bungalow'}
                    ]
                },
/*                {
                    name: 'collections',
                    to: '/collections',
                    subItems: [
                        {name: 'Жилой дом', to: '/projects?collection=houses'},
                        {name: 'Баня', to: '/projects?collection=bath'},
                        {name: 'Гараж', to: '/projects?collection=garages'},
                        {name: 'Для отдыха', to: '/projects?collection=recreation'},
                        {name: 'Беседка', to: '/projects?collection=cabin'},
                        {name: 'Разное', to: '/projects?collection=other'}
                    ]
                },*/
                {
                    name: 'questions',
                    to: 'questions'
                },
                {
                    name: 'blog'
                },
                {
                    name: 'favorites'
                }
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={menu.wrapper}>
                <div className={menu.content}>
                    <div className={menu.search}>
                        <Input
                            placeholder={L10n('menu.searchPlaceholder')}
                        />
                    </div>

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

                    <div className={menu.button}>
                        <div className={menu.buttonContent}>
                            <div className={menu.line}></div>
                            <div className={menu.line}></div>
                            <div className={menu.line}></div>
                        </div>
                    </div>

                    {s_.isShowMenu &&
                    <ul className={menu.itemsMob}>
                        {s_.items.map((item, index) => {
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
                    }
                </div>
            </div>
        );
    }
}

export default Menu;
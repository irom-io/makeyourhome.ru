import React from 'react';
import menu from './menu.css';
import Link from 'blocks/link/link';
import {Input} from 'blocks/text/_edit/text_edit';

class Menu extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            isShowMenu: false,
            items: [
                {
                    name: 'Каталог',
                    to: 'projects'
                },
                {
                    name: 'Стили',
                    to: 'styles',
                    subItems: [
                        {name: 'Современный', to: '/projects?style=modern'},
                        {name: 'Классический', to: '/projects?style=classic'},
                        {name: 'Дачный', to: '/projects?style=countryside'},
                        {name: 'Европейский', to: '/projects?style=european'},
                        {name: 'Американский', to: '/projects?style=american'},
                        {name: 'Деревянный', to: '/projects?style=wooden'},
                        {name: 'Бунгало', to: '/projects?style=bungalow'}
                    ]
                },
                {
                    name: 'Коллекции',
                    to: 'collections',
                    subItems: [
                        {name: 'Жилой дом', to: '/projects?collection=houses'},
                        {name: 'Баня', to: '/projects?collection=bath'},
                        {name: 'Гараж', to: '/projects?collection=garages'},
                        {name: 'Для отдыха', to: '/projects?collection=recreation'},
                        {name: 'Беседка', to: '/projects?collection=cabin'},
                        {name: 'Разное', to: '/projects?collection=other'}
                    ]
                },
                {
                    name: 'Вопрос-ответ',
                    to: 'questions'
                },
                {
                    name: 'Блог'
                },
                {
                    name: 'Избранное'
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
                            placeholder="Поиск проектов"
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
                                        {item.name}
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
                                                        {subItem.name}
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
                                        {item.name}
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
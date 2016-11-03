import React from 'react';
import Link from 'blocks/link/link';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import mainToggle from './main__toggle.css';

class MainToggle extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            tabs: [
                {key: 'ready'},
                {key: 'individual'}
            ],
            ready: [
                {key: 'Выберите проект дома'},
                {key: 'Заполните форму покупки'},
                {key: 'Подготовка проекта дома'},
                {key: 'Сдача проекта'}
            ],
            individual: [
                {key: 'Расскажите о своей идее'},
                {key: 'Мы создаем проект'},
                {key: 'Прием проекта'}
            ],
            active: 'ready'
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div>
                <div className={grid.row}>
                    {s_.tabs.map((tab, index) => {
                        return (
                            <div
                                key={`mainToggle__tab_${index}`}
                                className={(tab.key === s_.active)? mainToggle.active : mainToggle.tab}
                                onClick={() => this.setState({active: tab.key})}
                            >
                                {L10n(`toggle.${tab.key}`)}
                            </div>
                        )
                    })}
                </div>
                <div className={mainToggle.content}>
                    {s_[s_.active].map((item, index) => {
                        return (
                            <Link className={mainToggle.item} key={`mainToggle__item_${index}`}>
                                <div className={mainToggle.text}>
                                    {item.key}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MainToggle;
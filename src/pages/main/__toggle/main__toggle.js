import React from 'react';
import Link from 'blocks/link/link';
import grid from 'blocks/grid/grid.css';
import mainToggle from './main__toggle.css';

class MainToggle extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {text: 'Выберите проект дома'},
                {text: 'Заполните форму покупки'},
                {text: 'Подготовка проекта дома'},
                {text: 'Сдача проекта'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div>
                <div className={grid.row}>
                    <Link className={mainToggle.active}>
                        Готовые проекты домов
                    </Link>
                    <Link className={mainToggle.tab}>
                        Индивидуальные проекты
                    </Link>
                </div>
                <div className={mainToggle.content}>
                    {s_.items.map((item, index) => {
                        return (
                            <Link className={mainToggle.item} key={`mainToggle__item_${index}`}>
                                <div className={mainToggle.text}>
                                    {item.text}
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
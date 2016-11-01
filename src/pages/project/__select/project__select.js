import React from 'react';
import Select from 'blocks/select/select';

import grid from 'blocks/grid/grid.css';
import projectSelect from './project__select.css';

class ProjectSelect extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 1, label: 'Проект в PDF'}, {value: 0, label: 'Без PDF версии'}]}
                        searchable={false}
                        value={1}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 2, label: '2 печатные копии'}, {value: 3, label: '3 печатные копии'}, {value: 4, label: '4 печатные копии'}]}
                        searchable={false}
                        value={2}
                    />
                    <div className={projectSelect.subText}>Что включено?</div>
                </div>
                <div className={grid.mbMini}>
                    <Select
                        placeholder="Дополнительно"
                        options={[{value: 1, label: 'Зеркальный вариант'}, {value: 2, label: 'Индивидуальные цвета'}, {value: 3, label: 'Вариации планировки'}]}
                        searchable={false}
                        value={false}
                    />
                    <div className={projectSelect.subText}>Какие возможности?</div>
                </div>
                <div className={projectSelect.priceWrapper}>
                    Итого: <span className={projectSelect.price}>3000</span> р.
                </div>
            </div>
        )
    }
}

export default ProjectSelect;
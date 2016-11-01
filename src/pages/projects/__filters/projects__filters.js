import React from 'react';
import Range from 'blocks/range/range';
import Select from 'blocks/select/select';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import projects from 'pages/projects/projects.css';

class ProjectsFilters extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            collections: [
                {value: 'houses', label: 'Жилые дома'},
                {value: 'bath', label: 'Бани'},
                {value: 'garages', label: 'Гаражи'},
                {value: 'recreation', label: 'Для отдыха'},
                {value: 'cabin', label: 'Беседки'},
                {value: 'other', label: 'Разное'}
            ],
            styles: [
                {value: 'modern', label: 'Современные'},
                {value: 'classic', label: 'Классические'},
                {value: 'countryside', label: 'Дачные'},
                {value: 'european', label: 'Европейские'},
                {value: 'american', label: 'Американские'},
                {value: 'wooden', label: 'Деревянные'},
                {value: 'bungalow', label: 'Бунгало'}
            ],
            floors: [
                {value: 1, label: 'Один этаж'},
                {value: 2, label: 'Два этажа'},
                {value: 3, label: 'Три этажа'},
                {value: 4, label: 'Четыре этажа'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div>
                <div className={projects.filters}>
                    <div className={projects.filter}>
                        <Select
                            placeholder="Тип здания"
                            options={s_.collections}
                        />
                    </div>
                    <div className={projects.filter}>
                        <Select
                            placeholder="Стиль"
                            options={s_.styles}
                        />
                    </div>
                    <div className={projects.filter}>
                        <Select
                            placeholder="Этажность"
                            options={s_.floors}
                        />
                    </div>
                </div>

                <div className={`${grid.mbMicro} ${text.mdPlus}`}>Площадь, м<sup className={text.micro}>2</sup></div>

                <div>
                    <Range
                        range
                        min={15}
                        max={300}
                        defaultValue={[25, 120]}
                    />
                </div>
            </div>
        )
    }
}

export default ProjectsFilters;
import React from 'react';
import Range from 'blocks/range/range';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';
import {styleList, collectionList} from 'blocks/menu/menu';

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
        const styles = styleList.map((style) => {return {value: style.name, label: L10n(`styles.${style.name}`)}});
        const collections = collectionList.map((type) => {return {value: type.name, label: L10n(`collections.${type.name}`)}});

        return (
            <div>
                <div className={projects.filters}>
                    <div className={projects.filter}>
                        <Select
                            placeholder={L10n('project.type')}
                            searchable={false}
                            options={collections}
                        />
                    </div>
                    <div className={projects.filter}>
                        <Select
                            placeholder={L10n('project.style')}
                            options={styles}
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
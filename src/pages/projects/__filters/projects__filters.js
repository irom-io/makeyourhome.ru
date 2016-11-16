import React from 'react';
import Range from 'blocks/range/range';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';
import {styleList, collectionList, numberList} from 'blocks/menu/menu';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import projects from 'pages/projects/projects.css';

class ProjectsFilters extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const styles = styleList.map((style) => {return {value: style.name, label: L10n(`styles.${style.name}`)}});
        const collections = collectionList.map((type) => {return {value: type.name, label: L10n(`collections.${type.name}`)}});
        const floors = numberList.map((number) => {return {value: number.name, label: L10n(`project.floors.${number.name}`)}});

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
                            placeholder={L10n('project.floorsText')}
                            options={floors}
                        />
                    </div>
                </div>

                <div className={`${grid.mbMicro} ${text.mdPlus}`}>{L10n('project.area')}, м<sup className={text.micro}>2</sup></div>

                <div>
                    <Range
                        range
                        min={15}
                        max={3000}
                        defaultValue={[15, 500]}
                    />
                </div>
            </div>
        )
    }
}

export default ProjectsFilters;
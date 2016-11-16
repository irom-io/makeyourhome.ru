import React from 'react';
import Range from 'blocks/range/range';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';
import {styleList, collectionList, numberList} from 'blocks/menu/menu';
import {createHref} from 'blocks/lang/lang';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import projects from 'pages/projects/projects.css';

class ProjectsFilters extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
    }
    onSelect(selected, field) {
        const p_ = this.props;
        let href = '';

        if (selected) {
            href = createHref({[field]: selected.value}, p_.location);
        } else {
            href = createHref({[field]: null}, p_.location);
        }

        this.context.router.push(href);
    }
    onChangeRange(range) {
        const p_ = this.props;
        let href;

        href = createHref({min: range[0], max: range[1]}, p_.location);
        this.context.router.push(href);
    }
    render() {
        const p_ = this.props;
        const styles = styleList.map((style) => {return {value: style.name, label: L10n(`styles.${style.name}`)}});
        const collections = collectionList.map((type) => {return {value: type.name, label: L10n(`collections.${type.name}`)}});
        const floors = numberList.map((number) => {return {value: number.name, label: L10n(`project.floors.${number.name}`)}});

        const min = 1*p_.location.query.min || 15;
        const max = 1*p_.location.query.max || 500;

        return (
            <div>
                <div className={projects.filters}>
                    <div className={projects.filter}>
                        <Select
                            placeholder={L10n('project.type')}
                            searchable={false}
                            options={collections}
                            value={p_.location.query.collection}
                            onChange={(selected) => this.onSelect(selected, 'collection')}
                        />
                    </div>
                    <div className={projects.filter}>
                        <Select
                            placeholder={L10n('project.style')}
                            searchable={false}
                            options={styles}
                            value={p_.location.query.style}
                            onChange={(selected) => this.onSelect(selected, 'style')}
                        />
                    </div>
                    <div className={projects.filter}>
                        <Select
                            placeholder={L10n('project.floorsText')}
                            searchable={false}
                            options={floors}
                            value={p_.location.query.floor}
                            onChange={(selected) => this.onSelect(selected, 'floor')}
                        />
                    </div>
                </div>

                <div className={`${grid.mbMicro} ${text.mdPlus}`}>{L10n('project.area')}, м<sup className={text.micro}>2</sup></div>

                <div>
                    <Range
                        range
                        min={15}
                        max={3000}
                        defaultValue={[min, max]}
                        onAfterChange={(range) => this.onChangeRange(range)}
                    />
                </div>
            </div>
        )
    }
}
ProjectsFilters.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProjectsFilters;
import React from 'react';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import projectSelect from './project__select.css';

class ProjectSelect extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            pdf: 'withPdf',
            printed: 'two',
            addition: []
        };
        this.props.onSelect(this.state);
    }
    getAdditionOptions(p_) {
        let key;
        let additionOptions = [];

        for (key in p_.project.addition) {
            if (p_.project.addition.hasOwnProperty(key)) {
                additionOptions.push({value: key, label: L10n(`project.additions.${key}`)})
            }
        }

        return additionOptions;
    }
    componentWillReceiveProps(p_) {
        if (p_.project.id !== this.props.project.id) {
            this.setState({
                pdf: 'withPdf',
                printed: 'two',
                addition: []
            });
        }
    }
    onChange(selected, type) {
        if (type === 'addition') {
            let addition = [];
            selected.forEach((selectedItem) => {
                addition.push(selectedItem.value);
            });
            this.setState({
                addition: addition
            }, () => {
                this.props.onSelect(this.state);
            });
        } else {
            this.setState({[type]: selected.value}, () => {
                this.props.onSelect(this.state);
            });
        }
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        const additionOptions = this.getAdditionOptions(p_);

        return (
            <div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 'withoutPdf', label: L10n('project.withoutPdf')}, {value: 'withPdf', label: L10n('project.withPdf')}]}
                        searchable={false}
                        value={s_.pdf}
                        clearable={false}
                        onChange={(selected) => this.onChange(selected, 'pdf')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 'zero', label: L10n('project.printed.zero')}, {value: 'two', label: L10n('project.printed.two')}, {value: 'four', label: L10n('project.printed.four')}, {value: 'six', label: L10n('project.printed.six')}]}
                        searchable={false}
                        clearable={false}
                        value={s_.printed}
                        onChange={(selected) => this.onChange(selected, 'printed')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        placeholder={L10n('project.additions.text')}
                        options={additionOptions}
                        searchable={false}
                        clearable={false}
                        multi={true}
                        value={s_.addition}
                        onChange={(selected) => this.onChange(selected, 'addition')}
                    />
                </div>
                <div className={projectSelect.priceWrapper}>
                    {L10n('project.total')}: <span className={projectSelect.price}>123</span> р.
                </div>
            </div>
        )
    }
}

export default ProjectSelect;
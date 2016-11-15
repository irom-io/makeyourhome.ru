import React from 'react';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import projectSelect from './project__select.css';

class ProjectSelect extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            pdf: p_.pdf,
            printed: p_.printed,
            addition: p_.addition,
            additionSum: 0
        };
    }
    componentWillReceiveProps(p_) {
        this.setState({
            pdf: p_.pdf,
            printed: p_.printed,
            addition: p_.addition
        });
    }
    getAdditionOptions(p_) {
        let key;
        let additionOptions = [];

        for (key in p_.project.addition) {
            if (p_.project.addition.hasOwnProperty(key)) {
                additionOptions.push({value: 1*p_.project.addition[key], label: L10n(`project.additions.${key}`)})
            }
        }

        return additionOptions;
    }
    onChange(selected, type) {
        let value = 0;
        if (type === 'additionSum') {
            selected.forEach((selectedItem) => {
                value += selectedItem.value;
            });
            this.setState({
                addition: selected,
                additionSum: value
            }, () => {
                this.props.onSelect({...this.state, total: this.getTotal(this.state)})
            });
        } else {
            this.setState({[type]: selected}, () => {
                this.props.onSelect({...this.state, total: this.getTotal(this.state)})
            });
        }
    }
    getTotal(s_) {
        return s_.pdf.value + s_.printed.value + s_.additionSum;
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        const additionOptions = this.getAdditionOptions(p_);
        const total = this.getTotal(s_);

        return (
            <div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 0, label: L10n('project.withoutPdf')}, {value: 1*p_.project.pdfCoast, label: L10n('project.withPdf')}]}
                        searchable={false}
                        value={s_.pdf}
                        clearable={false}
                        onChange={(selected) => this.onChange(selected, 'pdf')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 0, label: L10n('project.printed.zero')}, {value: 2*p_.project.printedCoast, label: L10n('project.printed.two')}, {value: 4*p_.project.printedCoast, label: L10n('project.printed.four')}, {value: 6*p_.project.printedCoast, label: L10n('project.printed.six')}]}
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
                        onChange={(selected) => this.onChange(selected, 'additionSum')}
                    />
                </div>
                <div className={projectSelect.priceWrapper}>
                    {L10n('project.total')}: <span className={projectSelect.price}>{total}</span> р.
                </div>
            </div>
        )
    }
}

export default ProjectSelect;
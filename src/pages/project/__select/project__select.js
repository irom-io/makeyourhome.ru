import React from 'react';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import projectSelect from './project__select.css';

class ProjectSelect extends React.Component {
    constructor(p_) {
        super(p_);
        let key;
        let additionOptions = [];

        for (key in p_.project.addition) {
            if (p_.project.addition.hasOwnProperty(key)) {
                additionOptions.push({value: p_.project.addition[key], label: L10n(`project.additions.${key}`)})
            }
        }

        this.state = {
            pdf: p_.project.pdfCoast,
            printed: 2*p_.project.printedCoast,
            addition: 0,
            additionOptions: additionOptions
        };
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        return (
            <div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 0, label: L10n('project.withoutPdf')}, {value: p_.project.pdfCoast, label: L10n('project.withPdf')}]}
                        searchable={false}
                        value={s_.pdf}
                        clearable={false}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: 0, label: L10n('project.printed.zero')}, {value: 2*p_.project.printedCoast, label: L10n('project.printed.two')}, {value: 4*p_.project.printedCoast, label: L10n('project.printed.four')}, {value: 6*p_.project.printedCoast, label: L10n('project.printed.six')}]}
                        searchable={false}
                        clearable={false}
                        value={s_.printed}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Select
                        placeholder={L10n('project.additions.text')}
                        options={s_.additionOptions}
                        searchable={false}
                        clearable={false}
                        value={s_.addition}
                        multi={true}
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
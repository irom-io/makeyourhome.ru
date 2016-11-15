import React from 'react';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import projectSelect from './project__select.css';

class ProjectSelect extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            pdf: p_.project.pdfCoast,
            printed: 2*p_.project.printedCoast
        };
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        return (
            <div>
                <div className={grid.mbMini}>
                    <Select
                        options={[{value: p_.project.pdfCoast, label: L10n('project.withPdf')}, {value: 0, label: L10n('project.withoutPdf')}]}
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
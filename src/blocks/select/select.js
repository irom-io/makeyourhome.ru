import React from 'react';
import 'react-select/dist/react-select.css';
import ReactSelect from 'react-select';
import select from './select.css';

class Select extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            value: p_.value || null
        };
    }
    onChange(selected) {
        this.setState({value: selected})
    }
    render() {
        const s_ = this.state;
        let p_ = {...this.props};

        p_.onChange = (value) => this.onChange(value);
        p_.className = p_.className? `${select.item} ${p_.className}` : `${select.item}`;
        p_.value = s_.value;

        return (
            <ReactSelect
                {...p_}
            />
        );
    }
}
Select.defaultProps = {
    options: [],
    placeholder: '',
    noResultsText: 'Ничего не найдено'
};

export default Select;
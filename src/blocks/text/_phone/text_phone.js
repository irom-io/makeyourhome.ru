import React from 'react';
import Phone, { isValidPhoneNumber } from 'react-phone-number-input';
import L10n from 'blocks/l10n/l10n';

import textEdit from 'blocks/text/_edit/text_edit.css';

export class TextPhone extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            phone: p_.phone
        };
    }
    onChange(phone) {
        this.setState({phone});
        
        if (isValidPhoneNumber(phone)) {
            this.props.onChange(phone);
        }
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;
        const className = p_.className? `${textEdit.input} ${p_.className}` : textEdit.input;

        return (
            <Phone
                placeholder={L10n('enterPhone')}
                value={s_.phone}
                onChange={ phone => this.onChange(phone) }
                className={className}
            />
        );
    }
}
TextPhone.defaultProps = {
    phone: ''
};

export default TextPhone;
import React from 'react';
import textEdit from './text_edit.css';

export class Input extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    onChange() {
        const value = this.refs.input.value;
        this.props.onChange(value);
    }
    render() {
        const p_ = this.props;
        const className = p_.className? `${textEdit.input} ${p_.className}` : textEdit.input;

        return (
            <input
                ref="input"
                type={p_.type}
                className={className}
                value={p_.value}
                placeholder={p_.placeholder}
                onChange={() => this.onChange()}
            />
        );
    }
}

Input.defaultProps = {
    type: 'text'
};

export class Textarea extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    onChange() {
        const value = this.refs.textarea.value;
        this.props.onChange(value);
    }
    render() {
        const p_ = this.props;
        const className = p_.className? `${textEdit.textarea} ${p_.className}` : textEdit.textarea;

        return (
            <textarea
                ref="textarea"
                className={className}
                value={p_.value}
                placeholder={p_.placeholder}
                onChange={() => this.onChange()}
            />
        );
    }
}

Textarea.defaultProps = {
    rows: 3
};
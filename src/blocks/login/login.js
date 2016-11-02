import React from 'react';
import grid from 'blocks/grid/grid.css';
import LoginAuth from 'blocks/login/__auth/login__auth';

class Login extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            type: p_.type,
            errorMsg: null
        };
    }
    onResponse(response) {
        const p_ = this.props;

        if (response.error) {
            this.setState({errorMsg: response.error.msg})
        }

        p_.onResponse(response);
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;
        
        return (
            <div className={grid.w100}>
                {s_.errorMsg &&
                <div className={grid.mbMini}>
                    {s_.errorMsg}
                </div>
                }

                {(s_.type === 'auth') &&
                <LoginAuth
                    onSubmit={p_.onSubmit}
                    onResponse={(response) => this.onResponse(response)}
                />
                }
            </div>
        );
    }
}
Login.defaultProps = {
    type: 'auth'
};

export default Login;
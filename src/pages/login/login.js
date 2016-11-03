import React from 'react';
import BlockLogin from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import grid from 'blocks/grid/grid.css';

class Login extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false
        };
    }
    componentDidMount() {
        let user = localStorage.getItem('user');

        if (user) {
            this.context.router.push('/projects');
        }
    }
    onResponseAuth(response) {
        this.setState({loading: false});

        if (!response.error) {
            this.context.router.push('/projects');
        }
    }
    onResponseRegistration() {
        this.setState({loading: false});
    }
    render() {
        const s_ = this.state;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
                className={`${grid.col} ${grid.center} ${grid.normalCenter}`}
            >
                <div className={`${grid.w65} ${grid.w100_tabMini}`}>
                    <BlockLogin
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.onResponseRegistration(response)}
                    />
                </div>
            </Layout>
        );
    }
}
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;
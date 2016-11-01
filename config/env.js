var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
    return Object
        .keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce((env, key) => {
            env['process.env.' + key] = JSON.stringify(process.env[key]);
            return env;
        }, {
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'
            ),
            'process.env.PUBLIC_URL': JSON.stringify(publicUrl)
        });
}

module.exports = getClientEnvironment;
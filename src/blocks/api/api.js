const fetchInit = (url, methodName, data) => {
    let method = methodName.toUpperCase();
    let props = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: method
    };
    
    if (method !== 'GET') {
        props['body'] = JSON.stringify(data);
    }

    return fetch(`/api/${url}`, props)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return {error: {msg: 'serverError'}};
            }
        })
};

export default {
    post: (url, data) => {
        return fetchInit(url, 'POST', data);
    }  
};
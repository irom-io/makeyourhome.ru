import React from 'react';
import Dropzone from 'react-dropzone';
import Reactangle from 'blocks/rectangle/rectangle';
import Upload from 'react-icons/lib/md/vertical-align-top';
import request from 'superagent';

import adminLoader from './admin__loader.css';

class AdminLoader extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
    }
    onDrop(acceptedFiles) {
        let req = request.post('/api/upload');
        acceptedFiles.forEach((file)=> {
            req.attach('images', file);
        });
        req.end(() => {
            console.log('done');
        });
    }
    render() {
        return (
            <div>
                <Dropzone
                    onDrop={(files) => this.onDrop(files)}
                    className={`${adminLoader.area}`}
                    activeClassName={`${adminLoader.active}`}
                    accept="image/*"
                >
                    <Reactangle className={adminLoader.inner} width={4} height={1}>
                        <Upload size={32} />
                    </Reactangle>
                </Dropzone>
            </div>
        );
    }
}
AdminLoader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminLoader;
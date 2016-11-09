import React from 'react';
import Dropzone from 'react-dropzone';
import Reactangle from 'blocks/rectangle/rectangle';
import Upload from 'react-icons/lib/md/vertical-align-top';
import api from 'blocks/api/api';

import adminLoader from './admin__loader.css';

class AdminLoader extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
    }
    onDrop(files) {
        let formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });

        api.post('upload', formData)
            .then((response) => {
                console.log(response)
            })
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
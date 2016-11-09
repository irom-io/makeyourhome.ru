import React from 'react';
import Dropzone from 'react-dropzone';
import Reactangle from 'blocks/rectangle/rectangle';
import Upload from 'react-icons/lib/md/vertical-align-top';
import SortableImage from 'blocks/sortable/_image/sortable_image';

import grid from 'blocks/grid/grid.css';
import adminLoader from './admin__loader.css';

class AdminLoader extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            items: [
                '7af44fb0334dd45ba501baf571da31ca.jpg',
                '46ba9c8d978d55838ffb7a6467a6ae4f.jpg',
                '9703ef88aaba23e11fdf5790c89f24c3.jpg'
            ]
        };
    }
    onDrop(files) {
        const self = this;
        let formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`images`, file);
        });

        let user = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user)
        } else {
            user = {};
        }
        formData.append('user', JSON.stringify(user));

        fetch('/api/upload', {
            method: 'post',
            body: formData
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return {error: {msg: 'serverError'}};
            }
        })
        .then((items) => {
            this.setState({items: [...self.state.items, ...items]});
        });
    }
    onUpdate(items) {
        this.setState({items: items});
    }
    render() {
        const s_ = this.state;

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

                <div className={grid.mtMini}>
                    <SortableImage
                        onUpdate={(items) => this.onUpdate(items)}
                        items={s_.items}
                    />
                </div>
            </div>
        );
    }
}
AdminLoader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminLoader;
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
            items: p_.images
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
            let newItems = [...self.state.items, ...items];
            
            this.setState({items: newItems});
            this.props.onUpdate(newItems);
        });
    }
    onUpdate(items) {
        this.setState({items: items});
        this.props.onUpdate(items);
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
AdminLoader.defaultProps = {
    images: []
};
AdminLoader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminLoader;
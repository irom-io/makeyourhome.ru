import React from 'react';
import Dropzone from 'react-dropzone';
import Reactangle from 'blocks/rectangle/rectangle';
import Upload from 'react-icons/lib/md/vertical-align-top';
import {Tile, TileWrapper} from 'blocks/tile/tile';

import grid from 'blocks/grid/grid.css';
import adminLoader from './admin__loader.css';

class AdminLoader extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
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
        .then((response) => {
            self.props.onLoad(response);
        });
    }
    render() {
        const p_ = this.props;

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

                {p_.images &&
                <div className={grid.mtMini}>
                    <TileWrapper>
                        {p_.images.map((image, index) => {
                            return (
                                <Tile
                                    key={`adminLoaderImage__${index}`}
                                    src={`http://localhost:8081/images/${image}`}
                                />
                            );
                        })}
                    </TileWrapper>
                </div>
                }
            </div>
        );
    }
}
AdminLoader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminLoader;
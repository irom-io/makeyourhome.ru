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

        this.state = {
            images: []
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
        .then((images) => {
            this.setState({images: [...self.state.images, ...images]});
        });
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

                {(s_.images.length > 0) &&
                <div className={grid.mtMini}>
                    <TileWrapper>
                        {s_.images.map((image, index) => {
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
import React from 'react';
import Link from 'blocks/link/link';
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import projectImage from './project__image.css';
import grid from 'blocks/grid/grid.css';

class ProjectImage extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {images: [
            require('pages/project/images/1/1.jpg'),
            require('pages/project/images/1/2.jpg'),
            require('pages/project/images/1/3.jpg'),
            require('pages/project/images/1/4.jpg'),
            require('pages/project/images/1/5.jpg')
        ]};
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        return (
            <div>
                <Link
                    className={projectImage.back}
                    to={`/projects/${p_.projectId}`}
                >
                    <div>
                        <ArrowLeft size={36} />
                    </div>
                    <div>
                        Вернуться к проекту
                    </div>
                </Link>
                <img
                    className={grid.w100}
                    alt=""
                    src={s_.images[p_.imageId]}
                />
            </div>
        )
    }
}

export default ProjectImage;
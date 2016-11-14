import React from 'react';
import Link from 'blocks/link/link';
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import {createSrc} from 'blocks/item/item';
import L10n from 'blocks/l10n/l10n';

import projectImage from './project__image.css';
import grid from 'blocks/grid/grid.css';

class ProjectImage extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
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
                        {L10n('back')}
                    </div>
                </Link>
                <img
                    className={grid.w100}
                    alt=""
                    src={createSrc(p_.images[p_.imageId])}
                />
            </div>
        )
    }
}

export default ProjectImage;
import React from 'react';
import ProjectsShare from 'pages/projects/__share/projects__share';
import Favorite from 'react-icons/lib/md/favorite';
import NavigateNext from 'react-icons/lib/md/navigate-next';

import toolbar from './toolbar.css';

class Toolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div className={toolbar.wrapper}>
                <div>
                    <ProjectsShare />
                </div>

                <div className={toolbar.iconsWrapper}>
                    <div
                        title="В избранное"
                        className={toolbar.icon}
                    >
                        <Favorite size={20} />
                    </div>
                    <div
                        title="Подробнее"
                        className={toolbar.iconBig}
                    >
                        <NavigateNext size={32} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolbar;
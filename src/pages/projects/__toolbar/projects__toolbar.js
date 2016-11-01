import React from 'react';
import ProjectsShare from 'pages/projects/__share/projects__share';
import Favorite from 'react-icons/lib/md/favorite';
import NavigateNext from 'react-icons/lib/md/navigate-next';
import item from 'blocks/item/item.css';
import projects from 'pages/projects/projects.css';

class ProjectsToolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div className={projects.toolbar}>
                <div className={`${item.none_tabMini} ${item.block_mob}`}>
                    <ProjectsShare />
                </div>

                <div className={projects.iconsWrapper}>
                    <div
                        title="В избранное"
                        className={projects.icon}
                    >
                        <Favorite size={20} />
                    </div>
                    <div
                        title="Подробнее"
                        className={projects.iconBig}
                    >
                        <NavigateNext size={32} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsToolbar;
import React from 'react';
import {/*ShareButtons, ShareCounts,*/ generateShareIcon} from 'react-share';
import grid from 'blocks/grid/grid.css';
import projects from 'pages/projects/projects.css';
import css from 'blocks/config/css';

export const FacebookIcon = generateShareIcon('facebook');
export const TwitterIcon = generateShareIcon('twitter');
export const PinterestIcon = generateShareIcon('pinterest');
export const VKIcon = generateShareIcon('vk');

class ProjectsShare extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div className={grid.row}>
                <div className={projects.shareButton}>
                    <FacebookIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
                <div className={projects.shareButton}>
                    <TwitterIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
                <div className={projects.shareButton}>
                    <PinterestIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
            </div>
        )
    }
}

export default ProjectsShare;
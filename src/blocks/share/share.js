import React from 'react';
import {/*ShareButtons, ShareCounts,*/ generateShareIcon} from 'react-share';
import grid from 'blocks/grid/grid.css';
import share from './share.css';
import css from 'blocks/config/css';

export const FacebookIcon = generateShareIcon('facebook');
export const TwitterIcon = generateShareIcon('twitter');
export const PinterestIcon = generateShareIcon('pinterest');
export const VKIcon = generateShareIcon('vk');

class Share extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div className={grid.row}>
                <div className={share.button}>
                    <FacebookIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
                <div className={share.button}>
                    <TwitterIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
                <div className={share.button}>
                    <PinterestIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                </div>
            </div>
        )
    }
}

export default Share;
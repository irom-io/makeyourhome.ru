import React from 'react';
import {ShareButtons, generateShareIcon} from 'react-share';
import grid from 'blocks/grid/grid.css';
import share from './share.css';
import css from 'blocks/config/css';

export const FacebookIcon = generateShareIcon('facebook');
export const TwitterIcon = generateShareIcon('twitter');
export const PinterestIcon = generateShareIcon('pinterest');
export const VKIcon = generateShareIcon('vk');

const {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton
} = ShareButtons;

class Share extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div className={grid.row}>
                <div className={share.button}>
                    <FacebookShareButton
                        url={p_.url}
                        title={p_.title}
                        description={p_.description}
                    >
                        <FacebookIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </FacebookShareButton>
                </div>
                <div className={share.button}>
                    <TwitterShareButton
                        url={p_.url}
                        title={`${p_.title}. ${p_.description.substr(0, 50)}...`}
                    >
                        <TwitterIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </TwitterShareButton>
                </div>
                <div className={share.button}>
                    <PinterestShareButton
                        url={p_.url}
                        title={p_.title}
                        media={p_.media}
                    >
                        <PinterestIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </PinterestShareButton>
                </div>
            </div>
        )
    }
}

export default Share;
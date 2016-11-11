import React from 'react';
import {ShareButtons, generateShareIcon} from 'react-share';
import {addLang} from 'blocks/link/link';
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
        const url = addLang(p_.url);
        return (
            <div className={grid.row}>
                <div className={share.button}>
                    <FacebookShareButton
                        url={url}
                        title={p_.title}
                        description={p_.description}
                    >
                        <FacebookIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </FacebookShareButton>
                </div>
                <div className={share.button}>
                    <TwitterShareButton
                        url={url}
                        title={`${p_.title}. ${p_.description.substr(0, 37)}...`}
                    >
                        <TwitterIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </TwitterShareButton>
                </div>
                <div className={share.button}>
                    <PinterestShareButton
                        url={url}
                        title={p_.title}
                        media={p_.media}
                        description={p_.title}
                    >
                        <PinterestIcon size={32} round={true} iconBgStyle={{fill: css.colors.main}} />
                    </PinterestShareButton>
                </div>
            </div>
        )
    }
}

export default Share;
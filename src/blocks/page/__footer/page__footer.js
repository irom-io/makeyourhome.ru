import React from 'react';
import footer from './page__footer.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import Auth from 'blocks/auth/auth';
import Link from 'blocks/link/link';
import item from 'blocks/item/item.css';
import L10n from 'blocks/l10n/l10n';

class PageFooter extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={footer.wrapper}>
                <div className={footer.line}></div>
                <div className={footer.content}>
                    <div className={`${grid.w25} ${grid.w30_tab} ${item.none_tabMini} ${text.underline}`}>
                        <Link>
                            {L10n('confidentiality')}
                        </Link>
                    </div>
                    <div className={`${text.center} ${grid.w100_mob} ${grid.mbMini_mob}`}>
                        <div className={`${text.colored} ${text.bold} ${text.mdPlus} ${grid.mbMicro}`}>
                            <Link to="/">
                                {L10n('phone')}
                            </Link>
                        </div>
                        <div className={text.normal}>
                            <Link to="/">
                                makeyourhome.ru ©
                            </Link>
                        </div>
                    </div>
                    <div className={`${grid.w25} ${grid.w30_tab} ${grid.w45_tabMini} ${grid.w100_mob}`}>
                        <div className={`${grid.w90} ${grid.w100_tab}`}>
                            <Auth
                                location={p_.location}
                                history={p_.history}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageFooter;
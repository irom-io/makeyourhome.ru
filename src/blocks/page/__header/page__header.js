import React from 'react';
import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import item from 'blocks/item/item.css';
import Auth from 'blocks/auth/auth';
import Lang from 'blocks/lang/lang';
import Link from 'blocks/link/link';
import Localization from 'blocks/localization/localization';

class PageHeader extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div className={`${grid.w100} ${grid.row} ${grid.center}`}>
                <div className={page.header}>
                    <div className={`${grid.w35} ${item.none_tabMini}`}>
                        <div className={page.title}>
                            <Link to="/">
                                <Localization k="slogan" />
                            </Link>
                        </div>
                        <div className={page.descr}>
                            <Link>Расскажите нам о своей мечте</Link>
                        </div>
                    </div>
                    <div className={`${grid.w25} ${grid.w30_tab} ${grid.w45_tabMini} ${grid.w100_mob} ${grid.row} ${grid.normalCenter} ${grid.center}`}>
                        <div className={`${grid.w90} ${grid.w100_tab}`}>
                            <Auth 
                                location={p_.location}
                                history={p_.history}
                            />
                        </div>
                    </div>
                    <div className={`${grid.w35} ${grid.w35_tab} ${grid.w55_tabMini} ${text.right} ${item.none_mob}`}>
                        <div className={page.title}>
                            <Link to="/">+7 (999) 136-65-57</Link>
                        </div>
                        <div className={`${page.descr} ${grid.pbMicro}`}>
                            <Link>Irom-io@ya.ru</Link>
                        </div>
                        <Lang />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;
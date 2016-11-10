import React from 'react';
import Share from 'blocks/share/share';
import Favorite from 'react-icons/lib/md/favorite';
import NavigateNext from 'react-icons/lib/md/navigate-next';
import Link from 'blocks/link/link';

import grid from 'blocks/grid/grid.css';
import toolbar from './toolbar.css';

class Toolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        let wrapperClassName = `${toolbar.wrapper}`;

        if (p_.small) {
            wrapperClassName = `${wrapperClassName} ${grid.col_tabMini} ${grid.row_mob}`;
        }

        return (
            <div className={wrapperClassName}>
                <div className={p_.small && (`${grid.mbMicro_tabMini} ${grid.mbNone_mob}`)}>
                    <Share
                        url={p_.url}
                        title={p_.title}
                        media={p_.media}
                        description={p_.description}
                    />
                </div>

                <div className={toolbar.iconsWrapper}>
                    <div
                        title="В избранное"
                        className={toolbar.icon}
                    >
                        <Favorite size={20} />
                    </div>
                    {p_.to &&
                    <Link
                        to={p_.to}
                        title="Подробнее"
                        className={toolbar.iconBig}
                    >
                        <NavigateNext size={32} />
                    </Link>
                    }
                </div>
            </div>
        )
    }
}

export default Toolbar;
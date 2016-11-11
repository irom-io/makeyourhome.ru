import React from 'react';
import Share from 'blocks/share/share';
import ToolbarFave from 'blocks/toolbar/__fave/toolbar__fave';
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
                    {p_.fave &&
                    <ToolbarFave 
                        fave={p_.fave}
                    />
                    }
                    {p_.to &&
                    <Link
                        to={p_.to}
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
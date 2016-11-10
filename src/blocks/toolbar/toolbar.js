import React from 'react';
import Share from 'blocks/share/share';
import Favorite from 'react-icons/lib/md/favorite';
import NavigateNext from 'react-icons/lib/md/navigate-next';
import Link from 'blocks/link/link';

import toolbar from './toolbar.css';

class Toolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div className={toolbar.wrapper}>
                <div>
                    <Share />
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
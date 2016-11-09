import React from 'react';
import Link from 'blocks/link/link';
import Edit from 'react-icons/lib/md/edit';
import Delete from 'react-icons/lib/md/delete';

import admin from 'blocks/admin/admin.css';

export class AdminDelete extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div onClick={p_.onDelete} className={admin.item}>
                <Delete size={16} />
            </div>
        )
    }
}

class AdminEdit extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={admin.wrapper}>
                <Link to={p_.editTo} className={admin.item}>
                    <Edit size={16} />
                </Link>
                <AdminDelete
                    onDelete={p_.onDelete}
                />
            </div>
        );
    }
}
AdminEdit.defaultProps = {};

export default AdminEdit;
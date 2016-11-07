import React from 'react';
import Edit from 'react-icons/lib/md/edit';
import Delete from 'react-icons/lib/md/delete';

import admin from 'blocks/admin/admin.css';

class AdminEdit extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={admin.wrapper}>
                <div onClick={p_.onEdit} className={admin.item}>
                    <Edit size={16} />
                </div>
                <div onClick={p_.onDelete} className={admin.item}>
                    <Delete size={16} />
                </div>
            </div>
        );
    }
}
AdminEdit.defaultProps = {};

export default AdminEdit;
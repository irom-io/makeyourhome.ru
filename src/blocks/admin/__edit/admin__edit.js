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
        return (
            <div className={admin.wrapper}>
                <div className={admin.item}>
                        <Edit size={16} />
                </div>
                <div className={admin.item}>
                    <Delete size={16} />
                </div>
            </div>
        );
    }
}
AdminEdit.defaultProps = {};

export default AdminEdit;
import React from 'react';
import Rectangle from 'blocks/rectangle/rectangle';
import { sortable } from 'react-sortable';
import {createSrc} from 'blocks/item/item';
import {AdminDelete} from 'blocks/admin/__edit/admin__edit';

import sortableImage from './sortable_image.css'; 

class Item extends React.Component {
    onDelete(src) {
        this.props.onDelete(src);
    }
    render() {
        let p_ = {...this.props};
        delete p_.onDelete;

        return (
            <div
                {...p_}
            >
                <Rectangle
                    className={sortableImage.inner}
                    src={createSrc(p_.src)}
                >
                    <div className={sortableImage.delete}>
                        <AdminDelete
                            onDelete={() => this.onDelete(p_.src)}
                        />
                    </div>
                </Rectangle>
            </div>
        )
    }
}

const SortableImageItem = sortable(Item);

class SortableImage extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            draggingIndex: null
        };
    }
    updateState(update) {
        this.setState(update);

        if (update.items) {
            this.props.onUpdate(update.items);
        }
    }
    onDelete(src) {
        const p_ = this.props;
        const deleteIndex = p_.items.indexOf(src);
        
        if (deleteIndex !== -1) {
            p_.items.splice(deleteIndex, 1);
            p_.onUpdate(p_.items);
        }
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;

        const items = p_.items.map(function(item, index) {
            return (
                <SortableImageItem
                    key={`sortableItem_${index}`}
                    updateState={(update) => this.updateState(update)}
                    items={p_.items}
                    draggingIndex={s_.draggingIndex}
                    sortId={index}
                    outline="grid"
                    childProps={{className: sortableImage.item, src: item, onDelete: (src) => this.onDelete(src)}}
                />
            );
        }, this);

        return (
            <div className={sortableImage.wrapper}>
                {items}
            </div>
        )
    }
}

export default SortableImage;
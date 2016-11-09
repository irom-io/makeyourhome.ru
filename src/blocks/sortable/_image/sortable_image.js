import React from 'react';
import Rectangle from 'blocks/rectangle/rectangle';
import { sortable } from 'react-sortable';
import {createSrc} from 'blocks/item/item';

import sortableImage from './sortable_image.css'; 

class Item extends React.Component {
    render() {
        const p_ = this.props;

        return (
            <div
                {...p_}
            >
                <Rectangle
                    className={sortableImage.inner}
                    src={createSrc(p_.src)}
                />
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
                    childProps={{className: sortableImage.item, src: item}}
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
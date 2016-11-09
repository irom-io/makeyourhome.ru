import React from 'react';
import Rectangle from 'blocks/rectangle/rectangle';
import { sortable } from 'react-sortable';

import sortableImage from './sortable_image.css'; 

class Item extends React.Component {
    render() {
        const p_ = this.props;

        return (
            <div
                {...p_}
            >
                <Rectangle>
                    {p_.children}
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
            draggingIndex: null,
            items: p_.items
        };
    }
    updateState(update) {
        this.setState(update);
    }
    render() {
        const s_ = this.state;

        const items = s_.items.map(function(item, index) {
            return (
                <SortableImageItem
                    key={`sortableItem_${index}`}
                    updateState={(update) => this.updateState(update)}
                    items={s_.items}
                    draggingIndex={s_.draggingIndex}
                    sortId={index}
                    outline="grid"
                    childProps={{className: sortableImage.item}}
                >
                    {item}
                </SortableImageItem>
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
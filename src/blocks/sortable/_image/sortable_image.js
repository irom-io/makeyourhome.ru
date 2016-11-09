import React from 'react';
import Rectangle from 'blocks/rectangle/rectangle';
import { sortable } from 'react-sortable';

import sortableImage from './sortable_image.css'; 

class Item extends React.Component {
    render() {
        return (
            <div
                {...this.props}
            >
                {this.props.children}
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

        const listItems = s_.items.map(function(item, index) {
            return (
                <SortableImageItem
                    key={`sortableItem_${index}`}
                    updateState={(update) => this.updateState(update)}
                    items={s_.items}
                    draggingIndex={s_.draggingIndex}
                    sortId={index}
                    outline="list"
                >
                    {item}
                </SortableImageItem>
            );
        }, this);

        return (
            <div>
                {listItems}
            </div>
        )
    }
}

export default SortableImage;
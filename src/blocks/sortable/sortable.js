import React from 'react';
import { sortable } from 'react-sortable';

class ListItem extends React.Component {
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

const SortableListItem = sortable(ListItem);

class SortableList extends React.Component {
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
                <SortableListItem
                    key={`sortableItem_${index}`}
                    updateState={(update) => this.updateState(update)}
                    items={s_.items}
                    draggingIndex={s_.draggingIndex}
                    sortId={index}
                    outline="list"
                >
                    {item}
                </SortableListItem>
            );
        }, this);

        return (
            <div>
                {listItems}
            </div>
        )
    }
}

export default SortableList;
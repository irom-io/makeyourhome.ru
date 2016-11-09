import React from 'react';
import { sortable } from 'react-sortable';

class ListItem extends React.Component {
    render() {
        return (
            <div
                {...this.props}
                className="list-item"
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
            data: p_.data
        };
    }
    updateState(update) {
        this.setState(update);
    }
    render() {
        const childProps = { className: 'myClass1' };
        const listItems = this.state.data.items.map(function(item, i) {
            return (
                <SortableListItem
                    key={i}
                    updateState={(update) => this.updateState(update)}
                    items={this.state.data.items}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    outline="list"
                    childProps={childProps}
                >
                    {item}
                </SortableListItem>
            );
        }, this);

        return (
            <div className="list">
                {listItems}
            </div>
        )
    }
}

export default SortableList;
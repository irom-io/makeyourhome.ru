import React from 'react';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';
import grid from 'blocks/grid/grid.css';
import tile from './tile.css';

export class TileWrapper extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div
                className={tile.wrapper}
            >
                {p_.children}
            </div>
        );
    }
}

export class TileContent extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div className={tile.content}>
                <div
                    className={tile.img}
                    style={{backgroundImage: `url(${p_.src})`}}
                    title={p_.text}
                >
                </div>
                {p_.text &&
                <div className={tile.text}>{p_.text}</div>
                }
            </div>
        );
    }
}

export class Tile extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div className={`${tile.item} ${p_.noIndents? '' : tile.indents}`}>
                {tile.link &&
                <Link className={tile.link} to={p_.to}>
                    <Rectangle className={grid.col}>
                        <TileContent {...p_} />
                    </Rectangle>
                </Link>
                }
                {!tile.link &&
                <div className={tile.link}>
                    <Rectangle className={grid.col}>
                        <TileContent {...p_} />
                    </Rectangle>
                </div>
                }
            </div>
        );
    }
}

export default Tile;
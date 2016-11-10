import React from 'react';
import MainSlider from 'pages/main/__slider/main__slider';
import MainToggle from 'pages/main/__toggle/main__toggle';
import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import {Tile, TileWrapper} from 'blocks/tile/tile';
import L10n from 'blocks/l10n/l10n';

class Main extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/2.jpg'), key: 'findBuilders'},
                {src: require('./images/1.jpg'), key: 'about'},
                {src: require('./images/3.jpg'), key: 'articles', to: 'posts'},
                {src: require('./images/4.jpg'), key: 'editProject'},
                {src: require('./images/5.jpg'), key: 'partners', to: 'posts/0QTL1SFXsTGqOKL'},
                {src: require('./images/6.jpg'), key: 'catalog', to: 'projects'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={page.content}>
                <div className={grid.mbNormal}>
                    <MainSlider />
                </div>
                <div className={grid.mbMini}>
                    <MainToggle />
                </div>
                <div className={`${grid.hSeparator} ${grid.mbMini}`}></div>
                <TileWrapper>
                    {s_.items.map((item, index) => {
                        return (
                            <Tile
                                key={`main_${index}`}
                                src={item.src}
                                text={L10n(item.key)}
                                to={item.to}
                            />
                        )
                    })}
                </TileWrapper>
            </div>
        );
    }
}

export default Main;
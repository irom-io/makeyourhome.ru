import React from 'react';
import MainSlider from 'pages/main/__slider/main__slider';
import MainToggle from 'pages/main/__toggle/main__toggle';
import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import {Tile, TileWrapper} from 'blocks/tile/tile';

class Main extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/2.jpg'), text: 'Найти строителей'},
                {src: require('./images/1.jpg'), text: 'О нас'},
                {src: require('./images/3.jpg'), text: 'Статьи'},
                {src: require('./images/4.jpg'), text: 'Редактировать проект'},
                {src: require('./images/5.jpg'), text: 'Партнеры'},
                {src: require('./images/6.jpg'), text: 'Каталог', to: 'projects'}
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
                                text={item.text}
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
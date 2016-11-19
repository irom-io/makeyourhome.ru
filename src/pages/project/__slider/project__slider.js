import React from 'react';
import Slider from 'react-slick';
import Rectangle from 'blocks/rectangle/rectangle';
import Search from 'react-icons/lib/md/search';
import Link from 'blocks/link/link';
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import ArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import {createSrc} from 'blocks/item/item';

import grid from 'blocks/grid/grid.css';
import projectSlider from './project__slider.css';

let timeoutId;
let isSlide = false;

class ProjectSlider extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            isSlide: false
        };
    }
    handleMouseDown() {
        timeoutId = setTimeout(() => {
            isSlide = true;
        }, 300)
    }
    handleClick(e) {
        if (isSlide) {
            e.preventDefault();
        }
        clearTimeout(timeoutId);
        isSlide = false;
    }
    slickPrev() {
        this.refs.slider.slickPrev();
    }
    slickNext() {
        this.refs.slider.slickNext();
    }
    render() {
        const p_ = this.props;

        return (
            <div className={projectSlider.wrapper}>
                <div
                    className={projectSlider.arrow}
                    onClick={() => this.slickPrev()}
                >
                    <ArrowLeft
                        size={36}
                    />
                </div>
                <div className={`${grid.w90} ${grid.w85_tab} ${grid.w80_tabMini} ${grid.w100_mob}`}>
                    <Slider
                        ref="slider"
                        dots={false}
                        slidesToShow={4}
                        swipeToSlide={true}
                        responsive={[{breakpoint: 700, settings: {slidesToShow: 2}}]}
                    >
                        {p_.images.map((src, index) => {
                            return (
                                <div
                                    key={`project__slider_${index}`}
                                >
                                    <div className={projectSlider.itemWrapper}>
                                        <Rectangle
                                            src={createSrc(src)}
                                            className={projectSlider.item}
                                        />
                                        <Link
                                            className={`${projectSlider.search} search__wrapper`}
                                            onClick={e => this.handleClick(e)}
                                            onMouseDown={this.handleMouseDown}
                                            to={`/projects/${p_.projectId}?image=${index}`}
                                        >
                                            <Search size={32} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div
                    className={projectSlider.arrow}
                    onClick={() => this.slickNext()}
                >
                    <ArrowRight
                        size={36}
                    />
                </div>
            </div>
        );
    }
}

export default ProjectSlider;
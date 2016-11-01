import React from 'react';
import 'rc-slider/assets/index.css';
import ReactRange from 'rc-slider';
import range from './range.css';

class RangeHandle extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div style={{left: `${p_.offset}%`}} className={range.handle}>
                {p_.value}
            </div>
        );
    }
}

class Range extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        let p_ = {...this.props};

        p_.className = p_.className? `${range.item} ${p_.className}` : `${range.item}`;
        p_.handle = <RangeHandle />;

        return (
            <div className={range.wrapper}>
                <ReactRange
                    {...p_}
                />
            </div>
        );
    }
}
Range.defaultProps = {};

export default Range;
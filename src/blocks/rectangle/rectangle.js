import React from 'react';
import rectangle from './rectangle.css';

class Rectangle extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        const paddingBottom = (p_.height/p_.width)*100;
        const className = p_.className? `${rectangle.content} ${p_.className}` : rectangle.content;

        return (
            <div className={rectangle.item}>
                <div className={className}>
                    {p_.src &&
                        <div 
                            className={rectangle.cover}
                            style={{backgroundImage: `url(${p_.src})`}}
                        >
                        </div>
                    }
                    {!p_.src &&
                        p_.children
                    }
                </div>
                <div style={{paddingBottom: `${paddingBottom}%`}}></div>
            </div>
        );
    }
}

Rectangle.defaultProps = {
    width: 1,
    height: 1
};

export default Rectangle;
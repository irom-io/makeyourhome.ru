import React from 'react';
import Place from 'react-icons/lib/md/place';
import Link from 'blocks/link/link';
import grid from 'blocks/grid/grid.css';
import page from 'blocks/page/page.css';
import text from 'blocks/text/text.css';
import notFound from './notFound.css';

class NotFound extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <div className={`${page.content} ${grid.col} ${grid.center}`}>
                <div className={notFound.numbers}>
                    <div className={notFound.number}>
                        4
                    </div>
                    <div className={notFound.circle}>
                        <div className={notFound.circleInner}>
                            <Place size={42} />
                        </div>
                    </div>
                    <div className={notFound.number}>
                        4
                    </div>
                </div>
                <div className={notFound.text}>
                    <span>Страница не найдена, возможно то, что Вы ищете найдется в </span>
                    <span className={`${text.underline} ${text.colored}`}>
                        <Link to="/projects">каталоге</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default NotFound;
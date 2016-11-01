import React from 'react';
import PageHeader from 'blocks/page/__header/page__header';
import Menu from 'blocks/menu/menu';
import PageFooter from 'blocks/page/__footer/page__footer';
import {StickyContainer, Sticky} from 'react-sticky';
import isMobile from 'ismobilejs';
import page from './page.css';

class Page extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        const isAppleDevice = isMobile.apple.device;

        return (
            <div className={page.wrapper}>
                <StickyContainer className={page.space}>
                    <div className={page.block}>
                        <PageHeader
                            location={p_.location}
                            history={p_.history}
                        />
                        <Sticky isActive={!isAppleDevice} className={`${page.menu}`}>
                            <Menu />
                        </Sticky>
                    </div>
                    {p_.children}
                </StickyContainer>
                <div className={page.block}>
                    <PageFooter
                        location={p_.location}
                        history={p_.history}
                    />
                </div>
            </div>
        );
    }
}

export default Page;
import React from 'react';
import PageHeader from 'blocks/page/__header/page__header';
import Menu from 'blocks/menu/menu';
import PageFooter from 'blocks/page/__footer/page__footer';
import {StickyContainer, Sticky} from 'react-sticky';
import isMobile from 'ismobilejs';
import page from './page.css';
import PageLang from 'blocks/page/__lang/page__lang';

let prevRoute = {};
class Page extends React.Component {
    constructor(p_, context) {
        super(p_, context);
        
        this.state = {};
    }
    componentDidMount() {
        this.context.router.listen((route) => {
            const changeProjectsFilter = (route.pathname === '/projects' && route.pathname === prevRoute.pathname);

            if (!changeProjectsFilter) {
                window.scrollTo(0, 0);
            }

            prevRoute = route;
        })
    }
    render() {
        const p_ = this.props;
        const isAppleDevice = isMobile.apple.device;

        return (
            <div className={page.wrapper}>
                <PageLang />
                <StickyContainer className={page.space}>
                    <div className={page.block}>
                        <PageHeader
                            location={p_.location}
                            history={p_.history}
                        />
                        <Sticky isActive={!isAppleDevice} className={`${page.menu}`}>
                            <Menu
                                location={p_.location}
                            />
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
Page.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Page;
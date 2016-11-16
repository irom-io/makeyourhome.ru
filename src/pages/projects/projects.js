import React from 'react';
import Layout from 'blocks/layout/layout';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import TileLine from 'blocks/tile/_line/tile_line';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';
import {createSrc} from 'blocks/item/item';
import AdminEdit from 'blocks/admin/__edit/admin__edit';
import L10n from 'blocks/l10n/l10n';
import {getUser} from 'blocks/auth/auth';
import ProjectsParams from 'pages/projects/__params/projects__params';
import ProjectsFilters from 'pages/projects/__filters/projects__filters';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

const step = 3;
let items=[];
class Projects extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            question: '',
            loading: true,
            items: [],
            visibleItems: step
        };
        this.filterItems = this.filterItems.bind(this);
    }
    componentWillReceiveProps(p_) {
        this.setState({
            items: this.filterItems(p_.location.query),
            visibleItems: step
        });
    }
    componentDidMount() {
        const self = this;
        const user = getUser();

        api.post('projects/view', {user: user})
            .then((response) => {
                if (!response.error) {
                    items = response;

                    self.setState({
                        items: self.filterItems(self.props.location.query),
                        loading: false
                    });
                } else {
                    self.setState({
                        loading: false
                    });
                }
            })
    }
    filterItems(query) {
        const lang = getLang();
        let filteredItems = items;

        if (query.collection) {
            filteredItems = items.filter((item) => (item.type === query.collection));
        }
        if (query.style) {
            filteredItems = filteredItems.filter(item => (item.style === query.style));
        }
        if (query.floor) {
            filteredItems = filteredItems.filter(item => (item.floor === query.floor));
        }
        if (query.min) {
            filteredItems = filteredItems.filter(item => (item.area >= (1*query.min)));
        }
        if (query.max) {
            filteredItems = filteredItems.filter(item => (item.area <= (1*query.max)));
        }
        if (query.search) {
            filteredItems = filteredItems.filter(item => {
                let search = query.search.toLowerCase();
                let title = item[lang].title.toLowerCase();
                let longText = item[lang].longText.toLowerCase();

                return (
                    (title.indexOf(search) !== -1) || (longText.indexOf(search) !== -1)
                );
            });
        }

        return filteredItems;
    }
    deleteProject(user, projectId) {
        const self = this;

        self.setState({loading: true});
        api.delete('projects', {user: user, projectId: projectId})
            .then((response) => {
                if (response && !response.error) {
                    self.setState({items: response, loading: false});
                }
            });
    }
    seeMore() {
        this.setState({visibleItems: (this.state.visibleItems + step)})
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;
        let user = localStorage.getItem('user');
        if (user) {user = JSON.parse(user);}
        const isAdmin = localStorage.getItem('isAdmin');
        const lang = getLang();
        
        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {isAdmin &&
                <div className={`${text.center} ${grid.mbMini}`}>
                    <Link
                        className={grid.w100_mob}
                        to="/admin?type=projects"
                    >
                        <Button
                            className={grid.w100_mob}
                        >
                            Добавить запись
                        </Button>
                    </Link>
                </div>
                }

                <div className={grid.mbMini}>
                    <ProjectsFilters
                        location={p_.location}
                    />
                </div>

                {s_.items &&
                <div>
                    {s_.items.map((item, index) => {
                        if (index < s_.visibleItems) {
                            let title = 'noTranslate';
                            let shortText = 'noTranslate';

                            if (item[lang]) {
                                title = item[lang].title;
                                shortText = item[lang].shortText;
                            }

                            return (
                                <TileLine
                                    key={`project_${index}`}
                                    src={createSrc(item.images[0])}
                                    text={title}
                                    l10nText={true}
                                    link={{to: `/projects/${item.id}`}}
                                    description={shortText}
                                    fave={{type: 'project', id: item.id, isActive: item.faveActive}}
                                >
                                    {isAdmin &&
                                    <AdminEdit
                                        editTo={`/admin?type=projects&projectId=${item.id}`}
                                        onDelete={() => this.deleteProject(user, item.id)}
                                    />
                                    }
                                    <div className={`${grid.mbMini}`}>
                                        <ProjectsParams project={item} />
                                    </div>
                                </TileLine>
                            )
                        } else {
                            return '';
                        }
                    })}
                </div>
                }
                
                {(s_.items.length === 0) &&
                <div className={`${text.center} ${text.md}`}>
                    {L10n('project.notFound')}
                </div>
                }

                {s_.items && (s_.visibleItems < s_.items.length) &&
                <div className={`${text.center} ${grid.mtMini}`}>
                    <Button
                        onClick={() => this.seeMore()}
                        className={grid.w100_mob}
                    >
                        {L10n('more')}
                    </Button>
                </div>
                }
            </Layout>
        );
    }
}
Projects.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Projects;
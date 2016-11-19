import React from 'react';
import Button from 'blocks/button/button';
import ProjectItem from 'pages/project/__item/project__item';
import ProjectToolbar from 'pages/project/__toolbar/project__toolbar';
import ProjectSlider from 'pages/project/__slider/project__slider';
import ProjectSelect from 'pages/project/__select/project__select';
import ProjectImage from 'pages/project/__image/project__image';
import {Tile, TileWrapper} from 'blocks/tile/tile';
import api from 'blocks/api/api';
import arrayShuffle from 'array-shuffle';
import {getLang} from 'blocks/page/__lang/page__lang';
import {getUser} from 'blocks/auth/auth';
import {createSrc} from 'blocks/item/item';
import Layout from 'blocks/layout/layout';
import Link from 'blocks/link/link';
import Login from 'blocks/login/login';
import L10n from 'blocks/l10n/l10n';
import Done from 'react-icons/lib/md/done';
import Edit from 'react-icons/lib/md/edit';
import TextPhone from 'blocks/text/_phone/text_phone';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import projectItem from 'pages/project/__item/project__item.css';

class Project extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        };

        this.loadProject = this.loadProject.bind(this);
        this.findProject = this.findProject.bind(this);
        this.getButtons = this.getButtons.bind(this);
    }
    componentDidMount() {
        this.loadProject();
    }
    componentWillReceiveProps(p_) {
        if (p_.params.projectId !== this.props.params.projectId) {
            this.setState({showLogin: false, orderSuccess: false});
            this.findProject(this.state.projects, p_.params.projectId);
        }
    }
    loadProject() {
        const self = this;
        const user = getUser();

        self.setState({loading: true});
        api.post('projects/view', {user: user})
            .then((response) => {
                self.findProject(response, self.props.params.projectId);
            });
    }
    findProject(projects, projectId) {
        let currentProject = false;
        const lang = getLang();

        projects.forEach((project) => {
            if (project.id === projectId) {
                currentProject = project
            }
        });

        if (!currentProject) {
            this.context.router.push(`/notFound?lang=${lang}`);
        } else {
            this.setState({
                project: currentProject,
                projects: arrayShuffle(projects),
                loading: false,
                total: (1*currentProject.pdfCoast + 2*currentProject.printedCoast)
            });
        }
    }
    onSelect(selected) {
        const s_ = this.state;

        let totalList = {};
        let total = 0;
        let key;
        let coast = {
            pdf: {
                'withoutPdf': 0,
                'withPdf': 1*s_.project.pdfCoast
            },
            printed: {
                'zero': 0,
                'two': 2*s_.project.printedCoast,
                'four': 4*s_.project.printedCoast,
                'six': 6*s_.project.printedCoast
            },
            addition: s_.project.addition
        };

        totalList[selected.pdf] = coast.pdf[selected.pdf];
        totalList[selected.printed] = coast.printed[selected.printed];
        selected.addition.forEach((additionKey) => {
            totalList[additionKey] = 1*coast.addition[additionKey];
        });

        for (key in totalList) {
            if (totalList.hasOwnProperty(key)) {
                total += totalList[key];
            }
        }

        this.setState({
            total: total,
            totalList: totalList
        });
    }
    order() {
        const s_ = this.state;
        const user = getUser();

        if (user) {
            if (!s_.orderSuccess) {
                this.setState({showPhone: true});
                window.scrollTo(0, 0);
            }
        } else {
            this.setState({showLogin: true});
        }
    }
    confirmOrder() {
        const user = getUser();
        const s_ = this.state;
        let orderList = [];
        const totalList = this.state.totalList;
        let key;

        for (key in totalList) {
            if (totalList.hasOwnProperty(key)) {
                orderList.push({text: L10n(`project.${key}`, 'ru'), value: totalList[key]});
            }
        }

        this.setState({loading: true});
        api.post('projects/order', {user: user, orderList: orderList, total: this.state.total, phone: s_.phone, title: s_.project['ru'].title, id: s_.project.id})
            .then(() => {
                this.setState({
                    loading: false,
                    orderSuccess: true,
                    showPhone: false,
                    phone: ''
                });
            });
    }
    getButtons() {
        return (
            <div className={projectItem.iconWrapper}>
                <Link
                    to="/order"
                    className={projectItem.icon}
                >
                    <div className={`${grid.mrMini} ${grid.mrMicro_mob}`}>
                        {L10n('project.change')}
                    </div>
                    <Edit size={20} />
                </Link>
                <div
                    onClick={() => this.order()}
                    className={projectItem.icon}
                >
                    <div className={`${grid.mrMini} ${grid.mrMicro_mob}`}>
                        {L10n('project.order')}
                    </div>
                    <Done size={20} />
                </div>
            </div>
        );
    }
    onResponseAuth(response) {
        if (!response.error) {
            this.setState({showLogin: false});
        }

        this.setState({loading: false});
    }
    onChangePhone(phone) {
        this.setState({phone});
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;
        const image = p_.location.query.image;
        const lang = getLang();
        const Buttons = this.getButtons();
        let sameProjectsIndex = 0;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {s_.orderSuccess &&
                <div className={grid.mbMini}>
                    {L10n('project.orderSuccess')}
                </div>
                }
                {s_.showPhone &&
                    <div className={`${grid.mbNormal}`}>
                        <div className={`${grid.space} ${grid.mbMini}`}>
                            <TextPhone
                                onChange={(phone) => this.onChangePhone(phone)}
                            />
                        </div>
                        <div className={text.center}>
                            <Button
                                disabled={!s_.phone}
                                className={grid.w100_mob}
                                onClick={() => this.confirmOrder()}
                            >
                                {L10n('project.confirmOrder')}
                            </Button>
                        </div>
                    </div>
                }
                {s_.showLogin &&
                <div className={grid.mbMini}>
                    <Login
                        descr={`${L10n('project.toOrder')},`}
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.setState({loading: false})}
                    />
                </div>
                }
                {s_.project &&
                <div>
                    <div className={grid.mbMicro}>
                        {image &&
                        <ProjectImage
                            projectId={s_.project.id}
                            imageId={image}
                            images={s_.project.images}
                        />
                        }

                        {!image &&
                        <div>
                            <ProjectItem
                                text={s_.project[lang].title}
                                src={createSrc(s_.project.images[0])}
                                buttons={Buttons}
                            >
                                <ProjectSelect
                                    project={s_.project}
                                    total={s_.total}
                                    onSelect={(selected) => this.onSelect(selected)}
                                />
                            </ProjectItem>

                            <ProjectToolbar
                                project={s_.project}
                                fave={{id: s_.project.id, type: 'project', isActive: s_.project.faveActive}}
                            />
                        </div>
                        }
                    </div>

                    <div className={grid.mbNormal}>
                        <ProjectSlider
                            projectId={s_.project.id}
                            images={s_.project.images}
                        />
                    </div>

                    <div className={`${grid.mbNormal} ${text.normal} ${text.mini_tabMini} ${text.justify} ${text.preWrap}`}>
                        {s_.project[lang].longText}
                    </div>

                    <div className={`${grid.col_mob} ${grid.normalCenter_mob}`}>
                        <div className={`${text.md} ${grid.mbMini} ${text.colored}`}>{L10n('project.otherProjects')}:</div>

                        <div className={grid.w70_mob}>
                            <TileWrapper>
                                {s_.projects.map((project, index) => {

                                    if ((project.id !== s_.project.id) && sameProjectsIndex < 3) {
                                        sameProjectsIndex++;

                                        return (
                                            <Tile
                                                key={`project__${project.id}`}
                                                src={createSrc(project.images[0])}
                                                text={project[lang].title}
                                                to={`/projects/${project.id}`}
                                            />
                                        );
                                    } else {
                                        return '';
                                    }
                                })}
                            </TileWrapper>
                        </div>
                    </div>
                </div>
                }
            </Layout>
        )
    }
}
Project.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Project;
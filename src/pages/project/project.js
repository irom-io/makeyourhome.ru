import React from 'react';
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
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Project extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        };

        this.loadProject = this.loadProject.bind(this);
        this.findProject = this.findProject.bind(this);
    }
    componentDidMount() {
        this.loadProject();
    }
    componentWillReceiveProps(p_) {
        this.findProject(this.state.projects, p_.params.projectId);
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
                pdf: {value: 1*currentProject.pdfCoast, label: L10n('project.withPdf')},
                printed: {value: 2*currentProject.printedCoast, label: L10n('project.printed.two')},
                addition: []
            });
        }
    }
    onSelect(selected) {
        console.log(selected);
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;
        const image = p_.location.query.image;
        const lang = getLang();
        let sameProjectsIndex = 0;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
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
                            >
                                <ProjectSelect 
                                    project={s_.project}
                                    pdf={s_.pdf}
                                    printed={s_.printed}
                                    addition={s_.addition}
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
import React from 'react';
import ProjectItem from 'pages/project/__item/project__item';
import ProjectToolbar from 'pages/project/__toolbar/project__toolbar';
import ProjectSlider from 'pages/project/__slider/project__slider';
import ProjectSelect from 'pages/project/__select/project__select';
import ProjectImage from 'pages/project/__image/project__image';
import {Tile, TileWrapper} from 'blocks/tile/tile';
import api from 'blocks/api/api';
import {getLang} from 'blocks/page/__lang/page__lang';
import {getUser} from 'blocks/auth/auth';
import {createSrc} from 'blocks/item/item';
import Layout from 'blocks/layout/layout';

import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Project extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        const self = this;
        const p_ = self.props;
        const lang = getLang();
        const user = getUser();

        api.post('projects/view', {user: user})
            .then((response) => {
                let isCorrectProjectId = false;
                self.setState({loading: false});

                if (response && p_.params.projectId) {
                    response.forEach((project) => {
                        if (project.id === p_.params.projectId) {
                            self.setState({
                                project: project
                            });

                            isCorrectProjectId = true;
                        }
                    });

                    if (!isCorrectProjectId) {
                        this.context.router.push(`/notFound?lang=${lang}`);
                    }
                }
            });
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;
        const image = p_.location.query.image;
        const lang = getLang();

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
                                <ProjectSelect />
                            </ProjectItem>

                            "ProjectToolbar
                            project="selectedProject"
                            />"
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

                    <div className={`${text.md} ${grid.mbMini} ${text.colored}`}>Похожие проекты:</div>
                    <TileWrapper>
                        <Tile
                            src={require('pages/projects/images/2.jpg')}
                            text={'Коттедж'}
                            to={'/projects/2'}
                        />
                        <Tile
                            src={require('pages/projects/images/3.jpg')}
                            text={'Современный дом'}
                            to={'/projects/3'}
                        />
                        <Tile
                            src={require('pages/projects/images/4.jpg')}
                            text={'Деревянный дом'}
                            to={'/projects/4'}
                        />
                    </TileWrapper>
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
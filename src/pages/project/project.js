import React from 'react';
import ProjectItem from 'pages/project/__item/project__item';
import ProjectToolbar from 'pages/project/__toolbar/project__toolbar';
import ProjectSlider from 'pages/project/__slider/project__slider';
import ProjectSelect from 'pages/project/__select/project__select';
import ProjectImage from 'pages/project/__image/project__image';
import {Tile, TileWrapper} from 'blocks/tile/tile';

import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Project extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            selected: 0,
            items: [
                {
                    id: 123,
                    title: 'Дом классика', space: 80, garage: 'Есть гараж', beds: 'Три спальни', floors: 'Два этажа',
                    main: require('./images/1/1.jpg'),
                    images: [
                        require('./images/1/2.jpg'), 
                        require('./images/1/3.jpg'),
                        require('./images/1/4.jpg'),
                        require('./images/1/5.jpg')
                    ],
                    description: 'Описание проекта'
                }
            ]
        };
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;
        const selectedProject = s_.items[s_.selected];
        const image = p_.location.query.image;

        return (
            <div className={page.content}>
                <div className={grid.mbMicro}>
                    {image?
                        <ProjectImage
                            projectId={1}
                            imageId={image}
                        />
                        :
                        <div>
                            <ProjectItem
                                text={selectedProject.title}
                                src={selectedProject.main}
                            >
                                <ProjectSelect />
                            </ProjectItem>

                            <ProjectToolbar
                                project={selectedProject}
                            />
                        </div>
                    }
                </div>

                <div className={grid.mbNormal}>
                    <ProjectSlider
                        projectId={1}
                        images={[selectedProject.main, ...selectedProject.images]}
                    />
                </div>

                <div className={`${grid.mbNormal} ${text.normal} ${text.mini_tabMini} ${text.justify}`}>
                    <p>Проект выполнен в стиле сдержанной роскоши домов юга Франции.</p><br />
                    <p>В доме есть все необходимое для проживания с максимальным комфортом для семьи из 5 человек.</p><br />
                    <p>Экономичный и практичный небольшой жилой дом с эффектным двухсветным пространством в гостиной комнате. На мансарде располагаются три жилых комнаты, которые выходят на балкон, с которого открывается прекрасный вид на камин гостиной. Из гостиной есть выход на террасу с барбекю.</p>
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
        )
    }
}

export default Project;
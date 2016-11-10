import React from 'react';
import ProjectsFilters from 'pages/projects/__filters/projects__filters';
import ProjectsToolbar from 'pages/projects/__toolbar/projects__toolbar';
import ProjectsParams from 'pages/projects/__params/projects__params';
import TileLine from 'blocks/tile/_line/tile_line';
import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

class Projects extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), text: 'Дом классика', descr: require('./html/1.html'), link: {to: '/projects/1'}, space: 80, garage: 'Есть гараж', beds: 'Три спальни', floors: 'Два этажа'},
                {src: require('./images/2.jpg'), text: 'Уэлфит', descr: require('./html/2.html'), link: {to: '/projects/2'}, space: 120, garage: 'Нет гаража', beds: 'Одна спальня', floors: 'Два этажа'},
                {src: require('./images/3.jpg'), text: 'Загородная баня', descr: require('./html/3.html'), link: {to: '/projects/3'}, space: 30, garage: 'Нет гаража', beds: 'Нет спален', floors: 'Один этаж'},
                {src: require('./images/4.jpg'), text: 'Юрта', descr: require('./html/4.html'), link: {to: '/projects/4'}, space: 72, garage: 'Есть гараж', beds: 'Две спальни', floors: 'Два этажа'},
                {src: require('./images/5.jpg'), text: 'Коттедж', descr: require('./html/5.html'), link: {to: '/projects/5'}, space: 130, garage: 'Нет гаража', beds: 'Одна спальня', floors: 'Два этажа'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={page.content}>
                <ProjectsFilters />

                <div className={`${grid.hSeparator} ${grid.mtMini} ${grid.mbMini}`}></div>

                <div>
                    {s_.items.map((project, index) => {
                        return (
                            <TileLine
                                key={`projectsProjects_${index}`}
                                src={project.src}
                                text={project.text}
                                link={project.link}
                                toolbar={<ProjectsToolbar />}
                                l10nText={true}
                            >
                                <div>
                                    <div className={`${grid.mbMini}`}>
                                        <ProjectsParams project={project} />
                                    </div>
                                    <div className={`${item.none_tabMini} ${item.block_mob}`} dangerouslySetInnerHTML={{__html: project.descr}}></div>
                                </div>
                            </TileLine>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Projects;
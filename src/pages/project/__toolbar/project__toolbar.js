import React from 'react';
import ProjectsParams from 'pages/projects/__params/projects__params';
import Toolbar from 'blocks/toolbar/toolbar';
import grid from 'blocks/grid/grid.css';

class ProjectToolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={`${grid.row} ${grid.justify} ${grid.normalCenter} ${grid.col_mob}`}>
                <div
                    className={`${grid.w50} ${grid.w100_mob} ${grid.mbMini_mob} ${grid.plMini} ${grid.prMini} ${grid.plNone_tabMini} ${grid.prNone_tabMini}`}
                >
                    <Toolbar
                        url={`/projects/${p_.project.id}`}
                        title={p_.project.title}
                        media={p_.project.images[0]}
                        description={p_.project.description}
                    />
                </div>
                <div className={`${grid.w50} ${grid.w100_mob} ${grid.plMini} ${grid.prMini} ${grid.plNone_tabMini} ${grid.prNone_tabMini}`}>
                    <ProjectsParams
                        project={p_.project}
                    />
                </div>
            </div>
        )
    }
}

export default ProjectToolbar;
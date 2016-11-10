import React from 'react';
import ProjectsParams from 'pages/projects/__params/projects__params';
import grid from 'blocks/grid/grid.css';

class ProjectsToolbar extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={`${grid.row} ${grid.justify} ${grid.normalCenter} ${grid.plMini}`}>
                <div className={`${grid.w50} ${grid.plMini} ${grid.prMini} ${grid.space_tabMini} ${grid.wAuto_tabMini}`}>
                    <ProjectsParams
                        project={p_.project}
                    />
                </div>
            </div>
        )
    }
}

export default ProjectsToolbar;
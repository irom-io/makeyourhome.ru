import React from 'react';
import projects from 'pages/projects/projects.css';
import Weekend from 'react-icons/lib/md/weekend';
import DirectionsCar from 'react-icons/lib/md/directions-car';
import BorderOuter from 'react-icons/lib/md/border-outer';
import FormatListNumbered from 'react-icons/lib/md/format-list-numbered';

class ProjectsParams extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={projects.params}>
                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{p_.project.space} кв. м</div>
                    <div>
                        <BorderOuter size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{p_.project.beds}</div>
                    <div>
                        <Weekend size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{p_.project.floors}</div>
                    <div>
                        <FormatListNumbered size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{p_.project.garage}</div>
                    <div>
                        <DirectionsCar size={36} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsParams;
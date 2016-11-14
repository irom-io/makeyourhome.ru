import React from 'react';
import projects from 'pages/projects/projects.css';
import Weekend from 'react-icons/lib/md/weekend';
import DirectionsCar from 'react-icons/lib/md/directions-car';
import BorderOuter from 'react-icons/lib/md/border-outer';
import FormatListNumbered from 'react-icons/lib/md/format-list-numbered';
import L10n from 'blocks/l10n/l10n';

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
                    <div className={projects.param}>{p_.project.area} кв. м</div>
                    <div>
                        <BorderOuter size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{L10n(`project.bedrooms.${p_.project.bedroom}`)}</div>
                    <div>
                        <Weekend size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{L10n(`project.floors.${p_.project.floor}`)}</div>
                    <div>
                        <FormatListNumbered size={36} />
                    </div>
                </div>

                <div className={projects.paramWrapper}>
                    <div className={projects.param}>{L10n(`project.garage.${p_.project.garage}`)}</div>
                    <div>
                        <DirectionsCar size={36} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsParams;
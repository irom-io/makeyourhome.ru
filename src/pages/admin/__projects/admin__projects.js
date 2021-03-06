import React from 'react';
import {Input, Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getLang} from 'blocks/page/__lang/page__lang';
import {getUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';
import AdminLoader from 'pages/admin/__loader/admin__loader';
import Select from 'blocks/select/select';
import L10n from 'blocks/l10n/l10n';
import {styleList, collectionList, numberList, additionList} from 'blocks/menu/menu';

import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

class AdminProjects extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            errorMsg: null,
            loading: false,
            addition: 'withoutAdditions',
            data: {
                images: [],
                ru: {title: '', shortText: '', longText: ''},
                en: {title: '', shortText: '', longText: ''},
                esp: {title: '', shortText: '', longText: ''},
                style: null,
                type: null,
                floor: null,
                bedroom: null,
                garage: null,
                area: '',
                pdfCoast: '',
                printedCoast: '',
                addition: {}
            },
            projectId: p_.projectId || null,
            styles: styleList.map((style) => {return {value: style.name, label: L10n(`styles.${style.name}`, 'ru')}}),
            collections: collectionList.map((type) => {return {value: type.name, label: L10n(`collections.${type.name}`, 'ru')}}),
            floors: numberList.map((number) => {return {value: number.name, label: L10n(`project.floors.${number.name}`, 'ru')}}),
            bedrooms: numberList.map((bedroom) => {return {value: bedroom.name, label: L10n(`project.bedrooms.${bedroom.name}`, 'ru')}}),
            additions: additionList.map((addition) => {return {value: addition.name, label: L10n(`project.${addition.name}`, 'ru')}}),
            garage: [{value: 'no', label: L10n(`project.garage.no`, 'ru')}, {value: 'yes', label: L10n(`project.garage.yes`, 'ru')}]
        };
    }
    componentDidMount() {
        const self = this;
        const user = getUser();

        api.post('projects/view', {user: user})
            .then((response) => {
                self.props.onLoad();

                if (response && self.state.projectId) {
                    response.forEach((project) => {
                        if (project.id === self.state.projectId) {
                            self.setState({data: {...self.state.data, ...project}});
                        }
                    })
                }
            });
    }
    onChange(value, field) {
        const lang = getLang();
        let data = this.state.data;
        data[lang][field] = value;
        
        this.setState({data: data});
    }
    onChangeNumber(value, field) {
        let data = this.state.data;
        data[field] = value;

        this.setState({data: data});
    }
    addNew() {
        this.setState({
            data: {
                ru: {title: '', shortText: '', longText: ''},
                en: {title: '', shortText: '', longText: ''},
                esp: {title: '', shortText: '', longText: ''},
                images: [],
                style: null,
                type: null,
                floor: null,
                bedroom: null,
                garage: null,
                area: '',
                pdfCoast: '',
                printedCoast: '',
                addition: {}
            },
            errorMsg: null,
            loading: false,
            projectId: null,
            addition: 'withoutAdditions'
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const s_ = this.state;
        const p_ = this.props;
        const self = this;
        let user = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user)
        } else {
            user = {};
        }

        self.setState({msg: null, errorMsg: null, loading: true});
        p_.onSubmit();
        api.post('projects', {
            user: user,
            data: s_.data,
            projectId: s_.projectId
        })
        .then((response) => {
            p_.onResponse(response);
            if (!response.error) {
                self.setState({
                    msg: 'Успешно сохранено',
                    loading: false,
                    projectId: response.projectId
                });
                setTimeout(() => {
                    self.setState({
                        msg: null
                    });
                }, 2500);
            } else {
                self.setState({
                    errorMsg: response.error.msg,
                    loading: false
                });
            }
        });
    }
    onUpdate(images) {
        let data = this.state.data;
        data.images = images;
        this.setState({data: data});
    }
    selectStyle(style) {
        let data = this.state.data;

        data.style = style.value;
        this.setState({data: data});
    }
    selectType(type) {
        let data = this.state.data;

        data.type = type.value;
        this.setState({data: data});
    }
    selectFloor(floor) {
        let data = this.state.data;

        data.floor = floor.value;
        this.setState({data: data});
    }
    selectBedroom(bedroom) {
        let data = this.state.data;

        data.bedroom = bedroom.value;
        this.setState({data: data});
    }
    selectGarage(garage) {
        let data = this.state.data;

        data.garage = garage.value;
        this.setState({data: data});
    }
    selectAddition(addition) {
        let data = this.state.data;

        if (addition.value === 'withoutAdditions') {
            data.addition = {};
            this.setState({data: data, addition: addition.value});

            return;
        }

        if (!data.addition[addition.value]) {
            data.addition[addition.value] = '';
            this.setState({
                data: data,
                addition: addition.value
            });
        } else {
            this.setState({
                addition: addition.value
            });
        }
    }
    onChangeAddition(value) {
        const s_ = this.state;
        let data = this.state.data;

        data.addition[s_.addition] = value;
        this.setState({data: data});
    }
    render() {
        const s_ = this.state;
        const lang = getLang();

        return (
            <form className={grid.w100} onSubmit={(e) => this.onSubmit(e)}>
                <div
                    className={`${grid.mbMini} ${text.md}`}
                >
                    <span
                        onClick={() => this.addNew()}
                        className={`${text.underline} ${item.pointer}`}
                    >
                        Добавить новую запись
                    </span>
                </div>
                {s_.projectId &&
                    <div
                        className={`${grid.mbMini} ${text.md}`}
                    >
                        Редактировать запись в {lang}
                    </div>
                }
                {s_.errorMsg &&
                <div className={grid.mbMini}>
                    {L10n(`errors.${s_.errorMsg}`)}
                </div>
                }
                {s_.msg &&
                <div className={grid.mbMini}>
                    {s_.msg}
                </div>
                }

                <div className={grid.mbMini}>
                    <AdminLoader
                        images={s_.data.images}
                        onUpdate={(images) => this.onUpdate(images)}
                    />
                </div>

                <div className={grid.mbBig}>
                    <div className={grid.mbMini}>
                        <Select
                            placeholder="Стиль"
                            options={s_.styles}
                            clearable={false}
                            searchable={false}
                            onChange={(style) => this.selectStyle(style)}
                            value={s_.data.style}
                        />
                    </div>

                    <div>
                        <Select
                            placeholder="Тип"
                            options={s_.collections}
                            clearable={false}
                            searchable={false}
                            onChange={(type) => this.selectType(type)}
                            value={s_.data.type}
                        />
                    </div>
                </div>

                <div className={grid.mbBig}>
                    <div className={grid.mbMini}>
                        <Input
                            type="number"
                            placeholder="Площадь"
                            value={s_.data.area}
                            onChange={(value) => this.onChangeNumber(value, 'area')}
                        />
                    </div>

                    <div className={grid.mbMini}>
                        <Select
                            placeholder="Количество спален"
                            options={s_.bedrooms}
                            clearable={false}
                            searchable={false}
                            onChange={(bedroom) => this.selectBedroom(bedroom)}
                            value={s_.data.bedroom}
                        />
                    </div>

                    <div className={grid.mbMini}>
                        <Select
                            placeholder="Этажность"
                            options={s_.floors}
                            clearable={false}
                            searchable={false}
                            onChange={(floor) => this.selectFloor(floor)}
                            value={s_.data.floor}
                        />
                    </div>

                    <div>
                        <Select
                            placeholder="Гараж"
                            options={s_.garage}
                            clearable={false}
                            searchable={false}
                            onChange={(garage) => this.selectGarage(garage)}
                            value={s_.data.garage}
                        />
                    </div>
                </div>

                <div className={grid.mbBig}>
                    <div className={grid.mbMini}>
                        <Input
                            type="number"
                            placeholder="Стоимость PDF"
                            value={s_.data.pdfCoast}
                            onChange={(value) => this.onChangeNumber(value, 'pdfCoast')}
                        />
                    </div>

                    <div className={grid.mbMini}>
                        <Input
                            type="number"
                            placeholder="Стоимость одной печатной копии"
                            value={s_.data.printedCoast}
                            onChange={(value) => this.onChangeNumber(value, 'printedCoast')}
                        />
                    </div>

                    <div className={grid.mbMini}>
                        <Select
                            placeholder="Дополнительно"
                            options={s_.additions}
                            clearable={false}
                            searchable={false}
                            onChange={(addition) => this.selectAddition(addition)}
                            value={s_.addition}
                        />
                    </div>

                    {s_.addition !== 'withoutAdditions' &&
                        <div className={grid.mbMini}>
                            <Input
                                type="number"
                                placeholder="Стоимость дополнения"
                                value={s_.data.addition[s_.addition]}
                                onChange={(value) => this.onChangeAddition(value)}
                            />
                        </div>
                    }
                </div>

                <div className={grid.mbMini}>
                    <Input
                        placeholder="Заголовок"
                        value={s_.data[lang].title}
                        onChange={(value) => this.onChange(value, 'title')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Textarea
                        rows={5}
                        placeholder="Краткое описание"
                        value={s_.data[lang].shortText}
                        onChange={(value) => this.onChange(value, 'shortText')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Textarea
                        rows={10}
                        placeholder="Подробное описание"
                        value={s_.data[lang].longText}
                        onChange={(value) => this.onChange(value, 'longText')}
                    />
                </div>

                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading || (s_.data.images.length === 0) || !s_.data[lang].title || !s_.data[lang].shortText || !s_.data[lang].longText}
                    >
                        Сохранить {lang}
                    </Button>
                </div>
            </form>
        );
    }
}
AdminProjects.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminProjects;
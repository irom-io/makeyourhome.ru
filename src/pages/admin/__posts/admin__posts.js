import React from 'react';
import {Input, Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getLang} from 'blocks/page/__lang/page__lang';
import {getUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';
import AdminLoader from 'pages/admin/__loader/admin__loader';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

class AdminPosts extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            errorMsg: null,
            loading: false,
            data: {
                images: [],
                ru: {title: '', shortText: '', longText: ''},
                en: {title: '', shortText: '', longText: ''},
                esp: {title: '', shortText: '', longText: ''}
            },
            postId: p_.postId || null
        };
    }
    componentDidMount() {
        const self = this;
        const user = getUser();

        api.post('posts/view', {user: user})
            .then((response) => {
                self.props.onLoad();

                if (response && self.state.postId) {
                    response.forEach((post) => {
                        if (post.id === self.state.postId) {
                            self.setState({data: {...self.state.data, ...post}});
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
    addNew() {
        this.setState({
            data: {
                ru: {title: '', shortText: '', longText: ''},
                en: {title: '', shortText: '', longText: ''},
                esp: {title: '', shortText: '', longText: ''},
                images: []
            },
            errorMsg: null,
            loading: false,
            postId: null
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
        api.post('posts', {
            user: user,
            data: s_.data,
            postId: s_.postId
        })
        .then((response) => {
            p_.onResponse(response);
            if (!response.error) {
                self.setState({
                    msg: 'Успешно сохранено',
                    loading: false,
                    postId: response.postId
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
                {s_.postId &&
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
AdminPosts.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminPosts;
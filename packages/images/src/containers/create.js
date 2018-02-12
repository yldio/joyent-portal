/* eslint-disable camelcase */
import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { destroyAll } from 'react-redux-values';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import get from 'lodash.get';
import uniqBy from 'lodash.uniqby';
import omit from 'lodash.omit';
import remcalc from 'remcalc';

import { ViewContainer, H2, Button, Divider } from 'joyent-ui-toolkit';

import Name from '@containers/create-image/name';
import Tags from '@containers/create-image/tags';

const CREATE_FORM = 'CREATE-IMAGE';

const CreateImage = ({ step, history, location, match, disabled, handleSubmit }) => (
    <ViewContainer>
        <Margin top={4} bottom={4}>
            <H2>Create Image</H2>
        </Margin>
        <Name
            history={history}
            match={match}
            step="name"
            expanded={match.params.step === 'name'}
        />
        <Tags
            history={history}
            match={match}
            step="tag"
            expanded={match.params.step === 'tag'}
        />
        <Margin top={7}><Divider height={remcalc(1)} /></Margin>
        <Margin top={4} bottom={10}>
            <ReduxForm form={CREATE_FORM} onSubmit={handleSubmit}>
                {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Button disabled={disabled} loading={submitting}>
                            Create Image
            </Button>
                    </form>
                )}
            </ReduxForm>
        </Margin>
    </ViewContainer>
);

export default compose(
    connect(({ form, values }) => {
        const FORM_NAME = 'create-image-details';
        const nameFilled = get(form, `${FORM_NAME}.values.name`, '');

        const disabled = !get(values, `create-image-name-proceeded`, false) || !nameFilled.length

        if (disabled) {
            return { disabled };
        }

        const name = get(
            form,
            `${FORM_NAME}.values.name`,
            '<instance-name>'
        );

        const description = get(
            form,
            `${FORM_NAME}.values.description`,
            '<instance-description>'
        );

        const version = get(
            form,
            `${FORM_NAME}.values.version`,
            '<instance-version>'
        );

        const tags = get(values, 'create-image-tags', []);

        return {
            forms: Object.keys(form), // improve this
            name,
            description,
            version,
            tags,
            disabled
        };
    }),
    connect(null, (dispatch, {
        name,
        description,
        version,
        tags,
        forms,
        createImage,
        history
    }) => ({
        handleSubmit: async () => {
            const _name = name.toLowerCase();
            const _description = description.toLowerCase();
            const _version = version.toLowerCase();
            const _tags = uniqBy(tags, 'name').map(a => omit(a, 'expanded'));

            // const [err, res] = await intercept(
            //     createImage({
            //         variables: {
            //             name: _name,
            //             version: _version,
            //             description: _description,
            //             package: pkg,
            //             tags: _tags,
            //         }
            //     })
            // );

            // if (err) {
            //     return dispatch(
            //         stopSubmit(CREATE_FORM, {
            //             _error: parseError(err)
            //         })
            //     );
            // }

            // eslint-disable-next-line no-alert
            window.alert(`
                    Image Created!!
                    name: ${_name}
                    description: ${_description}
                    version: ${_version}
                    tags: ${_tags.map(tag => tag.name)}
                `)

            dispatch([destroyAll(), forms.map(name => destroy(name))]);

            // history.push(`/images/${res.data.createImage.name}`);
        }
    })
    ))(CreateImage);

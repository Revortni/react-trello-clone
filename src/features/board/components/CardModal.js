import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { TagOutlined, ProjectOutlined, AlignLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { LABELS } from '../../../core/constants';
import { CardDetailHead, CardDetailIcon, CardDetailWrapper, Details } from '../styles';
import { CardDescription } from './CardDescription';
import { Label } from './common/Label';

export const CardModal = (props) => {
    const { listKey, card, visible, onOk, onCancel, onEditCard } = props;

    return (
        <Modal
            title={
                <CardDetail title={<h4>{card.title}</h4>} icon={<ProjectOutlined />} />
            }
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
        >
            <Details>
                <CardDetail
                    title={<h4>Labels</h4>}
                    icon={<TagOutlined />}
                    content={<CardLabel card={card} listKey={listKey} onEditCard={onEditCard} />}
                />

                <CardDetail
                    icon={<AlignLeftOutlined />}
                    title={<h4>Description</h4>}
                    content={
                        <CardDescription card={card} listKey={listKey} onEditCard={onEditCard} />
                    }
                />
            </Details>
        </Modal>
    );
};

CardModal.propTypes = {
    listKey: PropTypes.string,
    card: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onEditCard: PropTypes.func,
};

export const CardDetail = (props) => {
    return (
        <CardDetailWrapper>
            <CardDetailHead>
                <CardDetailIcon>{props.icon}</CardDetailIcon>
                <div>{props.title}</div>
            </CardDetailHead>
            <div>{props.content}</div>
        </CardDetailWrapper>
    );
};

const CardLabel = (props) => {
    const { card, listKey, onEditCard } = props;

    return LABELS.map((label, index) => (
        <Label
            key={index}
            color={label.color}
            text={label.text}
            active={card.label === label.text}
            card={card}
            listKey={listKey}
            onClick={onEditCard}
        />
    ));
};

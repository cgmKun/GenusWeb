import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Space } from '@douyinfe/semi-ui';

class InspectDefect extends Component {
    static propTypes = {
        defect: PropTypes.object,
        visible: PropTypes.any,
        handleCancel: PropTypes.any
    }
    
    render () {
        const defect = this.props.defect;

        return (
            <Modal
                title={defect.issueKey}
                visible={this.props.visible}
                onOk={this.props.handleCancel}
                onCancel={this.props.handleCancel}
                footer={
                    <Button type="primary" onClick={this.props.handleCancel}>
                        Cerrar
                    </Button>
                }
            >
                <div style={{ padding: 12, border: '1px solid var(--semi-color-border)', margin: 12 }}>
                    <Space vertical align="">
                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Issue </span>
                        <p
                            style={{
                                color: 'var(--semi-color-text-2)',
                                margin: '4px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {defect.issueKey}
                        </p>
                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Summary </span>
                        <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                            {defect.summary}
                        </p>
                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Description </span>
                        <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                            {defect.description}
                        </p>
                    </Space>
                </div>
            </Modal>
        )
    }
}

export default InspectDefect;

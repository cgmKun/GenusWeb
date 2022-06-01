import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@douyinfe/semi-ui';

import "../../../styles/Dashboard.scss"

class InspectDefect extends Component {
    static propTypes = {
        defect: PropTypes.any,
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
                    <Button type="primary" onClick={this.props.handleCancel}>Cerrar</Button>
                }
                style={{ width: 700 }}
            >
                <div style={{ padding: 12, border: '1px solid var(--semi-color-border)'}}>
                    <p className='pModal'>
                        <span className='tModal'> Issue:   </span>
                        {defect.issueKey}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Status:   </span>
                        {defect.status}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Priority:   </span>
                        {defect.priority}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Severity:   </span>
                        {defect.severity}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Project Key:   </span>
                        {defect.projectKey}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Issue Type:   </span>
                        {defect.issueType}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Created:   </span>
                        {defect.created}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Assignee:   </span>
                        {defect.assignee}
                    </p>
                    <p className='pModal'>
                        <span className='tModal'> Digital Service:   </span>
                        {defect.digitalService}
                    </p>
                    <span className='tModal'> Summary </span>
                    <p className='pModal'>
                        {defect.summary}
                    </p>
                    <span className='tModal'> Description </span>
                    <p className='pModal'>
                        {defect.description}
                    </p>
                </div>
            </Modal>
        )
    }
}

export default InspectDefect;

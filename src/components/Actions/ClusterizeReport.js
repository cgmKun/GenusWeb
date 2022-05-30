import React, {Component} from 'react';
import { Modal, Button } from '@douyinfe/semi-ui';

class ClusterizeReport extends Component {
    constructor() {
        super();

        this.state = {visible: false};
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <>
                <Button onClick={this.showDialog}>Clusterize Report</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    This is the content of a basic modal.
                </Modal>
            </>
        );
    }
}

export default ClusterizeReport;

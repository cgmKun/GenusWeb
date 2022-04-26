import React from 'react';
import { Modal, Button} from '@douyinfe/semi-ui';

import DeffecTable from './DeffectTable';

class DeffectModal extends React.Component {
    constructor() {
        super();
        this.state = { visible: false };
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
                <Button onClick={this.showDialog}>Custom Style</Button>
                <Modal
                    title="Information"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        <Button type="primary" onClick={this.handleOk}>
                            Close
                        </Button>
                    }
                >
                    <DeffecTable/>
                </Modal>
            </>
        );
    }
}

export default DeffectModal
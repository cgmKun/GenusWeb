import React, { Component } from 'react';
import SubmitReportButton from '../components/MyFiles/SubmitReportButton'
import DeleteReport from '../components/DevActions/DeleteReport';
import CreateGroup from '../components/DevActions/CreateGroup';

class DevActions extends Component {
    render () {
        return (
            <div>
                <SubmitReportButton />
                <DeleteReport />
                <CreateGroup />
            </div>
        )
    }
}

export default DevActions
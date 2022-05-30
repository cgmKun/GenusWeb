import React, { Component } from 'react';
import SubmitReportButton from '../components/MyFiles/SubmitReportButton'
import CreateGroup from '../components/Actions/CreateGroup';

class DevActions extends Component {
    render () {
        return (
            <div>
                <SubmitReportButton />
                <CreateGroup />
            </div>
        )
    }
}

export default DevActions
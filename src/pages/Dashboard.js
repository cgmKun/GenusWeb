import { React, Component } from "react";

import { Empty } from '@douyinfe/semi-ui';
import underConstruction from '../images/istockphoto-1273109788-612x612.jpeg';

class Dashboard extends Component {
    render () {
        return(
            <div>
                <Empty
                    image={<img src={underConstruction} className='logo' style={{width: 150, height: 150}} />}
                    darkModeImage={<img src={underConstruction} className='logo' style={{width: 150, height: 150}} />}
                    title={'Function under construction'}
                    description="The current function is not yet open, so stay tuned."
                />
            </div>
        )
    }
}

export default Dashboard
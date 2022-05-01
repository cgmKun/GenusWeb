import React from 'react';
import { Card, Space} from '@douyinfe/semi-ui';


import "../../styles/Dashboard.scss"

class GroupCards extends React.Component {
    render() {
        const { Meta } = Card;

        return (
            <Space className = 'cards-container' >
                <Card className='size-car' bodyStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                    <Meta
                        title="90 issues"
                    />
                </Card>
                <Card className='size-car' >
                    Semi Design is a design system developed and maintained by IES-FE & IES-UED.
                </Card>
                <Card className='size-car' >
                    Semi Design is a design system developed and maintained by IES-FE & IES-UED.
                </Card>
            </Space>

        )

    }
}

export default GroupCards;
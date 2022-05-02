import React from 'react';
import { Card, Row, Col} from '@douyinfe/semi-ui';


import "../../styles/Dashboard.scss"

class GroupCards extends React.Component {
    render() {
        const { Meta } = Card;

        return (
            <Row gutter={16} className='cards-container'>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
                    <Card className='size-car' >
                        Semi Design is a design system developed and maintained by IES-FE & IES-UED.
                    </Card>
                </Col> 
                <Col md={6}>
                    <Card className='size-car' >
                        Semi Design is a design system developed and maintained by IES-FE & IES-UED.
                    </Card>
                </Col> 
                <Col md={6}>
                    <Card className='size-car' >
                        Semi Design is a design system developed and maintained by IES-FE & IES-UED.
                    </Card>
                </Col>   
            </Row>
            

        )

    }
}

export default GroupCards;
import { React, Component } from "react";
import PropTypes from 'prop-types';
import { Table, Tabs} from '@douyinfe/semi-ui';

import { fetchGroupsByReportAndSessionId } from "../../graphql/fields";
import InspectDefect from "./DefectsTable/InspectDefect";


const getRowKey = record => {
    return `${record.issueKey}`;
};

class DefectsOnGroup extends Component {
    static propTypes = {
        reportId: PropTypes.any,
        sessionId: PropTypes.any
    }

    constructor() {
        super();

        this.state = {
            groups: [],
            selectedRowKey: null,
            infoRow: [],
            key: '1',
            visible: false

        };

        this.showDialog = this.showDialog.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onTabClick = this.onTabClick.bind(this)
    }

    setRowKey(record) {
        const selectedRowKey = getRowKey(record);
        this.setState({ selectedRowKey: selectedRowKey });
    }

    onTabClick(key, type) {
        this.setState({ [type]: key });
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    fetchGroupsByReportAndSessionId() {
        const request = fetchGroupsByReportAndSessionId(this.props.reportId, this.props.sessionId);

        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Falied POST');
            }

            return res.json();

        }).then(resData => {
            const group = resData.data.groupsByReportAndSessionId;
            this.setState({ groups: group });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.fetchGroupsByReportAndSessionId();
    }

    render() {
        const groups = this.state.groups;
        const TabList = [];
        const ContentList = [];
        let itemKey = 1; 

        groups.forEach(group => {
            const tab = { tab: group.groupTitle, itemKey: itemKey.toString()};
            TabList.push(tab);

            const content = 
                <div>
                    <Table
                        className='defects-table'
                        columns={this.tableColumns()}
                        dataSource={group.defects}
                        pagination={{ pageSize: 10 }}
                        rowKey={group => getRowKey(group)}
                        onRow={
                            (group) => {
                                return {
                                    onClick: () => {
                                        this.setState({ visible: true, infoRow: group });
                                        this.setRowKey(group);
                                    },
                                }
                            }
                        }
                    />
                    <InspectDefect 
                        defect={this.state.infoRow}
                        visible={this.state.visible}
                        handleCancel={this.handleCancel}
                    />
                </div>

            ContentList.push(content);
            itemKey += 1;
        })

        return (
            <Tabs 
                type="card"
                defaultActiveKey="1"
                tabList={TabList}
                onChange={key => {
                    this.onTabClick(key, 'key');
                }}
            >
                {ContentList[this.state.key - 1]}
            </Tabs>
        );
    }

    tableColumns() {
        return [
            {
                title: 'Issue Key',
                dataIndex: 'issueKey',
                render: (text) => {
                    return (
                        <div>{text}</div>
                    );
                }
            },
            {
                title: 'Summary',
                dataIndex: 'summary',
                render: (text) => {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }

            }
        ];
    }
}

export default DefectsOnGroup
import { React, Component } from "react";
import PropTypes from 'prop-types';
import { Table, Tabs} from '@douyinfe/semi-ui';

import InspectDefect from "./DefectsTable/InspectDefect";


const getRowKey = record => {
    return `${record.issueKey}`;
};

class DefectsOnGroup extends Component {
    static propTypes = {
        groups: PropTypes.any
    }

    constructor() {
        super();

        this.state = {
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

    render() {
        const groups = this.props.groups;
        const TabList = [];
        const ContentList = [];
        let KeywordsList = [];
        let itemKey = 1; 

        groups.forEach(group => {
            const tab = { tab: group.groupTitle, itemKey: itemKey.toString()};
            TabList.push(tab);

            group.keywords.forEach(keyword =>{
                const item = {keyword: keyword};
                KeywordsList.push(item);
            })

            const content = 
                <div>
                    <div>
                        <Table
                            className='defects-table'
                            columns={this.tableColumnsDefects()}
                            dataSource={group.defects}
                            pagination={{ pageSize: 5 }}
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
                    <div>
                        <Table
                            className='defects-table'
                            columns={this.tableColumnsKeywords()}
                            dataSource={KeywordsList}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </div>

            ContentList.push(content);
            KeywordsList = [];
            itemKey += 1;
        })

        return (
            <Tabs 
                collapsible
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

    tableColumnsDefects() {
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

    tableColumnsKeywords() {
        return [
            {
                title: 'Keywords',
                dataIndex: 'keyword',
                render: (text) => {
                    return (
                        <div>{text}</div>
                    );
                }
            },
        ];
    }
}

export default DefectsOnGroup
//create a table for super admins, it has name, last updated, an icon for edit and delete it also has a button to add a
//new super admin it has a search bar to search for a super admin it has a pagination to navigate between pages

import React, { Component } from "react";
import { Table, Button, Input, Pagination } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

class SuperAdminsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchedColumn: "",
      currentPage: 1,
      pageSize: 10,
    };
  }

  handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }

  handleReset(clearFilters) {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getColumnSearchProps(dataIndex, displayName)({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${displayName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleTableChange = (pagination) => {
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  render() {
    const { superAdmins } = this.props;
    const { searchText, currentPage, pageSize } = this.state;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name", "Name"),
      },
      {
        title: "Last Updated",
        dataIndex: "lastUpdated",
        key: "lastUpdated",
        sorter: (a, b) => a.lastUpdated.localeCompare(b.lastUpdated),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <span>
            <Link to={`/super-admins/edit/${record.id}`}>
              <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 8 }}>
                Edit
              </Button>
            </Link>
            <Button type="danger" icon={<DeleteOutlined />} style={{ marginRight: 8 }}>
              Delete
            </Button>
          </span>
        ),
      },
    ];

    const paginatedSuperAdmins = superAdmins.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Add New Super Admin
          </Button>
          <Input.Search
            placeholder="Search Super Admins"
            enterButton={<SearchOutlined />}
            onSearch={(value) => console.log(value)}
            style={{ width: 200, marginRight: 8 }}
          />
        </div>
        <Table
          dataSource={paginatedSuperAdmins}
          columns={columns}
          onChange={this.handleTableChange}
          pagination={{ current: currentPage, pageSize: pageSize, total: superAdmins.length }}
        />
      </div>
    );
  }
}

export default SuperAdminsTable;

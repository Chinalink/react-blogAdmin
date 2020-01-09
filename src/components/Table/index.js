/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-07 11:20:00
 * @LastEditTime : 2020-01-08 10:16:41
 */
import React, { useState, Fragment } from 'react';
import { Table } from 'antd';

const ComTable = (props) => {
  const { pagination, columns, data } = props
  const paginationGroup = {
    showTotal: (total) => `共 ${total} 条`,
    onShowSizeChange: (current, pageSize) => console.log(current, pageSize),
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    ...pagination
  }

  const [selectedRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(false)


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows)
      setLoading(selectedRows.length > 0 ? true : false)
    }
  }
  
  return (
    <Fragment>
      <div>
        {
          selectedRows.map((item, idx) => {
            return <li key={idx}>{item.name}</li>
          })
        }
      </div>
      <Table 
        bordered
        size="middle"
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={data} 
        loading={loading}
        pagination={paginationGroup}
      />
    </Fragment>
  );
}

export default ComTable;

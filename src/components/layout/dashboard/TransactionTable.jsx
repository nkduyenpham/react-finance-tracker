import React, { useState } from 'react';
import { Table, Select, Button } from 'antd';
// dependency for export function
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

const { Option } = Select;

const TransactionTable = ({ mergedData }) => {
    const [typeFilter, setTypeFilter] = useState('');
    const [sortKey, setSortKey] = useState('');

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => `$${text.toFixed(2)}`, // Format amount as currency
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Category',
            dataIndex: 'tag',
            key: 'tag',
        },
    ];

    const handleFilterChange = (value) => {
        setTypeFilter(value);
    };

    const handleSortChange = (key) => {
        setSortKey(key);
    };

    const handleReset = () => {
        setTypeFilter('');
        setSortKey('');
    };

    const exportToCsv = () => {
        const dataToExport = sortedData.map(({ key, ...rest }) => rest); // Remove key from export
        const csv = unparse(dataToExport);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'transactions.csv');
    };

    const filteredData = typeFilter
        ? mergedData.filter((item) => item.type.toLowerCase() === typeFilter.toLowerCase())
        : mergedData;

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortKey === 'date') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === 'amount') {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    return (
        <div className="p-10">
            <div className="flex justify-end mb-5">
                <div className="flex space-x-2 mx-3">
                    <Button onClick={exportToCsv} className="bg-gray-200 hover:bg-gray-300">
                        Export to CSV
                    </Button>
                </div>

                <Select
                    onChange={handleFilterChange}
                    value={typeFilter}
                    placeholder="Filter by type"
                    allowClear
                    className="w-52"
                >
                    <Option value="">All</Option>
                    <Option value="Income">Income</Option>
                    <Option value="Expense">Expense</Option>
                </Select>
            </div>
            <div className="flex justify-center space-x-2 mb-5">
                <Button onClick={() => handleSortChange('date')} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Sort by Date
                </Button>
                <Button onClick={() => handleSortChange('amount')} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Sort by Amount
                </Button>
                <Button onClick={handleReset} className="bg-gray-200 hover:bg-gray-300">
                    Clear Sort
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={sortedData.map((item) => ({ ...item, key: item.id }))}
            />
        </div>
    );

};

export default TransactionTable;

import React from 'react'
import { Line, Pie } from '@ant-design/charts';

const Charts = ({ expenses, income }) => {

    // line chart for expenses

    const data = expenses
        .map((item) => ({
            date: new Date(item.date), // Ensure dates are Date objects
            amount: item.amount
        }))
        .sort((a, b) => a.date - b.date) // Sort by date

    // Convert dates back to strings if needed for chart
    const formattedData = data.map((item) => ({
        date: item.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        amount: item.amount
    }));

    const lineConfig = {
        data: formattedData,
        xField: 'date',
        yField: 'amount',
        autofit: false
    };

    // pie chart for income

    const pieData = income.map((item) => ({
        tag: item.tag,
        amount: item.amount
    }));

    // Pie chart configuration
    const pieConfig = {
        data: pieData,
        angleField: 'amount',
        colorField: 'tag',
        // Optionally add chart configuration here
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-10">
            {/* Line Chart */}
            <div className="flex-1 p-2 md:w-7/12">
                <h3 className="text-lg font-semibold mb-2">SPENDING</h3>
                <div className="p-4 bg-white shadow rounded">
                    <Line {...lineConfig} />
                </div>
            </div>

            {/* Pie Chart */}
            <div className="w-full md:w-5/12 p-2">
                <h3 className="text-lg font-semibold mb-2">EARNING</h3>
                <div className="p-4 bg-white shadow rounded">
                    <Pie {...pieConfig} />
                </div>
            </div>
        </div>
    );
}

export default Charts
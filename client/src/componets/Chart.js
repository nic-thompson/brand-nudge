import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const ProductPriceComparisonChart = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    setCategories(uniqueCategories);
    setSelectedCategory(uniqueCategories[0]);
  }, [data]);

  const productData = data.filter((item) => item.category === selectedCategory);

  const averagePrices = productData.reduce((accumulator, currentItem) => {
    const { retailer, base_price } = currentItem;
    if (!accumulator[retailer]) {
      accumulator[retailer] = {
        totalBasePrice: 0,
        count: 0,
      };
    }
    accumulator[retailer].totalBasePrice += parseFloat(base_price);
    accumulator[retailer].count++;
    return accumulator;
  }, {});

  const chartData = [['Retailer', 'Average Base Price']];
  Object.keys(averagePrices).forEach((retailer) => {
    const averageBasePrice =
      averagePrices[retailer].totalBasePrice / averagePrices[retailer].count;
    chartData.push([retailer, averageBasePrice]);
  });

  return (
    <div>
      <div className="select">
        <label>Select a product category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Chart
        width={'800px'}
        height={'400px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: `Average ${selectedCategory} Base Price Comparison`,
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Average Base Price (£)',
            minValue: 0,
          },
          vAxis: {
            title: 'Retailer',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ProductPriceComparisonChart;

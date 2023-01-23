import React from "react";
import { Chart } from "react-google-charts";

const ChartCustom = ({type, data}) => {
    const dataChart = data.map(item => [item.createdAt?.split('T')[0], (item?.originDetails?.details?.length || 0) * 2])
   
    return (
        <div>
        <Chart
            chartType={type}
            data={[
            ["Días", "Transacciones de Bonificación"],
            ...dataChart
            ]}
            width="100%"
            height="400px"
            legendToggle
        />
        </div>
    );
};

export default ChartCustom;

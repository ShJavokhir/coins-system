import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { DemoWrapper } from "./Demo.style";
import SeoProvider from "../../../Data/SeoProvider";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Demo = () => {
  const [options, setOptions] = useState({
    stroke: {
        curve: 'smooth'
    },
    chart: {
        id: 'apexchart-example',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false,
        }
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar"]
    },
    yaxis: {
        labels: {
            formatter: function(value) {
                let val = Math.abs(value)
                if (val >= 1000000) {
                    val = (val / 1000000).toFixed(2) + ' M'
                }else if(val >= 1000){
                    val = (val / 1000).toFixed(0) + ' K'
                }
                return val
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#06065a'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
        },
    },
})
const [series, setSeries] = useState( [{
    name: 'series-1',
    data: [10000000, 20000000, 35000000]
}])

useEffect(() => {
    SeoProvider.getAllGroup(1, 300)
    .then((res) => {
      console.log("asas", res.data.data);
      setOptions({
          xaxis: {
              categories: res.data.data.map(item=>item.name)
          },
          yaxis: {
            labels: res.data.data.map(item=>item.totalBalance)
            },
      })
      setSeries([{
          data: res.data.data.map(item=>item.studentCount)
      }])
    })
    .catch(err=>{
        console.log(err);
    });
  }, []);

  return (
    <DemoWrapper>
      {typeof window !== "undefined" && (
        <Chart
          options={options}
          series={series}
          type="line"
          width={800}
          height={400}
        />
      )}
    </DemoWrapper>
  );
};

export default Demo;

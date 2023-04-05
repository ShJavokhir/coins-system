import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SeoProvider from "../../../../../../Data/SeoProvider";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Charts = () => {
  const [options, setOptions] = useState({
    stroke: {
      curve: "smooth",
    },
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [1, 2, 3],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          let val = Math.abs(value);
          if (val >= 1000000) {
            val = (val / 1000000).toFixed(2) + " M";
          } else if (val >= 1000) {
            val = (val / 1000).toFixed(0) + " K";
          }
          return val;
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#3d67742f"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [10000000, 20000000, 35000000],
    },
  ]);

  useEffect(() => {
    SeoProvider.getAllGroup(1, 300)
      .then((res) => {
        console.log("asas", res.data.data);
        setOptions({
          xaxis: {
            categories: res.data.data.map((item) => item.name),
          },
          yaxis: {
            labels: res.data.data.map((item) => item.totalBalance),
          },
        });
        setSeries([
          {
            data: res.data.data.map((item) => item.totalBalance),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {typeof window !== "undefined" && (
        <>
          <h3 style={{ marginTop: 30, fontFamily: "Azo sans" }}>
            Guruhlar bo`yicha reyting
          </h3>
          <Chart
            options={options}
            series={series}
            type="area"
            width={"95%"}
            height={400}
          />
        </>
      )}
    </div>
  );
};

export default Charts;

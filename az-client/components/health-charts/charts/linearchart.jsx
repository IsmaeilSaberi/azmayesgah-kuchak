"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";
function LinearChart() {
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [18, 20, 25, 30, 40, 22, 23],
            label: "BMI",
            borderColor: "#7900FF",
            backgroundColor: "#F5F5DC",
            fill: false,
          },
          {
            data: [80, 85, 98, 100, 95, 75, 77],
            label: "weight",
            borderColor: "#548CFF",
            backgroundColor: "#F5F5DC",
            fill: false,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      {/* line chart */}
      <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">
        نمودار خطی BMI و وزن شما
      </h1>
      <div className="h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default LinearChart;

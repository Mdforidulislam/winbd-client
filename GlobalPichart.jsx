
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const GlobalPichart = () => {
    const [subPie, setSubpie] = useState({
        series: [44, 55, 67, 83],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',

            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                          
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return 249
                            }
                        }
                    }
                }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
        }
    });

    return (
        <div>
            <div>
                
                <div className="bg-GlobalGray shadow-gray-700 shadow-sm w-[380px] h-[460px] items-center rounded-lg mt-4" id="chart">
                    <h1 className="text-white font-semibold text-xl py-4 px-2">Statistics</h1>
                    <ReactApexChart className="mt-16" options={subPie.options} series={subPie.series} type="pie" height={360} />
                <div className="flex justify-around gap-5">
                    <p className="text-white font-semibold">$ 645.34</p>
                    <p className="text-white font-semibold">$ 335.34</p>
                </div>
                    <p className="text-white text-center font-semibold">$ 215.34</p>
                </div>
                <div id="html-dist"></div>
            </div>
        </div>
    );
};

export default GlobalPichart;

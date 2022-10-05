import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(String(coinId))
    );
    console.log(data);

    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={
                        [
                            {
                                data: data?.map((price) => {
                                    return {
                                        x: price.time_close,
                                        y: [
                                            Number(price.open).toFixed(3),
                                            Number(price.high).toFixed(3),
                                            Number(price.low).toFixed(3),
                                            Number(price.close).toFixed(3),
                                        ],
                                    };
                                }),
                            },
                        ] as any
                    }
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {show: false},
                        stroke: {
                            curve: "smooth",
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisTicks: {show: false},
                            axisBorder: {show: false},
                            labels: {
                                show: false,
                                datetimeFormatter: {month: "mmm 'yy"},
                            },
                            type: "datetime",
                            categories:
                                data?.map((price) =>
                                    Number(price.time_close)
                                ) ?? [],
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#0be881"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;

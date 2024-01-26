import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
// third-party
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, CardHeader, colors } from '@mui/material';

// chart options
const areaChartOptions: any = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    },
        
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ reportByWeek }: any) => {
    const theme = useTheme();
    const secondary: any = theme.palette.primary.main;
    const line: any = theme.palette.divider;

    const [series, setSeries] = useState([
        {
            name: 'Booking',
            data: []
        }
    ]);

    const [options, setOptions] = useState<any>(areaChartOptions);



    useEffect(() => {
        if (reportByWeek) {
            console.log(" Report Week ",reportByWeek)
            const data: any = reportByWeek?.booking
            const categories: any = reportByWeek?.days?.map((date:string) => moment(date).format('MMM DD  YYYY')) || [];
            setSeries([
                {
                    name: 'Booking',
                    data: data
                }
            ])
            setOptions((prevState: any) => ({
                ...prevState,
                colors: [colors.indigo[500]],
                xaxis: {
                    categories: categories,
                    labels: {
                        style: {
                            colors: [
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                                theme.palette.mode === 'dark' ? "#fff" : "#000",
                            ]
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: line
                    },
                    tickAmount: 7
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: theme.palette.mode === 'dark' ? ["#fff"] : ["#000"]
                        }
                    }
                },
                grid: {
                    borderColor: line
                },
                tooltip: {
                    theme: theme.palette.mode,
                }
            }));
        }
    }, [reportByWeek, theme.palette.mode, secondary, line]);




    return (
        <Card sx={{ 
            height: '100%',
            transition: '0.3s',
            borderRadius: '10px',
            boxShadow: '0px 0px 80px 0px rgb(0 0 0 / 10%)',
            '&:hover': {
                boxShadow: '0px 0px 80px 0px rgb(0 0 0 / 30%)'
            }

        }}>
            <CardHeader title="Weekly Booking" />
            <CardContent>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={433}
                />
            </CardContent>
        </Card>
    );
};

export default IncomeAreaChart;
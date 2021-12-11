import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Dropdown, Button, ButtonGroup, DropdownButton } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

import {
    FaTrash, FaSyncAlt, FaSearchPlus, FaSearchMinus,
    FaExpandAlt, FaCompressAlt, FaPen, FaCalendar, FaCheck, FaChartBar
} from 'react-icons/fa';
import DropdownItem from '@restart/ui/esm/DropdownItem';

const chartColors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7", 
"#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0",
"#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78"];

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
        variant="light"
        className="m-1 p-1"
        size={"sm"}
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
      {children}
    </Button>
));

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function EventChart(props) {
    const [datasets, setDatasets] = useState([]);
    const [labels, setLabels] = useState([]);
    const [metric, setMetric] = useState("day");
    const [colSize, setColSize] = useState(6);
    const [editTrackPeriod, setEditTrackPeriod] = useState(false);
    const [chartType, setChartType] = useState(props.chartType);

    const dayFromStart = Math.floor((Math.floor(new Date() / 1000) - 1638720000) / 86400);
    const [trackPeriod, setTrackPeriod] = useState([0, dayFromStart]);

    const loadChartData = () => {
        if (datasets.length === 0) {
            const dummyDataset = {
                label: "loading",
                data: {},
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            };
            let newDatasets = [];
            for (let i = 0; i < props.eventData.length; i++) {
                newDatasets.push(dummyDataset);
            }
            setDatasets(newDatasets.slice());
        }
    }

    const loadEventData = (idx, eventData) => {
        let eventType = eventData.eventType == "全部" ? "All" : eventData.eventType;
        axios.get("http://localhost:5000/api/events", {
            params: {
                event: eventType,
                section: eventData.section,
                subSection: eventData.subSection,
                metric: metric,
                start: trackPeriod[0],
                end: trackPeriod[1],
                groupFunc: eventData.groupFunc
            }
        })
            .then((res) => {
                console.log(res.data);
                if(eventData.groupFunc != "GROUP") {
                    let newDatasets = datasets;
                    newDatasets[idx] = {
                        label: "subSection" in eventData ? `${eventType}/${eventData.section}/${eventData.subSection}` :
                            `${eventType}/${eventData.section}`,
                        data: res.data,
                        backgroundColor: chartColors[idx >= chartColors.length ? 0 : idx],
                        borderColor: chartColors[idx >= chartColors.length? 0 : idx],
                    };
                    setDatasets(newDatasets.slice());
                }
                else { //use group
                    let newDatasets = [];
                    let count = 0;
                    for(let eventVal in res.data.data) {
                        newDatasets.push({
                            label: eventVal,
                            data: res.data.data[eventVal],
                            backgroundColor: chartColors[count >= chartColors.length ? 0 : count],
                            borderColor: chartColors[idx >= chartColors.length ? 0 : idx],
                        });
                        count ++;
                    }
                    setDatasets(newDatasets);
                }
            });
    }

    useEffect(() => {
        // setDatasets([]);
        let datasetsTmp = datasets.slice();
        for (let i = 0; i < datasetsTmp.length; i++) {
            if(props.eventData[i] !== undefined) loadEventData(i, props.eventData[i]);
        }
    }, [metric]);

    useEffect(() => {
        let datasetsTmp = datasets.slice();
        if (datasetsTmp.length === 0) {
            loadChartData();
        }
        for (let i = 0; i < datasetsTmp.length; i++) {
            let dataset = datasetsTmp[i];
            if (dataset.label === "loading") {
                if(props.eventData[i] !== undefined) loadEventData(i, props.eventData[i]);
                break;
            }
        }
        updateLablels();
    }, [datasets]);

    const titleText = (props.eventData.length === 1 ? (props.eventData[0].subSection !== "" && props.eventData[0].subSection !== undefined) ?
        `${props.eventData[0].eventType} 事件 (${props.eventData[0].section} : ${props.eventData[0].subSection})` :
        `${props.eventData[0].eventType} 事件 (${props.eventData[0].section} 使用者)` :
        `事件比對圖`)
    const subTitleText = `整合函數：${props.eventData[0].groupFunc || "COUNT"}`

    const options = {
        responsive: true,
        scales: {
            y: { 
                ticks: { precision: 0 },
                stacked: chartType == "堆疊圖"
            },
            x: {
                stacked: chartType == "堆疊圖"
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: [titleText, subTitleText]
            },
        },
    };

    const updateLablels = () => {  
        setLabels((metric == "day") ?
        [...Array(trackPeriod[1] - trackPeriod[0] + 1)].map((v, i) => {
            return `12/${i + 6 + trackPeriod[0]}`;
        }) :
        [...Array((trackPeriod[1] - trackPeriod[0] + 1) * 24)].map((v, i) => {
            return `12/${Math.floor(i / 24) + 6 + trackPeriod[0]}(${i % 24})`;
        }));
    }

    return <Col lg={colSize}>
        <div className="d-block position-relative card shadow-sm m-2">
            <div className="w-100 position-absolute d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-row align-items-center ps-2" style={{ fontSize: "0.8rem" }}>
                        {
                            editTrackPeriod ?
                                <div className="d-flex">
                                    <DropdownButton variant="outline-secondary" size="sm" title={`12/${trackPeriod[0]+6}`}>
                                        {
                                            [...Array(14).keys()].map((idx) => {
                                                return <Dropdown.Item key={idx} onClick={()=>{
                                                    let newPeriod = trackPeriod.slice();
                                                    newPeriod[0] = idx;
                                                    setTrackPeriod(newPeriod);
                                                }}>
                                                    {`12/${idx+6}`}
                                                </Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>
                                    <span>~</span>
                                    <DropdownButton variant="outline-secondary" size="sm" title={`12/${trackPeriod[1]+6}`}>
                                        {
                                            [...Array(14-trackPeriod[0]).keys()].map((idx) => {
                                                return <Dropdown.Item key={idx} onClick={()=>{
                                                    let newPeriod = trackPeriod.slice();
                                                    newPeriod[1] = idx + newPeriod[0];
                                                    setTrackPeriod(newPeriod);
                                                }}>
                                                    {`12/${idx+6+trackPeriod[0]}`}
                                                </Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>
                                </div> :
                                <div>
                                    {`12/${trackPeriod[0] + 6}~12/${trackPeriod[1] + 6}`}
                                </div>
                        }
                        <Button variant="light" className="m-1 p-1"
                            onClick={() => {
                                if(editTrackPeriod) {
                                    if(trackPeriod[1] >= trackPeriod[0]){
                                        setDatasets([]);
                                        setEditTrackPeriod(false);
                                    }
                                    else alert("日期錯誤")
                                }
                                else{
                                    setEditTrackPeriod(true);
                                }
                            }}
                        >
                            {editTrackPeriod ? <FaCheck /> : <FaCalendar />}
                        </Button>
                    </div>
                    {
                        metric == "hour" ?
                            <Button variant="light" className="m-1 p-1"
                                onClick={() => { setMetric("day"); }}
                            >
                                <FaSearchMinus />
                            </Button> :
                            <Button variant="light" className="m-1 p-1"
                                onClick={() => { setMetric("hour"); }}
                            >
                                <FaSearchPlus />
                            </Button>
                    }
                </div>
                <div className="d-flex flex-row">
                    <Dropdown className="d-flex">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <FaChartBar/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="primary">
                            {
                                ["直條圖","堆疊圖","折線圖"].map((val, idx) => {
                                    return <Dropdown.Item key={val} onClick={() => { 
                                        setChartType(val);
                                    }}>
                                        {val}
                                    </Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="light" className="m-1 p-1"
                        onClick={() => {
                            setColSize(colSize == 6 ? 12 : 6);
                        }}
                    >
                        {colSize == 6 ? <FaExpandAlt /> : <FaCompressAlt />}
                    </Button>
                    <Button variant="light" className="m-1 p-1"
                        onClick={() => { setDatasets([]) }}
                    >
                        <FaSyncAlt />
                    </Button>
                    <Button variant="light" className="m-1 p-1"
                        onClick={() => { props.deleteChart(props.idx) }}
                    >
                        <FaTrash />
                    </Button>
                </div>
            </div>

            <div className="p-2">
                {
                    chartType == "折線圖"?
                    <Line options={options} data={{
                        labels,
                        datasets
                    }} />:
                    <Bar options={options} data={{
                        labels,
                        datasets
                    }} />
                }
            </div>
        </div>
    </Col>
}

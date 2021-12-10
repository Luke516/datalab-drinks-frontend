import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Dropdown, Button } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import axios from 'axios';

import { FaTrash, FaSyncAlt, FaSearchPlus, FaSearchMinus, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function EventChart(props) {
    const [datasets, setDatasets] = useState([]);
    const [labels, setLabels] = useState([]);
    const [metric, setMetric] = useState("day");
    const [colSize, setColSize] = useState(6);

    const loadChartData = () => {
        if(datasets.length === 0) {
            const dummyDataset = {
                label: "loading",
                data: {},
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            };
            let newDatasets = [];
            for(let i=0; i<props.eventData.length; i++) {
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
                metric: metric
            }
        })
            .then((res) => {
                let newDatasets = datasets;
                newDatasets[idx] = {
                    label: "subSection" in eventData ? `${eventType}/${eventData.section}/${eventData.subSection}`:
                        `${eventType}/${eventData.section}`,
                    data: res.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                };
                setDatasets(newDatasets.slice());
                // setLabels([6,7,8,9]);
            });
    }

    useEffect(() => {
        // setDatasets([]);
        let datasetsTmp = datasets.slice();
        for(let i=0; i<datasetsTmp.length; i++) {
            loadEventData(i, props.eventData[i]);
        }
    }, [metric]);

    useEffect(() => {
        let datasetsTmp = datasets.slice();
        if(datasetsTmp.length === 0){
            loadChartData();
        }
        for(let i=0; i<datasetsTmp.length; i++) {
            let dataset = datasetsTmp[i];
            if(dataset.label === "loading"){
                loadEventData(i, props.eventData[i]);
                break;
            }
        }
    }, [datasets]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.eventData.subSection !== "" ?
                    `${props.eventData.eventType} 事件 (${props.eventData.section} : ${props.eventData.subSection})` :
                    `${props.eventData.eventType} 事件 (${props.eventData.section} 使用者)`
            },
        },
    };

    return <Col lg={colSize}>
        <div className="d-block position-relative card shadow-sm m-2">
            <div className="w-100 position-absolute d-flex justify-content-between">
                <div>
                    <Button variant="light" className="m-2 p-1"
                        onClick={() => {
                            if (metric != "day") setMetric("day");
                        }}
                    >
                        <FaSearchMinus />
                    </Button>
                    <Button variant="light" className="m-2 p-1"
                        onClick={() => {
                            if (metric != "hour") setMetric("hour");
                        }}
                    >
                        <FaSearchPlus />
                    </Button>
                    <Button variant="light" className="m-2 p-1"
                        onClick={() => {
                            setColSize(colSize == 6 ? 12: 6);
                        }}
                    >
                        {colSize == 6? <FaExpandAlt /> : <FaCompressAlt />}
                    </Button>
                </div>
                <div>
                    <Button variant="light" className="m-2 p-1"
                        onClick={loadChartData}
                    >
                        <FaSyncAlt />
                    </Button>
                    <Button variant="light" className="m-2 p-1"
                        onClick={() => { props.deleteChart(props.idx) }}
                    >
                        <FaTrash />
                    </Button>
                </div>
            </div>

            <div className="p-2">
                <Bar options={options} data={{
                    labels,
                    datasets
                }} />
            </div>
        </div>
    </Col>
}

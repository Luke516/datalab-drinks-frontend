import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row, Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import { AppContext } from "../App";
import EventChart from "./EventChart";

import { FaTrash, FaPlus } from 'react-icons/fa';

import "./EventView.css";

export default function EventView(props) {
    const appContext = useContext(AppContext);
    const [selectedEventDatas, setSelectedEventDatas] = useState([[{
        eventType: "全部",
        section: "全部"
    }]]);
    const [eventTypes, setEventTypes] = useState(["全部"]);
    const [curEventType, setCurEventType] = useState("選擇事件類型");

    const [curUserSection, setCurUserSection] = useState("全部");
    const [curUserSubSection, setCurUserSubSection] = useState("");
    const [userSubSections, setUserSubSections] = useState([]);
    const [compareEventDatas, setCompareEventDatas] = useState([]);

    const userSections = ["全部", "實驗組", "小組", "使用者"]

    useEffect(() => {
        axios.get("http://localhost:5000/api/events/types")
            .then((res) => {
                // console.log(res.data);
                setEventTypes(["全部", ...res.data]);
            });
    }, []);

    const fetchSubSections = (userSection) => {
        setUserSubSections([]);
        axios.get("http://localhost:5000/api/events/sections?type=" + userSection)
            .then((res) => {
                console.log(res.data);
                setUserSubSections(res.data);
                if (res.data.length > 0) {
                    setCurUserSubSection(res.data[0]);
                }
            });
    }

    const addChart = () => {
        if (curEventType == "選擇事件類型") {
            alert("選擇事件類型")
        }
        else {
            let newEvents = selectedEventDatas;
            let comparedEvents = compareEventDatas;
            if(comparedEvents.length > 0){
                let lastComparedEvent = comparedEvents[comparedEvents.length - 1];
                if(lastComparedEvent.eventType !== curEventType &&
                    lastComparedEvent.section !== curUserSection &&
                    lastComparedEvent.subSection !== curUserSubSection){
                        comparedEvents.push({
                            eventType: curEventType,
                            section: curUserSection,
                            subSection: curUserSubSection
                        });
                    }
            }
            else {
                comparedEvents.push({
                    eventType: curEventType,
                    section: curUserSection,
                    subSection: curUserSubSection
                });
            }
            newEvents.push(comparedEvents.slice());
            // newEvents = [comparedEvents.slice(), ...newEvents];
            setSelectedEventDatas(newEvents.slice());
            setCompareEventDatas([]);
        }
    }

    const addCompareEvent = () => {
        if (curEventType == "選擇事件類型") {
            alert("選擇事件類型")
        }
        else {
            let newEvents = compareEventDatas;
            newEvents.push({
                eventType: curEventType,
                section: curUserSection,
                subSection: curUserSubSection
            });
            setCompareEventDatas(newEvents.slice());
        }
    }

    const deleteChart = (idx) => {
        let newEvents = selectedEventDatas;
        newEvents.splice(idx, 1);
        setSelectedEventDatas(newEvents.slice());
    }

    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12}>
                    <Row className="d-flex flex-row  card shadow-sm m-2 p-2 justify-content-center align-items-center">
                        <Col md={12} lg={9} className="d-flex flex-column align-items-center my-1">
                            {compareEventDatas.map((compareEventData) => {
                                return <div>
                                    <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>使用者群組:</span>
                                    {compareEventData.section}
                                    {
                                        compareEventData.subSection &&
                                            <span>-{compareEventData.subSection}</span>
                                    }
                                    <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>事件類型:</span>
                                    {compareEventData.eventType}
                                </div>
                            })}
                            <div className="d-flex flex-row align-items-center my-1">
                                <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>使用者群組</span>
                                <Dropdown className="mx-1">
                                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary">
                                        {curUserSection}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            userSections.map((userSection, idx) => {
                                                return <Dropdown.Item onClick={() => {
                                                    fetchSubSections(userSection)
                                                    setCurUserSection(userSection)
                                                    if (userSection == "全部") setCurUserSubSection("")
                                                }
                                                }>
                                                    {userSection}
                                                </Dropdown.Item>
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>

                                {
                                    userSubSections.length > 0 &&
                                    <Dropdown className="mx-1">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary">
                                            {curUserSubSection}
                                            {/* {userSections.length} */}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                userSubSections.map((userSubSection, idx) => {
                                                    return <Dropdown.Item onClick={() => {
                                                        setCurUserSubSection(userSubSection);
                                                    }}>
                                                        {userSubSection}
                                                    </Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>事件類型</span>
                                <Dropdown className="mx-1">
                                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary">
                                        {curEventType}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            eventTypes.map((eventType, idx) => {
                                                return <Dropdown.Item onClick={() => { setCurEventType(eventType) }}>
                                                    {eventType}
                                                </Dropdown.Item>
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button variant="outline-secondary" className="d-flex align-items-center" onClick={addCompareEvent}>
                                    新增比對事件 <FaPlus className="ms-1" />
                                </Button>
                            </div>
                        </Col>
                        <Col md={12} lg={3} className="d-grid gap-2">
                            <Button className="btn-block d-flex align-items-center mx-3 justify-content-center" onClick={addChart}>
                                新增表格 <FaPlus className="ms-1" />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                {selectedEventDatas.map((selectedEventData, idx) => {
                    let key = selectedEventData.map(data => `${data.eventType}${data.section}${data.subSection ? data.subSection : ""}`).join("");
                    return <EventChart key={key}
                        eventData={selectedEventData} idx={idx} deleteChart={deleteChart} />
                })}
            </Row>
        </Container>
    )
}
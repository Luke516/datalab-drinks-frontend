import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row, Dropdown, Button, DropdownButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from 'axios';
import { AppContext } from "../App";
import EventChart from "./EventChart";

import { FaTrash, FaPlus, FaInfoCircle } from 'react-icons/fa';

import "./EventView.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
));

export default function EventView(props) {
    const appContext = useContext(AppContext);
    const [selectedChartTypes, setSelectedChartTypes] = useState(["直條圖", "堆疊圖"]);
    const [selectedEventDatas, setSelectedEventDatas] = useState([
        [{
            eventType: "全部",
            section: "全部"
        }], [
            {
                eventType: "StartPlanting",
                section: "實驗組",
                subSection: 0
            },
            {
                eventType: "StartPlanting",
                section: "實驗組",
                subSection: 1
            },
            {
                eventType: "StartPlanting",
                section: "實驗組",
                subSection: 2
            },
            {
                eventType: "StartPlanting",
                section: "實驗組",
                subSection: 3
            },
        ]]);
    const [eventTypes, setEventTypes] = useState(["全部"]);
    const [curEventType, setCurEventType] = useState("選擇事件類型");

    const [curGroupFunc, setCurGroupFunc] = useState("COUNT");
    const [curUserSection, setCurUserSection] = useState("全部");
    const [curUserSubSection, setCurUserSubSection] = useState("");
    const [userSubSections, setUserSubSections] = useState([]);
    const [compareEventDatas, setCompareEventDatas] = useState([]);
    const [showGroupFuncHint, setShowGroupFuncHint] = useState({
        "SUM": true,
        "AVG": true,
        "GROUP": true
    });

    const userSections = ["全部", "實驗組", "小組", "使用者"]

    const groupFuncAvailableEvents = {
        "SUM": ["PlantingDuration", "GoalProgress", "FriendsInRoom", "FriendStoryScrollDistance", "StoryScrollDistance", "CardScrollDistance", "FocusOnScrollDistance"],
        "AVG": ["PlantingDuration", "GoalProgress", "FriendsInRoom", "FriendStoryScrollDistance", "StoryScrollDistance", "CardScrollDistance", "FocusOnScrollDistance"],
        "GROUP": [
            "MemberId", "FriendId", "FriendRank", "SurveyPerson", "UserId", "UnlikeStoryId", "LikeStoryId", "ShareStoryId", "CardId", "PreviewPerson", "PlantingDuration", "GoalProgress", "FriendsInRoom",
        ]
    }

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

    const addChart = (chartType) => {
        if (curEventType == "選擇事件類型") {
            alert("選擇事件類型")
            return;
        }
        if(curGroupFunc !== "COUNT") {
            if(!groupFuncAvailableEvents[curGroupFunc].includes(curEventType)) {
                alert("整合函數不支援");
                return;
            }
        }
        let newEvents = selectedEventDatas;
        let comparedEvents = compareEventDatas;
        let newChartTypes = selectedChartTypes;
        if(comparedEvents.length > 0){
            let lastComparedEvent = comparedEvents[comparedEvents.length - 1];
            if(lastComparedEvent.eventType !== curEventType ||
                lastComparedEvent.section !== curUserSection ||
                lastComparedEvent.subSection !== curUserSubSection){
                    comparedEvents.push({
                        eventType: curEventType,
                        section: curUserSection,
                        subSection: curUserSubSection,
                        groupFunc: curGroupFunc
                    });
                }
        }
        else {
            comparedEvents.push({
                eventType: curEventType,
                section: curUserSection,
                subSection: curUserSubSection,
                groupFunc: curGroupFunc
            });
        }
        newEvents.push(comparedEvents.slice());
        // newEvents = [comparedEvents.slice(), ...newEvents];
        setSelectedEventDatas(newEvents.slice());
        setCompareEventDatas([]);

        newChartTypes.push(chartType);
        setSelectedChartTypes(newChartTypes.slice());
    }

    const addCompareEvent = () => {
        if (curEventType == "選擇事件類型") {
            alert("選擇事件類型")
            return;
        }
        if(curGroupFunc !== "COUNT") {
            if(!groupFuncAvailableEvents[curGroupFunc].includes(curEventType)) {
                alert("整合函數不支援");
                return;
            }
        }
    
        let newEvents = compareEventDatas;
        newEvents.push({
            eventType: curEventType,
            section: curUserSection,
            subSection: curUserSubSection,
            groupFunc: curGroupFunc
        });
        setCompareEventDatas(newEvents.slice());
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
                        <Col md={12} lg={3} className="d-flex flex-row align-items-center">
                            <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>整合函數</span>
                            <DropdownButton variant="outline-secondary" title={curGroupFunc} className="mx-1">
                                {
                                    ["COUNT", "SUM", "AVG", "GROUP"].map((val) => {
                                        return <Dropdown.Item key={val} onClick={()=>{
                                            if(showGroupFuncHint[val]) {
                                                alert(
                                                    `請注意：${val}函數` +
                                                    ((val == "GROUP") ? "不支援事件比對！！且" : "") +
                                                    `只支援以下事件類型` +  "\n" +
                                                    groupFuncAvailableEvents[val].join(", \n")
                                                );
                                                let newHint = Object.assign({}, showGroupFuncHint);
                                                newHint[val] = false;
                                                setShowGroupFuncHint(newHint);
                                            }
                                            setCurGroupFunc(val);
                                            setCurEventType("選擇事件類型");
                                            setCompareEventDatas([]);
                                        }}>
                                            {val}
                                        </Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                            <OverlayTrigger
                                style={{width: "25rem"}}
                                key={"bottom"}
                                placement={"bottom"}
                                overlay={
                                    <Tooltip id={`tooltip-${"bottom"}`} style={{fontSize: "0.6rem"}}>
                                        <p>整合函數代表如何整合一段時間內的事件資料以在圖表中檢視。</p>
                                        <p>COUNT<br/> 代表時間內事件發生的數量</p>
                                        <p>SUM<br/>代表時間內事件數值的總和</p>
                                        <p>AVG<br/>代表時間內事件數值的平均</p>
                                        <p>(因此通常SUM，AVG需要在事件數值大小具有意義並可比較的情況使用)</p>
                                        <p>GROUP<br/>與COUNT類似是計算事件發生數量，但會再根據事件數值不同顯示個別發生次數</p>
                                        <p>(不支援事件對照，因為本身的數值已為對照)</p>
                                        <br/>
                                        <p>p.s. GROUP這名字取的有點爛。其他三個都是SQL語法中的函數</p>
                                    </Tooltip>
                                }
                            >
                                <div><FaInfoCircle /></div>
                            </OverlayTrigger>
                        </Col>
                        <Col md={12} lg={7} className="d-flex flex-column align-items-center my-1">
                            {compareEventDatas.map((compareEventData, idx) => {
                                return <div key={`${compareEventData.eventType}${compareEventData.section}${compareEventData.subSection}`}>
                                    <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>使用者群組:</span>
                                    {compareEventData.section}
                                    {
                                        (compareEventData.subSection !== undefined && compareEventData.subSection !== "")  &&
                                            <span>-{compareEventData.subSection}</span>
                                    }
                                    <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>事件類型:</span>
                                    {compareEventData.eventType}
                                    {
                                        idx == 0 &&
                                        <Button variant="light" className="m-1 p-1"
                                            onClick={() => { setCompareEventDatas([]) }}
                                        >
                                            <FaTrash />
                                        </Button> 
                                    }
                                </div>
                            })}
                            <div className="d-flex flex-row align-items-center my-1">
                                <span className="ms-2 text-muted" style={{ fontSize: "1rem" }}>使用者群組</span>
                                <Dropdown className="mx-1">
                                    <Dropdown.Toggle id="dropdown-button-dark-example2" variant="outline-secondary">
                                        {curUserSection}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            userSections.map((userSection, idx) => {
                                                return <Dropdown.Item key={userSection} onClick={() => {
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
                                                    return <Dropdown.Item key={userSubSection} onClick={() => {
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
                                    <Dropdown.Toggle id="dropdown-button-dark-example3" variant="outline-secondary">
                                        {curEventType}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            curGroupFunc === "COUNT" ? 
                                            eventTypes.map((eventType, idx) => {
                                                return <Dropdown.Item key={eventType} onClick={() => { setCurEventType(eventType) }}>
                                                    {eventType}
                                                </Dropdown.Item>
                                            }) : 
                                            groupFuncAvailableEvents[curGroupFunc].map((eventType, idx) => {
                                                return <Dropdown.Item key={eventType} onClick={() => { setCurEventType(eventType) }}>
                                                    {eventType}
                                                </Dropdown.Item>
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                {
                                    curGroupFunc != "GROUP" &&
                                    <Button variant="outline-secondary" className="d-flex align-items-center" onClick={addCompareEvent}>
                                        新增比對事件 <FaPlus className="ms-1" />
                                    </Button>
                                }
                            </div>
                        </Col>
                        <Col md={12} lg={2} className="d-grid gap-2">
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    新增表格 <FaPlus className="ms-1" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="primary">
                                    {
                                        ["直條圖","堆疊圖","折線圖"].map((chartType, idx) => {
                                            return <Dropdown.Item key={chartType} onClick={() => { 
                                                addChart(chartType);
                                            }}>
                                                {chartType}
                                            </Dropdown.Item>
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                {selectedEventDatas.map((selectedEventData, idx) => {
                    let chartType = selectedChartTypes[idx] || "直條圖";
                    let key = selectedEventData.map(data => `${data.eventType}${data.section}${data.subSection ? data.subSection : ""}`).join("");
                    key = key + chartType;
                    return <EventChart key={key}
                        eventData={selectedEventData} idx={idx} deleteChart={deleteChart} chartType={chartType} />
                })}
            </Row>
        </Container>
    )
}
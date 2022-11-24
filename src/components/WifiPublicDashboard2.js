import React, { useEffect, useState, memo, useCallback } from 'react';
// import writeToExcel from './writeToExcel';
// import { CanvasJSChart } from "canvasjs-react-charts";
import { useDispatch, useSelector } from 'react-redux'
import { Select, FormControl, MenuItem } from '@mui/material'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label
} from 'recharts';
import WifiIcon from '@mui/icons-material/Wifi';
import './WiFiPublicDashboard.css';
// import { CSVLink } from 'react-csv';
// import { ExportCSV } from './ExportCSV';
import logo from '../logo.png'
import { dataAction } from '../store/reducers/dataReducer';

const { ipcRenderer } = window.require("electron");

let UTCtoISTDate = 0
let getDataTimer = 0

const WiFiPublicDashboard1 = (props) => {

    const [graphtime, setGraphtime] = useState(1000);
    const [dataPoints, setDataPoints] = useState([{ x: 1, y: null }, { x: 2, y: null }, { x: 3, y: null }, { x: 4, y: null }, { x: 5, y: null }, { x: 6, y: null }, { x: 7, y: null }, { x: 8, y: null }, { x: 9, y: null }, { x: 10, y: null }]);
    const [seconds, setSeconds] = useState(0)
    const [apiheader, setApiheader] = useState(0)
    // const [apidata, setApiData] = useState([])
    const [shiftleft, setShiftleft] = useState(0)
    // const [render, setRender] = useState(1)
    // const [apiid, setApiid] = useState(0);
    const [packetNumber, setPacketNumber] = useState(0)
    const [time, setTime] = useState(0);
    const [pulse, setPulse] = useState(0);
    const [countArr, setCountArr] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [filenameDate, setFilenameDate] = useState('')
    // const [devicestatus, setDevicestatus] = useState("Device is Offline");
    // const [checked, setChecked] = useState({ deviceStatus: false });
    // const [checked1, setChecked1] = useState({ scale: false });
    // const [isDataFetch, setIsDataFetch] = useState(false)
    // var v = 0;
    // var ipv4 = ipcRenderer.sendSync('synchronous-message', '')
    const [ipv4, setIpv4] = useState(ipcRenderer.sendSync('getIpv4', ''))
    const [isStart, setIsStart] = useState(false);
    const [isStart2, setIsStart2] = useState(isStart)
    const [wifi, setWifiName] = useState(ipcRenderer.sendSync('getWifiName', ''))
    const [deviceId, setDeviceId] = useState(0);
    const fileName = "LOG_details";
    // const [exceldata, setExceldata] = useState([]);
    const [clickExcelData, setClickExcelData] = useState([])
    // const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('pending')
    const [isStartBtnCLicked, setIsStartBtnClicked] = useState(false)
    const data = useSelector(state => state.data.data)
    const countStored = useSelector(state => state.data.count)
    const excelData = useSelector(state => state.data.excelData)
    const dispatch = useDispatch()
    // console.log('data from redux', data)
    // setTime(prev =>data.TimeStamp)
    UTCtoISTDate = 'DD/MM/YY' || data.TimeStamp

    const getDisabled = val => {
        if (val) return { disabled: true };
        return {};
    }

    const startServerHandler = () => {
        if (isStart == false) {
            let excelDate = new Date();
            let date = `${("0" + excelDate.getDate()).slice(-2)}-${("0" + (excelDate.getMonth() + 1)).slice(-2)}-${excelDate.getFullYear()}-${excelDate.getHours()}-${excelDate.getMinutes()}-${excelDate.getSeconds()}`;
            setFilenameDate(prev => date)
        }
        setIsStartBtnClicked(true)
        setIsStart(prev => !prev)
        //executing if when stop button is clicked
        // if (isStart == true) {
        //     ipcRenderer.send('stopCycle','')
        // }
    }

    // let timeoutID
    // console.log('checking clear time out', timeoutID)


    // console.log('chekkkkkkkkkkkk', countArr.length)

    function myLoop(count) {
        // console.log('checking is Start', pulse)
        setTimeout(() => {
            // console.log('checking count inside loop', count)
            let sum = 0;
            if (count.length == 0) {
                setPulse(prev => 0)
            }
            else if (graphtime == 10 && count.length > 0) {
                sum = count.splice(0, 1)
                setPulse(prev => sum.join(''))
                if (count.length !== -1) {
                    myLoop(count)
                }
            }
            else if (graphtime == 100 && count.length > 0) {
                sum = count.splice(0, 10).reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                });
                setPulse(prev => sum)
                if (count.length !== -1) {
                    myLoop(count)
                }
            } else if (graphtime == 1000 && count.length > 0) {
                sum = count.splice(0, 100).reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                });
                setPulse(prev => sum)
                // if(countStored.length !== 0){

                // }
                if (count.length !== -1) {
                    myLoop(count)
                }
            }
            else if (graphtime == 2000 && count.length > 0) {
                sum = count.splice(0, 200).reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                });
                setPulse(prev => sum)
                // if(countStored.length !== 0){

                // }
                if (count.length !== -1) {
                    myLoop(count)
                }
            }
            else if (graphtime == 3000 && count.length > 0) {
                sum = count.splice(0, 300).reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                });
                setPulse(prev => sum)
                // if(countStored.length !== 0){

                // }
                if (count.length !== -1) {
                    myLoop(count)
                }
            }
            else if (graphtime == 4000 && count.length > 0) {
                sum = count.splice(0, 400).reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                });
                setPulse(prev => sum)
                // if(countStored.length !== 0){

                // }
                if (count.length !== -1) {
                    myLoop(count)
                }
            }
        }, graphtime)
    }

    async function getData() {
        // setSeconds(seconds + 1)
        // const response = await fetch(`http://localhost:4000/posts/` + (count + 1))
        const response = await fetch(`http://localhost:4000/posts/`)
        // const response = await fetch(`http://192.168.4.1:80/yelsons`)

        // debugger;
        const respData = await response.json()
        // console.log('checking respData',respData.posts[0].packetnumber)
        if (response.ok) {
            // console.log('checking response', respData[0].packetnumber)
            setStatus('success')
            // console.log('checking pulse',countStored)
            if (pulse !== -1) {
                dispatch(dataAction.getCount({ count: pulse }))
            }
            if (respData[0].packetnumber !== packetNumber) {
                myLoop(respData[0].Count)
                setPacketNumber(prev => respData[0].packetnumber)
                setApiheader(1)
                // setTime(data.TimeStamp)
                setDeviceId(respData[0].Device_id)
                setCountArr(prev => respData[0].Count)
                // setApiData(resp)
                // dispatch(dataAction.getData({ data: respData }))
                // let DateTime = ;
                // let ateTime = respData[0].RTC
                // console.log('checking DATeTime',DateTime)

            }
            // console.log('checking setDate',filenameDate)
            ipcRenderer.send('sendExcelData', deviceId, graphtime, UTCtoISTDate, countStored, filenameDate)
        }
        else {
            setStatus('failed')
            console.log('no data from await')
            setApiheader(0);
        }

        if (apiheader == 1) {

            if (shiftleft <= 9) {
                dataPoints.shift();
                dataPoints.push({ "x": (`${seconds}`) / graphtime, "y": parseInt(pulse) })
                //dataPoints[shiftleft].x=apidata.id;
                // dataPoints[shiftleft].y=parseInt(apidata.value);
                // console.log(dataPoints)
                setShiftleft(shiftleft + 1)
            }
            else {
                dataPoints.shift();
                //console.log(dataPoints);
                // console.log(apiheader);
                dataPoints.splice(9, 0, { "x": (`${seconds}`) / graphtime, "y": parseInt(pulse) });
            }
        }
        // console.log('checking excel data', exceldata)
    }




    const data1 = [];
    for (let i = 0; i < 10; i++) {
        let d = {
            time: dataPoints[i].x,
            count: dataPoints[i].y,
        }
        data1.push(d)
    }



    useEffect(() => {
        if (isStartBtnCLicked === true && isStart === false) {
            setStatus('failed')
        }
        if (isStart) {
            const timer2 = setInterval(() => {
                setSeconds(seconds + 1)
                getData()
            }, graphtime)
            // const timer = setInterval(()=>{console.log('1000'),5000})
            // const timer = setInterval(() => { getData() }, 1000)
            return () => {
                clearInterval(timer2)
                // clearInterval(timer)

            }
        }

    }, [seconds, isStart, graphtime]);


    return (
        <div className='main-box'>
            {/* {console.log('cheking statusssssssssss', status)} */}

            <div className='header-main'>
                <header className='header-box'>
                    <div>
                        <WifiIcon sx={{ color: '#1E90FF' }} />&nbsp;Leakage Detection System
                    </div>
                    <div>
                        <img src={logo} alt='y' height={50} />
                    </div>
                </header>
            </div>
            <div className='actions'>
                <div>
                    <div><span className='boldness'>Device ID</span> - {deviceId}</div>
                    {/* <div></div> */}
                </div>
                <div>
                    <button onClick={startServerHandler} className={isStart + ' startserver'} >{!isStart ? 'Start' : 'Stop'}</button>
                </div>
            </div>
            <div className='controls-main'>
                {/* <div className='inside-container-div'>

                </div> */}
                <div className='inside-container-div'>
                    <div><span className='boldness'>Step Time</span></div>
                    <div>
                        <FormControl sx={{ m: 0, minWidth: 50 }} size="small"  >
                            <Select id='select-time'
                                value={graphtime}
                                onChange={(e) => setGraphtime(e.target.value)}
                                displayEmpty
                                {...getDisabled(isStart)}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem className='menuItem-text' value={10}>10 ms</MenuItem>
                                <MenuItem value={100}>100 ms</MenuItem>
                                <MenuItem value={1000}>1s</MenuItem>
                                <MenuItem value={2000}>2s</MenuItem>
                                <MenuItem value={3000}>3s</MenuItem>
                                <MenuItem value={4000}>4s</MenuItem>
                                <MenuItem value={5000}>5s</MenuItem>
                                <MenuItem value={6000}>6s</MenuItem>
                                <MenuItem value={7000}>7s</MenuItem>
                                <MenuItem value={8000}>8s</MenuItem>
                                <MenuItem value={9000}>9s</MenuItem>
                                <MenuItem value={10000}>10s</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='inside-container-div'>
                    <div><span className='boldness'>Timestamp</span></div>
                    <div>{UTCtoISTDate || 'DD/MM/YYYY'}</div>
                </div>
                <div className='inside-container-div'>
                    <div><span className='boldness'>Counts</span></div>
                    <div>{pulse || '0'}</div>
                </div>
                <div className='inside-container-div'>
                    <div><span className='boldness'>Status</span></div>
                    <div>
                        <label className="container">
                            <input type="radio" value="status" name="deviceStatus" checked={isStart || true} readOnly />
                            <span className={status + ' checkmark'}></span>
                        </label>
                    </div>
                </div>
                {/* <div className='inside-container-div'>
                    <div>Action</div>

                </div> */}
                <div className='inside-container-div'>
                    <div><span className='boldness'>Wifi Name</span></div>
                    <div>{wifi}</div>
                </div>
            </div>

            <div className='rechart-container'>
                <LineChart
                    width={700}
                    height={400}
                    data={data1}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 20,
                        bottom: 50
                    }}
                >
                    <CartesianGrid strokeDasharray="3 1" />
                    <XAxis type="category" dataKey="time" >
                        <Label value="Time" offset={1} position="bottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Pulse Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#1E90FF" />
                </LineChart>
                {/* <ExportCSV csvData={excelData} label='Export in excel' />
                <button onClick={saveOnClickExcelDataHandler}>Collect Count </button>
                <ExportCSV csvData={clickExcelData} label='Export collected count' /> */}
            </div>

            {/* <div className='mainWiFipublicDashboard'>WiFi Data
                <div className='dataWiFipublicDashboard'>
                    <div className='dataWiFipublicDashboardinputdiv'>
                        <span >Graph Speed:-</span> <span>
                            <input type="text" className='dataWiFipublicDashboardinput' placeholder="Grapg updatr speed is 1000 ms" onChange={setSpeed} value={graphtime}   ></input>
                        </span>

                        <br></br>
                        <div>
                            <span >Device Status:-</span>
                            <span >
                                <label className="container">
                                    <input type="radio" value="status" name="deviceStatus" checked={checked.deviceStatus} />
                                    <span className="checkmark"></span>
                                </label>
                            </span>
                        </div>

                        <div>
                            <span style={{ clear: "both", marginLeft: "11%", float: "left", position: 'relative', marginTop: "1%" }} >scaling from 0:-</span>
                            <span >
                                <label className="container1" style={{ left: "-8%", marginTop: "12px" }} >
                                    <input type="radio" value="scale" name="scale" onClick={scale} checked={checked1.scale} />
                                    <span className="checkmark1"></span>
                                </label>
                            </span>
                        </div>
                    </div>
                    <span className="Data1">Sample No:-&nbsp; &nbsp;{apiid}</span>&nbsp; &nbsp;&nbsp;
                    <span className='Data1'>Pulse Count:-&nbsp; &nbsp; {parseInt(pulse)} </span>&nbsp; &nbsp;&nbsp;
                    <span className='Data1'>RTC Time:-&nbsp; &nbsp; {time} </span>&nbsp; &nbsp;&nbsp;
                    <button onClick={startServerHandler} id='startserver'>{isStart ? 'Start' : 'Stop'}</button>

                </div>
                <div style={{ position: "relative", width: "200px", height: "15px", backgroundColor: "white", bottom: "45px", left: "00%" }}></div>
            </div> */}

            <div id="footer">All Rights Reserved by &nbsp;<a href='https://yelsons.com/' target="_blank">YELSONS INDIA PRIVATE LIMITED</a>  &nbsp;&#169;&nbsp;2022 </div>
        </div>
    )
};

export default memo(WiFiPublicDashboard1);

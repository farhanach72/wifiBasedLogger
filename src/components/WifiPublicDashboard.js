import React, { useEffect, useState, memo, useCallback } from "react";
// import writeToExcel from './writeToExcel';
// import { CanvasJSChart } from "canvasjs-react-charts";
import { useDispatch, useSelector } from "react-redux";
import { Select, FormControl, MenuItem } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import WifiIcon from "@mui/icons-material/Wifi";
import "./WiFiPublicDashboard.css";
// import { CSVLink } from 'react-csv';
import icon from "../icon.png";
import { dataAction } from "../store/reducers/dataReducer";
const { ipcRenderer } = window.require("electron");

let UTCtoISTDate = "DD/MM/YYYY";
let timeShorts = "";
let device_ID = 0;
let StepTime = 0;
let location = "";
let battery = 0;
let latitude = "";
let longitude = "";
let countPulse = 0;
let prevExcelLength = 0;
let excelDataArr = {};
let packetNumber = 0;
let locationL = `Latitude:, Longitude:`;
let isStartCopy;
let wifiCopy;
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// var dummyGraphData = []

const WiFiPublicDashboard = (props) => {
  const [graphtime, setGraphtime] = useState(1000);
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: null },
    { x: 2, y: null },
    { x: 3, y: null },
    { x: 4, y: null },
    { x: 5, y: null },
    { x: 6, y: null },
    { x: 7, y: null },
    { x: 8, y: null },
    { x: 9, y: null },
    { x: 10, y: null },
  ]);
  const [newDataPoints, setNewDataPoints] = useState([]);
  // console.log('checking dummy',dummyGraphData)
  const [graphData, setGraphData] = useState([]);
  // const [timeShorts, setTimeShorts] = useState('')
  const [apiheader, setApiheader] = useState(0);
  const [shiftleft, setShiftleft] = useState(0);
  // const [render, setRender] = useState(1)
  // const [apiid, setApiid] = useState(0);
  // const [packetNumber, setPacketNumber] = useState(0)
  const [time, setTime] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [dateTimeStamp, setDateTimeStamp] = useState("DD/MM/YYYY");
  const [countArr, setCountArr] = useState([]);
  const [filenameDate, setFilenameDate] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [wifi, setWifiName] = useState(
    ipcRenderer.sendSync("getWifiName", "") || "wifi"
  );
  const [status, setStatus] = useState("pending");
  const [isStartBtnCLicked, setIsStartBtnClicked] = useState(false);
  const [systemStatus, setSystemStatus] = useState("Inactive");
  const graphStateData = useSelector((state) => state.data.graph);
  const dispatch = useDispatch();

  const cycleInfo = [
    {
      timeLabel: "10ms",
      timeShort: 10
    },
    {
      timeLabel: "100ms",
      timeShort: 100
    },
    {
      timeLabel: "1s",
      timeShort: 1000
    },
    {
      timeLabel: "2s",
      timeShort: 2000
    },
    {
      timeLabel: "3s",
      timeShort: 3000
    },
    {
      timeLabel: "4s",
      timeShort: 4000
    },
    {
      timeLabel: "5s",
      timeShort: 5000
    },
    {
      timeLabel: "6s",
      timeShort: 6000
    },
    {
      timeLabel: "7s",
      timeShort: 7000
    },
    {
      timeLabel: "8s",
      timeShort: 8000
    },
    {
      timeLabel: "9s",
      timeShort: 9000
    },
    {
      timeLabel: "10s",
      timeShort: 10000
    },
    {
      timeLabel: "20s",
      timeShort: 20000
    },
    {
      timeLabel: "30s",
      timeShort: 30000
    },
    {
      timeLabel: "40s",
      timeShort: 40000
    },
    {
      timeLabel: "50s",
      timeShort: 50000
    },
    {
      timeLabel: "1m",
      timeShort: 60000
    },
    {
      timeLabel: "2m",
      timeShort: 120000
    },
    {
      timeLabel: "3m",
      timeShort: 240000
    },
    {
      timeLabel: "4m",
      timeShort: 360000
    },
    {
      timeLabel: "5m",
      timeShort: 420000
    },
    {
      timeLabel: "6m",
      timeShort: 480000
    },
    {
      timeLabel: "7m",
      timeShort: 540000
    },
    {
      timeLabel: "8m",
      timeShort: 600000
    },
    {
      timeLabel: "9m",
      timeShort: 660000
    },
    {
      timeLabel: "10m",
      timeShort: 720000
    },
  ]

  isStartCopy = isStart;
  wifiCopy = wifi;
  if (isStart == true) {
    if (graphtime == 10) {
      timeShorts = 10;
    } else if (graphtime == 100) {
      timeShorts = 100;
    } else if (graphtime == 1000) {
      timeShorts = "1s";
    } else if (graphtime == 2000) {
      timeShorts = "2s";
    } else if (graphtime == 3000) {
      timeShorts = "3s";
    } else if (graphtime == 4000) {
      timeShorts = "4s";
    } else if (graphtime == 5000) {
      timeShorts = "5s";
    } else if (graphtime == 6000) {
      timeShorts = "6s";
    } else if (graphtime == 7000) {
      timeShorts = "7s";
    } else if (graphtime == 8000) {
      timeShorts = "8s";
    } else if (graphtime == 9000) {
      timeShorts = "9s";
    } else if (graphtime == 10000) {
      timeShorts = "10s";
    } else if (graphtime == 20000) {
      timeShorts = "20s";
    } else if (graphtime == 30000) {
      timeShorts = "30s";
    } else if (graphtime == 40000) {
      timeShorts = "40s";
    } else if (graphtime == 50000) {
      timeShorts = "50s";
    } else if (graphtime == 60000) {
      timeShorts = "1m";
    } else if (graphtime == 120000) {
      timeShorts = "2m";
    } else if (graphtime == 180000) {
      timeShorts = "3m";
    } else if (graphtime == 240000) {
      timeShorts = "4m";
    } else if (graphtime == 300000) {
      timeShorts = "5m";
    } else if (graphtime == 360000) {
      timeShorts = "6m";
    } else if (graphtime == 420000) {
      timeShorts = "7m";
    } else if (graphtime == 480000) {
      timeShorts = "8m";
    } else if (graphtime == 540000) {
      timeShorts = "9m";
    } else if (graphtime == 600000) {
      timeShorts = "10m";
    }
  }
  // console.log('checking timshort',timeShorts)

  // if (location !== undefined) {
  //     //latitude
  //     const N = location.split(',').splice(0, 1).join('')
  //     latitude = `${(parseFloat(N.slice(0, 2)) + (parseFloat(N.slice(2)) / 60)).toFixed(6)}N`

  //     //longitude
  //     const E = location.split(',').splice(2, 1).join('')
  //     longitude = `${(parseFloat(E.slice(0, 2)) + (parseFloat(E.slice(2)) / 60)).toFixed(6)}E`
  // }

  // locationL = `Latitude: ${latitude}, Longitude: ${longitude}`

  const getDisabled = (val) => {
    if (val) return { disabled: true };
    return {};
  };

  const getASCTime = (date) => {
    let dateStr = `${days[date.getUTCDay()]} ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCFullYear()}`;
    return dateStr;
  };

  const startServerHandler = () => {
    if (isStart == false) {
      let excelDate = new Date();
      setCountArr([]);
      let date = `${("0" + excelDate.getDate()).slice(-2)}-${(
        "0" +
        (excelDate.getMonth() + 1)
      ).slice(
        -2
      )}-${excelDate.getFullYear()}-${excelDate.getHours()}-${excelDate.getMinutes()}-${excelDate.getSeconds()}`;
      setFilenameDate((prev) => date);
    }
    setIsStartBtnClicked(true);
    setIsStart((prev) => !prev);
  };

  function getGraphData(count, date) {
    setCountArr(countArr.push(...count));
    let counts = countArr;
    console.log("Counts```~~~~~~------------", countArr);
    let sum = 0;
    let dateStr;
    let secondsStr = parseInt(date?.slice(-2));
    let arr = [];

    if (graphtime == 10) {
      if (counts.length) {
        sum = counts
          .splice(0, 1)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        // dateStr = date.slice(0, -2) + secondsStr
        // secondsStr++
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 100) {
      if (counts.length >= 10) {
        sum = counts
          .splice(0, 10)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        // dateStr = date.slice(0, -2) + secondsStr
        // secondsStr++
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 1000) {
      // for (let i = 0; i < count.length; i++) {
      if (counts.length >= 100) {
        sum = counts
          .splice(0, 100)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('checking date',dateStr.slice[0,11])
        secondsStr++;
        if (secondsStr == 59) {
          secondsStr = 0;
        }
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 2000) {
      if (counts.length >= 200) {
        // for (let i = 0; i < counts.length; i++) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 200)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        // secondsStr = secondsStr + 2
        arr.push({ x: date.slice(10), y: sum });
        // }
      }
    } else if (graphtime == 3000) {
      if (counts.length >= 300) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 300)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        secondsStr = secondsStr + 3;
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 4000) {
      if (counts.length >= 400) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 400)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 5000) {
      if (counts.length >= 500) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 500)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 6000) {
      if (counts.length >= 600) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 600)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        // secondsStr = secondsStr + 3
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 7000) {
      if (counts.length >= 700) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 700)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 8000) {
      if (counts.length >= 800) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 800)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 9000) {
      if (counts.length >= 900) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 900)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 10000) {
      if (counts.length >= 1000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 1000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
            z;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 20000) {
      if (counts.length >= 2000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 2000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 30000) {
      if (counts.length >= 3000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 3000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 40000) {
      if (counts.length >= 4000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 4000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 50000) {
      if (counts.length >= 5000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 5000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 60000) {
      if (counts.length >= 6000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 6000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 120000) {
      if (counts.length >= 12000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 12000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 180000) {
      if (counts.length >= 18000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 18000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 240000) {
      if (counts.length >= 24000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 24000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 300000) {
      if (counts.length >= 30000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 30000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 360000) {
      if (counts.length >= 36000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 36000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 420000) {
      if (counts.length >= 42000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 42000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 480000) {
      if (counts.length >= 48000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 48000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 540000) {
      if (counts.length >= 54000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 54000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    } else if (graphtime == 600000) {
      if (counts.length >= 60000) {
        let secondsStr = parseInt(date?.slice(-2));
        sum = counts
          .splice(0, 60000)
          .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
        dateStr = date.slice(0, -2) + secondsStr;
        // console.log('llll', typeof (secondsStr))
        arr.push({ x: date.slice(10), y: sum });
      }
    }
    return arr;
  }

  async function getData() {
    let dummyDataPoints;
    let date = getASCTime(new Date());
    // console.log('ASC Time ----------------->', date)
    // setSeconds(seconds + 1)
    // const response = await fetch(`http://localhost:4000/posts/`)
    const response = await fetch(`http://192.168.4.1:80/yelsons`, {
      method: "get",
      headers: {
        "webDate": date,
      },
    });

    const respData = await response.json();
    // console.log('api', respData.posts)
    if (response.ok) {
      let convertedDate = new Date(
        respData.posts[0].RTC.replace("_", " ") + " UTC"
      ).toLocaleString(
        "en-US",
        { hour12: false },
        { timeZone: "Asia/Kolkata" }
      );
      setStatus("success");
      // if (pulse !== -1) {
      //     dispatch(dataAction.getCount({ count: pulse }))
      // }
      // setPacketNumber(22)
      // console.log('kkkkkkk',respData)

      // if (true) {
      if (respData.posts[0].packetnumber !== packetNumber) {
        device_ID = parseInt(respData.posts[0].Device_id);
        battery = respData.posts[0].Battery;
        // location = respData.posts[0].GPS
        // if (location !== undefined) {
        //     //latitude
        //     const N = location.split(',').splice(0, 1).join('')
        //     latitude = `${(parseFloat(N.slice(0, 2)) + (parseFloat(N.slice(2)) / 60)).toFixed(6)}N`

        //     //longitude
        //     const E = location.split(',').splice(2, 1).join('')
        //     longitude = `${(parseFloat(E.slice(0, 2)) + (parseFloat(E.slice(2)) / 60)).toFixed(6)}E`
        // }

        // locationL = `Latitude: ${latitude}, Longitude: ${longitude}`
        packetNumber = respData.posts[0].packetnumber;
        setCountArr((prev) => respData.posts[0].Count);
        setSystemStatus((prev) => "Active");
        dummyDataPoints = getGraphData(respData.posts[0].Count, convertedDate);
        // console.log(dummyDataPoints)
        // setNewDataPoints(prev => dummyDataPoints)
        // console.log('checking the locationnnnnnnnnnnnn', locationL)
        let dummyGraphData = [];
        for (let i = 0; i < dummyDataPoints.length; i++) {
          let d = {
            time: dummyDataPoints[i].x,
            count: dummyDataPoints[i].y,
          };
          // console.log(d);
          dummyGraphData.push(d);
          dispatch(dataAction.getGraph(d));
          UTCtoISTDate = dummyDataPoints[i].x;
          // console.log('checking date',UTCtoISTDate)
          countPulse = dummyDataPoints[i].y;
          excelDataArr = {
            device_ID,
            timeShorts,
            UTCtoISTDate,
            countPulse,
            battery,
          };
        }
        // console.log('dummyDataPoints', dummyDataPoints)
        setGraphData(dummyGraphData);
        // console.log('dummyGraphData', dummyGraphData)

        // console.log('dummy data points',dummyGraphData)
        // setGraphData(dummyGraphData)
        setApiheader(1);
      }
      // console.log('checking setDate',filenameDate)
      // console.log('setGraph', dummyGraphData)
      // setGraphData(dummyGraphData)
    } else {
      setStatus("failed");
      console.log("no data from await");
      setApiheader(0);
      setSystemStatus((prev) => "Inactive");
    }
  }
  // console.log('apiheader', apiheader)

  // console.log('checking new data', graphData)
  // dispatch(dataAction.getExcelData({ device_ID, timeShorts, UTCtoISTDate, countPulse, locationL, battery }))
  // console.log('ccccccccccccccccccc',graphData)
  // const data1 = [];
  // for (let i = 0; i < 10; i++) {
  //     let d = {
  //         time: dataPoints[i].x,
  //         count: dataPoints[i].y,
  //     }
  //     data1.push(d)
  // }
  // console.log('checkiiiiiiiiiiiiiiiiiiii', excelData)
  // console.log('graphData', graphData)

  useEffect(() => {
    // if (graphtime == 1000 && graphData.length > 25) {
    //     console.log('checking')
    //     graphData.slice(0,5)
    // }
    // setWifiName(ipcRenderer.sendSync('getWifiName', ''))

    if (isStartBtnCLicked === true && isStart === false) {
      setStatus("failed");
    }

    let getDataTimer = 0;
    let getWifiTimer = 0;
    let stopCycleTimer = 0;
    if (isStart) {
      dispatch(dataAction.clearGraph());
      getDataTimer = setInterval(() => {
        getData();
        // prevExcelLength = excelDataArr.length
        ipcRenderer.send("sendExcelData", excelDataArr, filenameDate);
        excelDataArr = {}
        // setWifiName(ipcRenderer.sendSync('getWifiName', ''))
        // console.log('getData')
      }, 250);
      // stopCycle()
    } else {
      setIsStart(false);
      excelDataArr = {};
      stopCycleTimer = setInterval(() => {
        setWifiName(ipcRenderer.sendSync("getWifiName", ""));
        if (isStartCopy == true && wifiCopy == "Disconnected") {
          // stopCycleTimer = setInterval(() => {
          //     // setWifiName(ipcRenderer.sendSync('getWifiName', ''))
          //     // if (wifi == 'Disconnected') {
          //         // startServerHandler()
          //         console.log('stopCycle')
          //     // }
          //     // console.log('disable')
          //     //  console.log(ipcRenderer.sendSync('getWifiName', ''))
          //     // console
          // }, 1200)
          // console.log('isStartCopy',isStart)
          setIsStart(false);
          dispatch(dataAction.clearGraph());

          // console.log('isStart')
        }
      }, 1200);
    }

    return () => {
      clearInterval(getDataTimer);
      clearInterval(getWifiTimer);
      clearInterval(stopCycleTimer);
    };
  }, [isStart, graphtime]);

  console.log("graph", graphStateData);
  // console.log(graphData)

  return (
    <div className="main-box">
      {/* {console.log('checking graphData', graphData)} */}

      <div className="header-main">
        <header className="header-box">
          <div>
            <WifiIcon sx={{ color: "#1E90FF" }} />
            &nbsp;Wi-Fi-Based Logger
          </div>
          <div>
            <img src={icon} alt="y" height={50} />
          </div>
        </header>
      </div>
      <div className="actions">
        <div>
          <div>
            <span className="boldness">Device ID</span> - {device_ID}
          </div>
          {/* <div></div> */}
        </div>
        <div>
          <button
            onClick={startServerHandler}
            className={isStart + " startserver"}
          >
            {!isStart ? "Start" : "Stop"}
          </button>
        </div>
      </div>
      <div className="controls-main">
        {/* <div className='inside-container-div'>

                </div> */}
        <div className="inside-container-div">
          <div>
            <span className="boldness">Step Time</span>
          </div>
          <div>
            <FormControl sx={{ m: 0, minWidth: 50 }} size="small">
              <Select
                id="select-time"
                value={graphtime}
                onChange={(e) => setGraphtime(e.target.value)}
                displayEmpty
                {...getDisabled(isStart)}
                inputProps={{ "aria-label": "Without label" }}
              >
                {
                  cycleInfo.map((ele, i) =>
                    <MenuItem key={i} className="menuItem-text" value={ele.timeShort}>
                      {ele.timeLabel}
                    </MenuItem>)
                }
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="inside-container-div">
          <div>
            <span className="boldness">Timestamp</span>
          </div>
          <div>{UTCtoISTDate}</div>
        </div>
        <div className="inside-container-div">
          <div>
            <span className="boldness">Counts</span>
          </div>
          <div>{countPulse || "0"}</div>
        </div>
        {/* <div className='inside-container-div'>
                    <div><span className='boldness'>Location</span></div>
                    <div>{locationL}</div>
                </div> */}
        <div className="inside-container-div">
          <div>
            <span className="boldness">Battery</span>
          </div>
          <div>{battery || 0}</div>
        </div>
        <div className="inside-container-div">
          <div>
            <span className="boldness">Status</span>
          </div>
          <div>
            <label className="container">
              <input
                type="radio"
                value="status"
                name="deviceStatus"
                checked={isStart || true}
                readOnly
              />
              <span className={status + " checkmark"}></span>
            </label>
          </div>
        </div>
        {/* <div className='inside-container-div'>
                    <div>Action</div>
                </div> */}
        <div className="inside-container-div">
          <div>
            <span className="boldness">Wifi Name</span>
          </div>
          <div>{wifi}</div>
        </div>
      </div>

      <div className="rechart-container">
        <ResponsiveContainer width="80%" height={400}>
          <LineChart
            data={graphStateData}
            margin={{
              top: 50,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 1" />
            <XAxis type="category" dataKey="time">
              <Label value="Time" offset={1} position="bottom" />
            </XAxis>
            <YAxis
              label={{
                value: "Pulse Count",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line
              strokeWidth={2}
              type="monotone"
              isAnimationActive={false}
              dataKey="count"
              stroke="#00008B"
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <ExportCSV csvData={excelData} label='Export in excel' />
                <button onClick={saveOnClickExcelDataHandler}>Collect Count </button>
                <ExportCSV csvData={clickExcelData} label='Export collected count' /> */}
      </div>

      <div id="footer">
        All Rights Reserved by &nbsp;
        <a href="https://yelsons.com/" target="_blank">
          YELSONS INDIA PRIVATE LIMITED
        </a>{" "}
        &nbsp;&#169;&nbsp;2022{" "}
      </div>
    </div>
  );
};

export default WiFiPublicDashboard;

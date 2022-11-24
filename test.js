const data = [0, 1, 0];

// function myLoop(i) {
//     setTimeout(function () {
//         console.log(data[i]); //  your code here                
//         if (i++ < data.length-1) myLoop(i);   //  decrement i and call myLoop again if i > 0
//     }, 100)
// }

// myLoop(0)
// var date = '2022-8-25_12:0:00'
var date2 = '2022-8-25T12:0:00'
// var newDate = date.replace('_',' ') + ' UTC'

var s = new Date(date2.replace('T', ' ') + ' UTC').toLocaleString('en-US', { hour12: false }, { timeZone: 'Asia/Kolkata' });
// let str = '25/8/2025:30:00'
// console.log(s)

const str = '1111.11111,N,11111.11111,E,111111,111111.11,111.1,0.111'
//latitude
const N = str.split(',').splice(0, 1).join('')
const intital2DigitN = parseFloat(N.slice(0, 2))
const restDigitN = (parseFloat(N.slice(2)) / 60)
const finalNLatitude = `${(intital2DigitN + restDigitN).toFixed(6)}N`



//longitude
const E = str.split(',').splice(2, 1).join('')
const intital2DigitE = parseFloat(E.slice(0, 2))
const restDigitE = (parseFloat(E.slice(2)) / 60)
const finalELongitude = `${intital2DigitE + restDigitE}E`
let test = `${(parseFloat(E.slice(0, 2)) + (parseFloat(E.slice(2)) / 60)).toFixed(6)}N`

// console.log(test)
// console.log(restDigit)
// console.log(finalNLatitude)
let strDate = '8/25/2022, 17:30:39'
let secondsStr = strDate?.slice(-2)
secondsStr++
const dateStr = strDate.slice(0, -2) + secondsStr
let removedLast2 = strDate.slice(-2)

let replacement = 'xy';
let result = strDate.slice(0, -2) + replacement;

// console.log(dateStr)
// let arr = ['a', 'b', 'c', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

// async function ArrayPlusDelay(array, delay) {
//     // initialize all calls right away
//     array.forEach(function (el, i) {
//         setTimeout(function () {
//             // each loop, call passed in function
//             arr.splice(0, 1)
//             // stagger the timeout for each loop by the index
//             // console.log(arr)
//         }, i * delay);
//     })

// }
// ArrayPlusDelay(arr, 1000)













// let sum = data.splice(0, 1)
// sum = data.splice(0, 1)

// console.log(sum)
// console.log('checking data', data)
//

// const myTimeout = setInterval(myGreeting, 1000);
// // console.log('myTimeout',myTimeout)
// function myGreeting() {
//   console.log("Happy Birthday!")
// }

// setTimeout(()=>{clearTimeout(myTimeout)},4000)
const { ipcMain } = require('electron')
const writeToExcel = require('./writeToExcel')

ipcMain.on('sendExcelData', async (event, excelDataArr, filenameDate) => {
    // console.log('checking data for string', excelDataArr)
    writeToExcel(excelDataArr, filenameDate)
})
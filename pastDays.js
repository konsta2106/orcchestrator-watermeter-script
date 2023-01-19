import axios from 'axios';

// Date format YYYY-MM-DD
let startDate = ""
let endDate = ""

// Water meter Orchestrator task URL
let orchestratorTaskUrl = ""

// Calculate difference between start and end date in days
const calculateDiffInDays = (startTime, endTime) => {
    return (endTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24)
}
let diffInDays = calculateDiffInDays(new Date(startDate), new Date(endDate))

// Send request to Orchestrator
let request = (date) => {
    return new Promise((resolve, reject) => {
        axios.post(orchestratorTaskUrl, {
            startTime: date.toISOString().split('T')[0],
            endTime: date.toISOString().split('T')[0]
        }).then(result => {
            resolve(result)
        }).catch(error => {
            reject(error)
        })

    })
}

// Loop through amount of days provided in the beginning, and send request to the hook url
// Indiviual request is sent for each day
const forLoop = (async () => {
    let start = new Date(startDate)
    for (let i = diffInDays; i >= 0; i--) {
        try {
            const response = await request(start)
            console.log(response.data)
            start = new Date(start.setDate(start.getDate() + 1))
        } catch (error) {
            console.log(error.response.status)
            console.log(error.response.statusText)
        }
    }
})()
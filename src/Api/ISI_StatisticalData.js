import axios from 'axios';
const baseUrl = 'https://raw.githubusercontent.com/praty94/covid-data-isi/master/Statistical%20Data';

export const fetchDashboardData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/OverallData.json`);
        return response;
    }catch{
        console.error("[fetchDashboardData] Failed");
    }    
}

export const fetchWeeklyIncreaseData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/WeeklyRateOfIncrease.json`);
        return response;
    }catch{
        console.error("[fetchWeeklyIncreaseData] Failed");
    }    
}
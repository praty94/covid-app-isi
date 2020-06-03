import axios from 'axios';
const baseUrl = 'https://raw.githubusercontent.com/praty94/covid-data-isi/master';
const appData = 'App%20Data';
const statData = 'Statistical%20Data';
export const fetchDashboardData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/OverallData.json`);
        return response;
    }catch{
        console.error("[fetchDashboardData] Failed");
    }    
}

export const fetchDownloadableReports = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${appData}/Reports.json`);
        return response;
    }catch{
        console.error("[fetchDownloadableReports] Failed");
    }    
}

export const fetchWeeklyIncreaseData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/WeeklyRateOfIncrease.json`);
        return response;
    }catch{
        console.error("[fetchWeeklyIncreaseData] Failed");
    }    
}

export const fetchRecoveryRateData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/RecoveryRate.json`);
        return response;
    }catch{
        console.error("[fetchRecoveryRateData] Failed");
    }    
}

export const fetchTrafficIntensityData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/TrafficIntensity.json`);
        return response;
    }catch{
        console.error("[fetchTrafficIntensityData] Failed");
    }    
}

export const fetchConcentrationData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/Concentration.json`);
        return response;
    }catch{
        console.error("[fetchConcentrationData] Failed");
    }    
}

export const fetchTestedPositiveData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/TestingStateData.json`);
        return response;
    }catch{
        console.error("[fetchTestedPositiveData] Failed");
    }    
}

export const fetchDeathRateData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${statData}/DeathRate.json`);
        return response;
    }catch{
        console.error("[fetchDeathRateData] Failed");
    }    
}

export const fetchFAQData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/${appData}/FAQData.json`);
        return response;
    }catch{
        console.error("[fetchFAQData] Failed");
    }    
}
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

export const fetchRecoveryRateData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/RecoveryRate.json`);
        return response;
    }catch{
        console.error("[fetchRecoveryRateData] Failed");
    }    
}

export const fetchTrafficIntensityData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/TrafficIntensity.json`);
        return response;
    }catch{
        console.error("[fetchTrafficIntensityData] Failed");
    }    
}

export const fetchConcentrationData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/Concentration.json`);
        return response;
    }catch{
        console.error("[fetchConcentrationData] Failed");
    }    
}

export const fetchTestedPositiveData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/TestingStateData.json`);
        return response;
    }catch{
        console.error("[fetchTestedPositiveData] Failed");
    }    
}

export const fetchDeathRateData = async () => {
    try{
        const response = await axios.get(`${baseUrl}/DeathRate.json`);
        return response;
    }catch{
        console.error("[fetchDeathRateData] Failed");
    }    
}
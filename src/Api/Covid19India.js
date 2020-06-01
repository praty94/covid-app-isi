import axios from 'axios';
const url = 'https://api.covid19india.org';

export const fetchSummary = async () => {
    try{
        const response = await axios.get(`${url}/data.json`);
        return response;
    }catch{
        console.error("[fetchSummary] Failed");
    }    
}

export const fetchStateDistrictData = async () => {
    try{
        const response = await axios.get(`${url}/state_district_wise.json`);
        return response;
    }catch{
        console.error("[fetchStateDistrictData] Failed");
    }    
}
import axios from 'axios';
const url = 'https://api.covid19india.org/data.json';

export const fetchSummary = async () => {
    try{
        const response = await axios.get(url);
        return response;
    }catch{
        console.error("[fetchSummary] Failed");
    }    
}
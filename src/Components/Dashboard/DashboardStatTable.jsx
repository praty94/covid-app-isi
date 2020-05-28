import React, { useState } from 'react';
import { useEffect } from 'react';
import DashboardTable from '../Common Components/SimpleDataTable';
import StateSelector from '../Common Components/SingleStateSelector';

const getOptions = (props) => {
    const options = Object.keys(props.data.content.stateData)
    return ["India", ...options];
}

const DashboardStatTable = (props) => {
    const options = getOptions(props);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [tableData,setTableData] = useState(null);
    const handleChange = (value) => {
        if(value && value.trim().length > 0)
            setSelectedOption(value);
        else
            setSelectedOption(options[0]);
    };
    useEffect(()=>{
        console.log("[DashboardStatTable] useEffect called");
        let tabdata = {"headers":props.data.headers};
        if(selectedOption === "India"){            
            tabdata.data = props.data.content.countryData;   
            console.log("selected Option : "+selectedOption);
            console.log(tabdata.data);         
        }else{
            tabdata.data = props.data.content.stateData[selectedOption].data;
            console.log("selected Option : "+selectedOption);
            console.log(tabdata.data);
        }
        setTableData(tabdata);
    },[selectedOption,props]);
    return (
        <React.Fragment>
            <StateSelector 
            style={{marginTop:10}}
            defaultState={options[0]} 
            states={options} 
            singleSelect={true}
            handleStateChange={(selectedState) => handleChange(selectedState)}></StateSelector>           
            {tableData ? <DashboardTable data={tableData}></DashboardTable>:null}
        </React.Fragment>
    );
}

export default DashboardStatTable;
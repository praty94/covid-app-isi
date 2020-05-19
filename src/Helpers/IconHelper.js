import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import RecoveryIcon from '@material-ui/icons/VerifiedUser';
import ConcentrationIcon from '@material-ui/icons/BubbleChart';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import CityIcon from '@material-ui/icons/EmojiTransportation';
import DeathIcon from '@material-ui/icons/Warning';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AboutIcon from '@material-ui/icons/Info';
import IntensityIcon from '@material-ui/icons/GraphicEq';
/* Helper method to get icon based on icon name and optional props */
export const getIcon = (val,props) => {
    switch (val) {
        case 'dashboard':
            return <DashboardIcon {...props}></DashboardIcon>;
        case 'increase':
            return <TrendingUpIcon {...props}></TrendingUpIcon>;
        case 'recovery':
            return <RecoveryIcon {...props}></RecoveryIcon>;
        case 'intensity':
            return <IntensityIcon {...props}></IntensityIcon>;
        case 'concentration':
            return <ConcentrationIcon {...props}></ConcentrationIcon>
        case 'positive':
            return <HospitalIcon {...props}></HospitalIcon>;
        case 'city':
            return <CityIcon {...props}></CityIcon>;
        case 'about':
            return <AboutIcon {...props}></AboutIcon>;
        case 'death':
            return <DeathIcon {...props}></DeathIcon>;
        default:
            return <TrendingUpIcon {...props}></TrendingUpIcon>;
    }

}

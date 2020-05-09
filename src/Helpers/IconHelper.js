import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConcentrationIcon from '@material-ui/icons/BubbleChart';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import CityIcon from '@material-ui/icons/EmojiTransportation';
import DeathIcon from '@material-ui/icons/Warning';
import HomeIcon from '@material-ui/icons/Home';
import AboutIcon from '@material-ui/icons/Info';
import IntensityIcon from '@material-ui/icons/GraphicEq';

export const getIcon = (val) => {
    switch (val) {
        case 'home':
            return <HomeIcon></HomeIcon>;
        case 'increase':
            return <TrendingUpIcon></TrendingUpIcon>;
        case 'recovery':
            return <VerifiedUserIcon></VerifiedUserIcon>;
        case 'intensity':
            return <IntensityIcon></IntensityIcon>;
        case 'concentration':
            return <ConcentrationIcon></ConcentrationIcon>
        case 'positive':
            return <HospitalIcon></HospitalIcon>;
        case 'city':
            return <CityIcon></CityIcon>;
        case 'about':
            return <AboutIcon></AboutIcon>;
        case 'death':
            return <DeathIcon></DeathIcon>;
        default:
            return <TrendingUpIcon></TrendingUpIcon>;
    }

}

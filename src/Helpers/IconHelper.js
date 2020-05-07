import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConcentrationIcon from '@material-ui/icons/BubbleChart';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import CityIcon from '@material-ui/icons/EmojiTransportation';
import IntensityIcon from '@material-ui/icons/GraphicEq';
export const getIcon = (val) => {
    switch (val) {
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
        default:
            return <TrendingUpIcon></TrendingUpIcon>;
    }

}

import React from 'react';
import { WeeklyIncrease, RecoveryRate, TrafficIntensity, Concentration, DeathRate, TestedPositive, Dashboard,FAQ } from '../index';
import AboutPage from '../About/AboutPage';

const PageSwitchHelper = (props) => {
    switch (props.pageId) {
        case 1:
            return <Dashboard theme={props.theme}></Dashboard>
        case 2:
            return <WeeklyIncrease theme={props.theme}></WeeklyIncrease>;
        case 3:
            return <RecoveryRate theme={props.theme}></RecoveryRate>;
        case 4:
            return <TrafficIntensity theme={props.theme}></TrafficIntensity>;
        case 5:
            return <Concentration theme={props.theme}></Concentration>;
        case 6:
            return <TestedPositive theme={props.theme}></TestedPositive>
        case 7:
            return <DeathRate theme={props.theme}></DeathRate>;
        case 8:
            return <FAQ theme={props.theme}></FAQ>
        case 9:
            return <AboutPage theme={props.theme}></AboutPage>
        default:
            return <h1>Not configured</h1>
    }
}

export default PageSwitchHelper;
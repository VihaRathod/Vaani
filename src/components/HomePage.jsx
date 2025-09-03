import Header from "./Header";
import '../App.css';
import Intro from "./Intro";
import React from 'react'
import Goal from './Goal'
import Importance from "./Importance";

import CardSection from "./CardSection";
import CtaSection from "./CTASection";


const HomePage = ()=>{
    return <>
    <Header></Header>
    <Intro></Intro>
    <Goal></Goal>
    <CardSection></CardSection>
    <Importance></Importance>
    <CtaSection></CtaSection>
    </>
}
export default HomePage;
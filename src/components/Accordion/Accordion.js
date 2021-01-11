import ReactDOM from 'react-dom'
import React from 'react'
import { useState, useEffect } from 'react'
import Component from 'react'
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePageCard from "../HomePageCard/HomePageCard"
import "./Accordion.css"
import ButtonComponent from '../ButtonComponent/ButtonComponent';




class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            isRead: false
        };

        this.messageRead = this.messageRead.bind(this);
    }

    componentDidMount() {
        window.setTimeout(() => {
            const el = ReactDOM.findDOMNode(this);
            const height = el.querySelector('.panel__inner').scrollHeight;
            this.setState({
                height,
            });
        }, 333);
    }

    messageRead(){
        this.props.activateTab();
        this.setState({isRead: true})
    }

    render() {
        const { label, content, activeTab, index, activateTab } = this.props;
        const { height, isRead } = this.state;
        const isActive = activeTab === index;
        const innerStyle = {height: `${isActive ? height : 0}px` }

        return (
            <div className='panel' role='tabpanel' aria-expanded={isActive}>
                <ButtonComponent activateTab={this.messageRead} label={label} isRead={isRead || isActive} />
                <div className='panel__inner' style={innerStyle} aria-hidden={!isActive}>
                    <p className='panel__content'> {content}</p>
                    <HomePageCard></HomePageCard>
                    
                </div>
            </div>
        );
    }
}




class CustomAccordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0
        };

        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {

        const { panels } = this.props;
        const { activeTab } = this.state;
        return (
            <div className='accordion' role='tablist'>
                {panels.map((panel, index) =>
                    <Panel key={index} activeTab={activeTab} index={index} {...panel} activateTab={this.activateTab.bind(null, index)} />
                )}
            </div>
        );
    }
}

export default CustomAccordion;
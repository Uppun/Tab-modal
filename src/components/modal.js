import React, { Component } from 'react';
import {Container} from 'flux/utils';
import modalActions from '../actions/modalActions';
import modalStore from '../store/modalStore';
import { CSSTransition, transit } from 'react-css-transition';

import '../css/main.css';

CSSTransition.childContextTypes = {};

class SingleTab extends Component {
    handleClick = () => {
        modalActions.remove(this.props.index);
        this.props.tabUpdate();
    }
    handleSelect = () => {
        modalActions.switch(this.props.index);
    }

    render() {
        return (
            <div className={this.props.tabStyle}>
                <div className="tabContent" onClick={this.handleSelect}>Tab: {this.props.index + 1}</div>
                <span className="remove" onClick={this.handleClick}>&times;</span>
            </div>
        );
    }
}

class TabModal extends Component {
    current;

    static getStores() {
        return [modalStore];
    }

    static calculateState(prevState) {
        return modalStore.getState();
    }

    addClick = () => {
        modalActions.add();
        this.props.tabUpdate();
    }

    handleClick = () => {
        modalActions.close();
    }

    otherClick = (event) => {
        event.stopPropagation();
    }

    handleKeyPress = () => {
        if(this.state.textAreas.length >= 1) {
            modalActions.update(this.current.value);
        }
    }

    render() {
        return(
            <CSSTransition
                defaultStyle={{ opacity: 0, visibility: 'hidden'}}
                enterStyle={{ opacity: transit(1.0, 500, "ease-in-out") }}
                leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
                activeStyle={{ opacity: 1.0 }}
                active={this.state.visibility}>
                    <div className="modal" onClick={this.handleClick}>  
                        <div className={this.state.visibility ? "modalContentsActive" : "modalContents"} onClick={this.otherClick}>
                            <div className="tabBar">
                                <button className="addBtn" onClick={this.addClick}>Add</button> 
                                {this.state.textAreas.map((textArea, index) => {
                                    if(this.state.current === index){
                                        return (<SingleTab index={index} key={index} tabUpdate={this.props.tabUpdate} tabStyle="selectedTab"/>);
                                    }
                                    return (<SingleTab index={index} key={index} tabUpdate={this.props.tabUpdate} tabStyle="tab"/>);
                                })}
                            </div>
                            <div className="activeText">
                                <textarea className="current" value={this.state.textAreas[this.state.current]} onChange={this.handleKeyPress} ref={node => {
                                    this.current = node;
                                }}></textarea>
                            </div>
                        </div>
                    </div>
            </CSSTransition>
        )
    }
}

export default Container.create(TabModal);
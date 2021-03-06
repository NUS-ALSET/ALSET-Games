import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moveBot, updateBotDirection, updateBotSpeed} from '../actions/index';
import gameJsonData from '../config.json';
import Gnome1 from './Characters/Gnome1';
import Blonde from './Characters/Blonde';

class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
	constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.checkBorderCollision = this.checkBorderCollision.bind(this);
    }
    
    loop = () => {
        this.props.moveBot({gameIndex: this.props.gameIndex, direction:'down'});
        if(!this.checkBorderCollision())
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:0});
        else
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:gameJsonData.games[this.props.gameIndex].character.speed});
    }

    checkBorderCollision(){
        var el = document.getElementById("bot"+this.props.gameIndex);
        if(!el)
            return false;
        var parentEl = el.parentElement;
        el = document.getElementById("bot"+this.props.gameIndex).childNodes[0];
        
		var parentOffset = parentEl.getBoundingClientRect();
		var viewportOffset = el.getBoundingClientRect();
		var top = viewportOffset.top;
		var left = viewportOffset.left;
		var right = viewportOffset.right;
		var bottom = viewportOffset.bottom;
		
		var parentTop = parentOffset.top;
		var parentLeft = parentOffset.left;
		var parentRight = parentOffset.right;
        var parentBottom = parentOffset.bottom;
        var direction = this.props.botPositions[this.props.gameIndex].direction;
		if(direction == "left")
			return left<=parentLeft?false:true;
		else if(direction == "right")
			return right>=parentRight?false:true;
		else if(direction == "up")
			return top<=parentTop?false:true;
		else if(direction == "down")
			return bottom>=parentBottom?false:true;
    }

    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
	
	render() {
        if(this.props.botPositions==null)
            return <div></div>
        switch(this.props.character.type){
            case 'gnome1':
                return <div id={'bot'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
            case 'blonde':
                return <div id={'bot'+this.props.gameIndex}><Blonde characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
            default:
                return <div id={'bot'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
        }
    }
}

function mapStateToProps(state){
    return {
        botPositions: state.botPositions
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateBotSpeed:updateBotSpeed, moveBot: moveBot}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Character);
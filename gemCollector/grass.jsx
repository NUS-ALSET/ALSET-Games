import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

export default class Grass extends Component {
	constructor(props) {
		super(props);
	}
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}
	
	render() {
		var img = new Image();
		img.src = "https://rawgit.com/anirudhvenu/react-game-kit-demos/5f2a5190d08e81d13897db4c63afbcc95f02f3ad/gemCollector/assets/grass.jpg";
    return (
		<div style={this.getWrapperStyles()}>
			<TileMap
			  style={{ top: 0, left:0 }}
			  src={img.src}
			  rows={5}
			  columns={8}
			  tileSize={128}
			  layers={[[1]]}
			/>
		</div>
    );
  }
}
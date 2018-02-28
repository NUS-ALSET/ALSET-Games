import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

export default class Background extends Component {
	constructor(props) {
		super(props);
	}
	getWrapperStyles() {
    return {
      position: 'absolute',
      transform: `translate(0px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
    };
  }

  render() {
    var img = new Image();
    img.src=  "assets/boardwalktile.png";
    var sr = "assets/boardwalktile.png";
     return (
      <div style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: 0 }}
          //src="assets/boardwalktile.png"
          //src="https://rawgit.com/anirudhvenu/react-game-kit-demos/5f2a5190d08e81d13897db4c63afbcc95f02f3ad/gemCollector/assets/tilemap.png"
          src = {img}
          tileSize={145}
          columns={4}
          rows={4}
          layers={[
            [
              0,0,0,0,
			  0,0,0,0,
			  1,1,1,1,
			  1,1,1,1
            ],
          ]}
        />
  </div>)}
}
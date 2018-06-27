import React, { Component } from 'react';
import './App.css';

const Box = ({ color = '#345182', click}) => {
  const style = {
    width: '180px',
    height: '180px',
    display: 'inline-block',
    marginRight: '5px',
    backgroundColor: color
  }
  return <div  style={style} onClick={click} />;
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      colors: [],
      selected: [],
      completed: []
    }
  }

  componentWillMount() {
    const colors = this.pickColors();
    this.setState({ colors });
    const completed = Array(20).fill(false)
    this.setState({completed})
  }

  pickColors(){
    const colorsHalf = new Set();
    while(colorsHalf.size < 9){
      let color = this.props.allColors[Math.floor(Math.random()*this.props.allColors.length)]
      colorsHalf.add(color)
    }
    let colors = [...colorsHalf, ...colorsHalf];
    for (let i = colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [colors[i], colors[j]] = [colors[j], colors[i]];
      }
    return colors;
  }

  handleClick(index, color){
    const selected = this.state.selected.slice()
    const obj = {color, index}
    if(selected.length === 0)
      this.setState(selected: [obj])
    else if(selected.length === 1){
      selected.push(obj)
      this.setState({selected})
      if(selected[0].color === selected[1].color){
        const {completed} = this.state.slice()
        completed[selected[0].index] = true;
        completed[selected[1].index] = true;
        this.setState({completed})
      }
      this.setState(selected: [])
    }
    console.log(obj)
  }

  render() {
    let showColors = new Set()
    for(let index in this.state.completed){
      showColors.add(index)
    }
    for(let obj in this.state.selected){
      showColors.add(obj.index)
    }
    showColors = [...showColors]
    const Boxes = this.state.colors.map((color, index) => (
      showColors.includes(index)
      ? <Box key={index} color={color} click={this.handleClick.bind(this, index, color)} />
      : <Box key={index} click={this.handleClick.bind(this, index, color)} />
    ))

    return (
        <div>
          {Boxes}
        </div>
    );
  }
}

App.defaultProps = {
  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"],

};


export default App;

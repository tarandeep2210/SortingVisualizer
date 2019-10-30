import React from 'react';
import './SortingVisualizer.css';
import App from '../App';
import {getMergeSortAnimations,getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 330;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#FE2EF7';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export class SortingVisualizer extends React.Component{
    
    constructor(){
        super();
        this.state = {
            array :[],
        };
    }
    
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array =[];

        for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++){
            array.push(randomInt(5,500));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

      bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color =  SECONDARY_COLOR;
            setTimeout(()=>{
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                let tempHeight = barTwoStyle.height;
                barTwoStyle.height = barOneStyle.height;
                barOneStyle.height = tempHeight;
                setTimeout(()=>{
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor  = PRIMARY_COLOR;
                },ANIMATION_SPEED_MS);
               
            }, i * ANIMATION_SPEED_MS);
           
        }
      }
       changeColor(barOneStyle,barTwoStyle,callback){
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        let tempHeight = barTwoStyle.height;
        barTwoStyle.height = barOneStyle.height;
        barOneStyle.height = tempHeight;
        callback(barOneStyle,barTwoStyle);
      }
      resetColor(barOneStyle,barTwoStyle){
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor  = PRIMARY_COLOR;
      }
    

    render(){
        
        const {array} = this.state;
        return (<>
        <h2>Sorting Visualizer</h2>
        <button className="btn btn-primary" onClick={() => this.resetArray()}>Generate New Array</button>
        <button className="btn btn-primary" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="btn btn-primary" onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <div className="array-container">
                {array.map((value,idx) => (
                        <div className="array-bar" key={idx} style={{height : `${value}px`}}>
                           
                        </div>
                    ))}
            </div>
        </>);
    }

}

function  randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1) + min);
}

export default App;
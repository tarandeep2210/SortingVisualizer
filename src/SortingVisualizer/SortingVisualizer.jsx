import React from 'react';
import './SortingVisualizer.css';
import App from '../App';


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

        for(let i=0;i<330;i++){
            array.push(randomInt(5,500));
        }
        this.setState({array});
    }
    
    render(){
        
        const {array} = this.state;
        return (<>
        <h2>Sorting Visualizer</h2>
        <button className="btn btn-primary" onClick="sort()">Sort</button>
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
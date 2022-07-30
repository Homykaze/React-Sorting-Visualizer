import './SortingVisualizer.css';
import * as sortgingAlgorithms from './sortingAlgorithms';
import {useState} from 'react';

const SortingVisualizer = (props) => {
    let TIME_MS = 3;

    //Utility function to generate random numbers
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Generate an array of random values
    const resetArray = () => {
        const arr = [];
        for (let i = 0; i < 50; ++i){
            arr.push(randomInt(5, 1000));
        }
        return arr;
    }

    //Main array
    const [array, setArray] = useState(resetArray());

    const selectionSort = () => {
        let animations = sortgingAlgorithms.selectionSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++){
            if (animations[i]){
                if (animations[i].length === 3){
                    const [indexFoo1, barTwoIdx, indexFoo2] = animations[i];
                    setTimeout(() => {
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const color = i % 3 === 0 ? 'purple' : 'aqua';
                        barTwoStyle.backgroundColor = color;
                    }, i * TIME_MS);
                } else if (animations[i].length === 4){
                    //Swapping animation
                    const [barOneIdx, barTwoIdx] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;       
                    }, i * TIME_MS);
                } else{
                    const [barOneIdx] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.backgroundColor = 'purple';
                    }, i * TIME_MS);
                }
            }
        }
        setTimeout(() => {
            arrayBars[arrayBars.length - 1].style.backgroundColor = 'purple';
        }, animations.length * TIME_MS);
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++){
                arrayBars[i].style.backgroundColor = 'aqua';
            }
            
        }, animations.length * TIME_MS + 250);
        return array;
    }
    
    // const quickSort = () => {}
    // const randomSort = () => {}
    // const bubbleSort = () => {}
    // const mergeSort = () => {}
    // const insertionSort = () => {}

    return(
        <>
            <header className='header'>
                <button onClick={() => setArray(resetArray())}>New Array</button>
                <button onClick={() => setArray(selectionSort())}>Selection Sort</button>
            </header>
            <div className = "array-container">
                {array.map((value, index) => (
                    <div 
                        className = "array-bar" 
                        key = {index}
                        style = {{height: `${value*70/1000}vh`}}>
                        {/* { value } */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SortingVisualizer;
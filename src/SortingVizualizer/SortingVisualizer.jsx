import './SortingVisualizer.css';
import * as sortgingAlgorithms from './sortingAlgorithms';
import {useState} from 'react';
import Slider from '@mui/material/Slider';

const SortingVisualizer = (props) => {
    const [time, setTime] = useState(3);
    const handleTime = (event, newValue) => {
        setTime(newValue);
    };

    //Utility function to generate random numbers
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Generate an array of random values
    const resetArray = () => {
        const arr = [];
        for (let i = 0; i < size; ++i){
            arr.push(randomInt(5, 1000));
        }
        return arr;
    }

    //Slider
    const [size, setSize] = useState([50]);
    const handleArray = (event, newValue) => {
        setSize(newValue);
        setArray(resetArray());
    };

    //Main array
    const [array, setArray] = useState(resetArray());

    const selectionSort = () => {
        let animations = sortgingAlgorithms.selectionSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++){
            if (animations[i].length === 3){
                //Change color animation
                const [indexFoo1, barTwoIdx] = animations[i];
                setTimeout(() => {
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? 'purple' : 'aqua';
                    barTwoStyle.backgroundColor = color;
                }, i * time);
            } else if (animations[i].length === 4){
                //Swapping animation
                const [barOneIdx, barTwoIdx] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;       
                }, i * time);
            } else{
                //Sorted elements animation
                const [barOneIdx] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = 'purple';
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Paint the last element as all the others
            arrayBars[arrayBars.length - 1].style.backgroundColor = 'purple';
            sortgingAlgorithms.selectionSort(array);
        }, animations.length * time);
        setTimeout(() => {
            //Paint all elements back to the initial color
            for (let i = 0; i < arrayBars.length; ++i){
                arrayBars[i].style.backgroundColor = 'aqua';
            }
        }, animations.length * time + 500);
        return array;
    }
    
    const insertionSort = () => {
        let animations = sortgingAlgorithms.insertionSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; ++i){
            if (animations[i].length === 2){
                //Writing animation
                const [barOneIdx, barTwoIdx] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 4 === 2 ? 'purple' : 'aqua';
                    barTwoStyle.backgroundColor = color;   
                    barOneStyle.height = barTwoStyle.height;
                }, i * time);
            } else if (animations[i].length === 1){
                //Color change animation
                const [barIdx] = animations[i];
                setTimeout(() => {
                    const barStyle = arrayBars[barIdx].style;
                    const color = i % 4 === 0 ? 'purple' : 'aqua';
                    barStyle.backgroundColor = color;      
                }, i * time);
            } else if (animations[i].length === 3){
                //Sorted element animation
                setTimeout(() => {
                    const [barOneIdx, height] = animations[i];
                    let barStyle = arrayBars[barOneIdx].style;    
                    const correctHeight = `${height*70/1000}vh`;
                    barStyle.height = correctHeight;
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Smooth animation from the end of the array to its beginning to show that it is sorted
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[arrayBars.length - 1 - i].style.backgroundColor = 'purple';
                }, i * time)
            }
        }, animations.length * time);
        setTimeout(() => {
            //Paint all elements back to the initial color
            for (let i = 0; i < arrayBars.length; ++i){
                arrayBars[i].style.backgroundColor = 'aqua';
            }
        }, animations.length * time + arrayBars.length * time + 500);
        return array;
    }

    // const bubbleSort = () => {}
    // const mergeSort = () => {}
    // const insertionSort = () => {}

    return(
        <>
            <header className='header'>
                <button onClick={() => setArray(resetArray())}>New Array</button>
                <button onClick={() => setArray(selectionSort())}>Selection Sort</button>
                <button onClick={() => setArray(insertionSort())}>Insertion Sort</button>
                <div className = "sliders">
                    <Slider 
                        defaultValue={50} 
                        onChange = {handleArray} 
                        onClick={() => setArray(resetArray())} 
                        min={4} 
                        max={100}
                        valueLabelDisplay="auto"/>
                    <Slider 
                        defaultValue={4} 
                        onChange = {handleTime} 
                        min={3} 
                        max={250}
                        valueLabelDisplay="auto"/>
                </div>
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
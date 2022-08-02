import './SortingVisualizer.css';
import * as sortgingAlgorithms from './sortingAlgorithms';
import {useState} from 'react';

import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortingVisualizer = (props) => {
    const [time, setTime] = useState(3);
    const handleTime = (event) => {
        setTime(event.target.value);
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
                //Change color swapping animation
                const [indexFoo1, barTwoIdx] = animations[i];
                setTimeout(() => {
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? 'blue' : 'aqua';
                    barTwoStyle.backgroundColor = color;
                }, i * time);
            } else if (animations[i].length === 4){
                //Swapping animation
                const [barOneIdx, barTwoIdx] = animations[i];
                setTimeout(() => {
                    //Values
                    if (size < 9) {
                        const barOne = arrayBars[barOneIdx];
                        const barTwo = arrayBars[barTwoIdx];
                        const tempValue = barOne.textContent;
                        barOne.textContent = barTwo.textContent;
                        barTwo.textContent = tempValue;
                    }
                    //Styles
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
            //Smooth animation of the array getting to its initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * time)
            }
        }, animations.length * time + time);
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
                    //Values
                    if (size < 9) {
                        const barOne = arrayBars[barOneIdx];
                        const barTwo = arrayBars[barTwoIdx];
                        barOne.textContent = barTwo.textContent;
                    }
                    //Styles
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 4 === 2 ? 'blue' : 'aqua';
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
                    const [barIdx, height] = animations[i];
                    const bar = arrayBars[barIdx];
                    const barStyle = arrayBars[barIdx].style;    
                    const correctHeight = `${height*70/1000}vh`;
                    barStyle.height = correctHeight;
                    if (size < 9) bar.textContent = height;
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
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * time)
            }
        }, animations.length * time + arrayBars.length * time + 500);
        return array;
    }

    const quickSort = () => {
        let animations = sortgingAlgorithms.quickSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        let swappingCounter = 0;
        console.log(animations);

        for (let i = 0; i < animations.length; ++i){
            if (animations[i].length === 3){
                //Color animation (boundaries of the current part of the array)
                const [barOneIdx, barTwoIdx] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = 'purple';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * time);
            } else if (animations[i].length === 1){
                //Sorted animation of the correctly positioned pivot
                const [barIdx] = animations[i];
                setTimeout(() => {
                    const barStyle = arrayBars[barIdx].style;
                    const color = 'purple';
                    barStyle.backgroundColor = color;      
                }, i * time);
            } else if (animations[i].length === 2){
                //Swapping animation
                setTimeout(() => {
                    const color = swappingCounter % 2 === 0 ? 'blue' : 'aqua';
                    if (swappingCounter % 2 === 0){
                        //Height
                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                        //Colors
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        //Values
                        if (size < 9){
                            const barOne = arrayBars[barOneIdx];
                            const barTwo = arrayBars[barOneIdx];
                            const tempValue = barOne.textContent;
                            barOne.textContent = barTwo.textContent;
                            barTwo.textContent = tempValue;
                        }
                    } else {
                        //Colors
                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }
                    swappingCounter++;
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Smooth animation of the array getting to its initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * time)
            }
        }, animations.length * time);
        return array;
    }

    // const bubbleSort = () => {}
    // const mergeSort = () => {}
    // const heapSort = () => {}

    return(
        <>
            <header className='header'>
                <button onClick={() => setArray(resetArray())}>New Array</button>
                <button onClick={() => setArray(selectionSort())}>Selection Sort</button>
                <button onClick={() => setArray(insertionSort())}>Insertion Sort</button>
                <button onClick={() => setArray(quickSort())}>Quick Sort</button>
                <div className = "sliders">
                    <Slider 
                        sx={{ color: 'aqua' }}
                        defaultValue={50} 
                        onChange = {handleArray}
                        min={4} 
                        max={100}
                        valueLabelDisplay="auto"/>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: 'white', backgroundColor: 'white' }}>
                        <InputLabel id="demo-simple-select-label">Operation time</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        defaultValue = {3}
                        label="Age"
                        onChange={handleTime}
                        >
                        <MenuItem value={3}>3 ms</MenuItem>
                        <MenuItem value={5}>5 ms</MenuItem>
                        <MenuItem value={8}>8 ms</MenuItem>
                        <MenuItem value={15}>15 ms</MenuItem>
                        <MenuItem value={50}>50 ms</MenuItem>
                        <MenuItem value={100}>100 ms</MenuItem>
                        <MenuItem value={150}>150 ms</MenuItem>
                        <MenuItem value={250}>250 ms</MenuItem>
                        <MenuItem value={500}>500 ms</MenuItem>
                        <MenuItem value={1000}>1000 ms</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </header>
            <div className = "array-container">
                {array.map((value, index) => (
                    <div 
                        className = "array-bar" 
                        key = {index}
                        style = {{
                            height: `${value*70/1000}vh`,
                            margin: `${size > 30 ? '0 1px' : '0 2px'}`,
                            width: `${size > 30 ? 1.1 - size/100 : size > 8 ? 2.5 - size/100 : 9}%`,
                            color: `${size <= 8 ? '#000': 'aqua'}`,
                            padding: `${size <= 8 ? '3px': '0'}`,
                            }}
                        >
                        {size <= 8 ? value : null}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SortingVisualizer;
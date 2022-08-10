import './SortingVisualizer.css';
import * as sortgingAlgorithms from './sortingAlgorithms';
import {useState} from 'react';

import Header from '../components/Header';

const SortingVisualizer = (props) => {
    const constTime = 20;
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
        for (let i = 0; i < size; ++i)
            arr.push(randomInt(5, 1000));
        return arr;
    }

    //Main array
    const [size, setSize] = useState([75]);
    const [array, setArray] = useState(resetArray());

    const selectionSort = () => {
        let animations = sortgingAlgorithms.selectionSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++){
            if (animations[i].length === 3){
                //Change color swapping animation
                const barTwoIdx = animations[i][1];
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
            } else if (animations[i].length > 0){
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
            //Paint the last element
            arrayBars[arrayBars.length - 1].style.backgroundColor = 'purple';
        }, animations.length * time);
        setTimeout(() => {
            //Smooth animation of the array getting to its initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * constTime)
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
                }, i * constTime)
            }
        }, animations.length * time);
        setTimeout(() => {
            //Paint all elements back to the initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[arrayBars.length - 1 - i].style.backgroundColor = 'aqua';
                }, i * constTime)
            }
        }, animations.length * time + arrayBars.length * constTime + constTime);
        return array;
    }

    const quickSort = () => {
        let animations = sortgingAlgorithms.quickSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        let swappingCounter = 0;
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
            } else if (animations[i].length === 4){
                //Animation of compared values
                setTimeout(() => {
                    const color = swappingCounter % 2 === 0 ? 'blue' : 'aqua';
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;   
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    swappingCounter++;
                }, i * time);
            } else if (animations[i].length === 2){
                //Swapping animation
                setTimeout(() => {
                    const color = swappingCounter % 2 === 0 ? 'blue' : 'aqua';
                    const [barOneIdx, barTwoIdx] = animations[i];
                    if (swappingCounter % 2 === 0){
                        //Height
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
                            const barTwo = arrayBars[barTwoIdx];
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
                }, i * constTime)
            }
        }, animations.length * time + 100);
        return array;
    }

    const mergeSort = () => {
        let animations = sortgingAlgorithms.mergeSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for(let i = 0; i < animations.length; ++i){
            const changeColor = (i % 5 === 0) || (i % 5 === 1);
            if (changeColor){
                //Compared values
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 5 === 0 ? 'purple' : 'aqua';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * time);
            } else if (animations[i].length === 1){
                //Swapped items
                setTimeout(() => {
                    const [barIdx] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    const color = i % 5 === 2 ? 'blue' : 'aqua';
                    barStyle.backgroundColor = color;
                }, i * time);
            } else {
                //Swapped items
                setTimeout(() => {
                    //Styles
                    const [barOneIdx, height] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${height*70/1000}vh`;
                    //Values
                    if (size < 9){
                        const barOne = arrayBars[barOneIdx];
                        barOne.textContent = height;
                    }
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Smooth animation from the end of the array to its beginning to show that it is sorted
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[arrayBars.length - 1 - i].style.backgroundColor = 'purple';
                }, i * constTime)
            }
        }, animations.length * time);
        setTimeout(() => {
            //Paint all elements back to the initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[arrayBars.length - 1 - i].style.backgroundColor = 'aqua';
                }, i * constTime)
            }
        }, animations.length * time + arrayBars.length * constTime + constTime);
        return array;
    }

    const bubbleSort = () => {
        let animations = sortgingAlgorithms.bubbleSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        let changeColor = 0;
        for(let i = 0; i < animations.length; ++i){
            if (animations[i].length === 2){
                //Compared values
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = changeColor % 2 === 0 ? 'blue' : 'aqua';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    ++changeColor;
                }, i * time);
            } else if (animations[i].length === 3){
                //Swapped values
                setTimeout(() => {
                    //Styles
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                    //Values
                    if (size < 9){
                        const barOne = arrayBars[barOneIdx];
                        const barTwo = arrayBars[barTwoIdx];
                        const tempValue = barOne.textContent;
                        barOne.textContent = barTwo.textContent;
                        barTwo.textContent = tempValue;
                    }
                }, i * time);
            } else if (animations[i].length === 1) {
                //Correctly positioned elements
                setTimeout(() => {
                    const [barIdx] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.backgroundColor = 'purple';
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Smooth animation of the array getting to its initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * constTime)
            }
        }, animations.length * time + 100);
        return array;
    }

    const heapSort = () => {
        let animations = sortgingAlgorithms.heapSort(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        let changeColor = 0;
        for(let i = 0; i < animations.length; ++i){
            if (animations[i].length === 2){
                setTimeout(() => {
                    //Compared values
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = changeColor % 2 === 0 ? 'blue' : 'aqua';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    ++changeColor;
                }, i * time);
            } else if (animations[i].length === 3){
                setTimeout(() => {
                    //Swapped values animation
                    //Styles
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                    //Values
                    if (size < 9){
                        const barOne = arrayBars[barOneIdx];
                        const barTwo = arrayBars[barTwoIdx];
                        const tempValue = barOne.textContent;
                        barOne.textContent = barTwo.textContent;
                        barTwo.textContent = tempValue;
                    }
                }, i * time);
            } else if (animations[i].length === 1) {
                setTimeout(() => {
                    //Correctly positioned element animation
                    const [barIdx] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    const barTwoStyle = arrayBars[0].style;
                    const tempHeight = barStyle.height;
                    barStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                    //Values
                    if (size < 9){
                        const barOne = arrayBars[barIdx];
                        const barTwo = arrayBars[0];
                        const tempValue = barOne.textContent;
                        barOne.textContent = barTwo.textContent;
                        barTwo.textContent = tempValue;
                    }
                    barStyle.backgroundColor = 'purple';
                }, i * time);
            }
        }

        //Post-loop animations outside the loop
        setTimeout(() => {
            //Smooth animation of the array getting to its initial color
            for (let i = 0; i < arrayBars.length; ++i){
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = 'aqua';
                }, i * constTime)
            }
        }, animations.length * time + 100);
        return array;
    }

    return(
        <>
            <Header 
                size={size} 
                setSize={setSize} 
                setArray={setArray}
                resetArray={resetArray}
                selectionSort={selectionSort}
                insertionSort={insertionSort}
                quickSort={quickSort}
                mergeSort={mergeSort}
                bubbleSort={bubbleSort}
                heapSort={heapSort}
                constTime={constTime}
                time = {time}
                handleTime = {handleTime}/>
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
import '../SortingVizualizer/SortingVisualizer.css';
import {useState} from 'react';

import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Header = ({isProcessing, setIsProcessing, size, setSize, setArray, resetArray, selectionSort, insertionSort, quickSort, mergeSort, bubbleSort, heapSort, constTime, time, handleTime}) => {
    const selectionSortTime = 1.5*size*size*time + size*time + size*constTime;
    const insertionSortTime = size*size*time + 2*size*time + 2*size*constTime;
    const quickSortTime = 3*(Math.log(size)/Math.log(2))*size*time + 2*size*time + size*constTime + 100;
    const mergeSortTime = 5*(Math.log(size)/Math.log(2))*size*time + 2*size*constTime;
    const bubbleSortTime = size*size*time + 2*size*time + size*constTime + 100;
    const heapSortTime = 2*(Math.log(size)/Math.log(2))*size*time + size*time + size*constTime + 100;
    const [isRunning, setRunning] = useState(false);
    //Slider
    const handleArray = (event, newValue) => {
        setSize(newValue);
        setArray(resetArray());
    };

    return (
        <header className='header'>
            <div className="buttons">
                <button style = {{color: `${isRunning ? '#444' : 'aqua'}`}} className = "btn btnMain" disabled = {isRunning ? true : null} onClick={() => setArray(resetArray())}>New Array</button>
                <button
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(selectionSort()); setTimeout(() => setRunning(false), selectionSortTime)}}>
                        Selection Sort
                </button>
                <button
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(bubbleSort()); setTimeout(() => setRunning(false), bubbleSortTime)}}>
                        Bubble Sort
                </button>
                <button 
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(insertionSort()); setTimeout(() => setRunning(false), insertionSortTime)}}>
                        Insertion Sort
                </button>
                <button 
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(quickSort()); setTimeout(() => setRunning(false), quickSortTime)}}>
                        Quick Sort
                </button>
                <button 
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(mergeSort()); setTimeout(() => setRunning(false), mergeSortTime)}}>
                        Merge Sort
                </button>
                <button 
                    className = "btn"
                    style = {{color: `${isRunning ? '#444' : '#eaeaea'}`}}
                    disabled = {isRunning ? true : null} 
                    onClick={() => {setRunning(true); setArray(heapSort()); setTimeout(() => setRunning(false), heapSortTime)}}>
                        Heap Sort
                </button>
            </div>
            <div className = "sliders">
            <FormControl variant="standard" className = "menu" disabled = {isRunning ? true : null} sx={{ m: 1, minWidth: 120, color: '#eaeaea', backgroundColor: '#eaeaea' }}>
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
                <Slider 
                    className = "slider"
                    sx={{ color: 'aqua' }}
                    defaultValue={75} 
                    onChange = {handleArray}
                    min={4} 
                    max={100}
                    valueLabelDisplay="auto"
                    disabled = {isRunning ? true : null}/>
            </div>
        </header>
  );
}

export default Header
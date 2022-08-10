let animations = [];

//SELECTION SORT BELOW
export const selectionSort = array => {
    let i = 0;
    let j = i + 1;
    animations = [];
    //Iterate over the whole array
    for (i = 0; i < array.length - 1; ++i){
        //Find min in the rest of the array
        let min = 99999;
        let indexOfMin = -1;
        for(j = i + 1; j < array.length; ++j){
            //Copmarison indeces
            animations.push([i, j, array.length - 1]);
            //Twice to revert the color
            animations.push([i, j, array.length - 1]);
            //Add one more push to keep the 1-2-3 order to follow the colors
            animations.push([]);
            if (array[j] < min){
                min = array[j];
                indexOfMin = j;
            }
        }
        j = i;

        //Copmarison indeces
        animations.push([i, array.length - 1]);
        //Twice to revert the color
        animations.push([i, array.length - 1]);

        //Swap elements to be in the right place
        //Swapping indeces
        if (array[i] > min){
            animations.push([i, indexOfMin, 0, 0]);
            const temp = array[i];
            array[i] = array[indexOfMin];
            array[indexOfMin] = temp;
        } else {
            if (i === array.length - 2){
                animations.push([i, i + 1]);
            } else {
                animations.push([i, 0]);
            }
        }
    }
    return animations;
}
//SELECTION SORT ABOVE

//INSERTION SORT BELOW
export const insertionSort = array => {
    let i, key, j;
    animations = [];
    for (i = 1; i < array.length; ++i){
        j = i - 1;
        key = array[i];
        while(j >= 0 && array[j] > key){
            //Mark the head of the array
            animations.push([i]);
            //Empty animation to keep the 1-2-3-4 order
            animations.push([]);
            //Writing animation: changes color and height
            animations.push([j + 1, j]);
            //Writing animation to revert the colors (height stays the same)
            animations.push([j + 1, j]);

            array[j + 1] = array[j];
            --j;
        }
        //Mark the current array we are inserting into
        animations.push([i]);
        //Revert the colors
        animations.push([i]);
        //Writing animation: changes color and height
        animations.push([j + 1, key, 0]);
        //Writing animation to revert the colors (height stays the same)
        animations.push([j + 1, key, 0]);

        array[j + 1] = key;
    }
    return animations;
}
//INSERTION SORT ABOVE

//QUICK SORT BELOW
//Utility function
const swap = (index1, index2, array) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    //Swapping animation, with marking the swapped items
    animations.push([index1, index2]);
    //Another one to revert the colors
    animations.push([index1, index2]);
}

//Partition selects a pivot and puts greater elements to its right and smaller elements to the left
const partition = (array, low, high) => {
    //We are taking the right-most element in the current array as a pivot [5, 4, 1, 10, 11, 12]
    let pivot = array[high];
    //i indicates the position of the pivot
    let i = low;
    for (let j = low; j < high; ++j){
        //Mark compared values
        animations.push([j, high, 0, 0]);
        //Twice to revert the colors
        animations.push([j, high, 0, 0]);

        // If current element is smaller than the pivot 
        if (array[j] < pivot){
            swap(i, j, array);
            ++i; // update the position of the pivot
        }
    }
    //Put the pivot to its position, it would be an element which is right next to the smaller element than the pivot
    swap(i, high, array);
    return i;
}

//Actual recursive quicksort algorithm
const recursiveQuickSort = (array, low, high) => {
    if (low < high){
        //Mark the boundaries of the currently being sorted array
        animations.push([low, high, 0]);

        //pivot is partitioning index; arr[pivot] is now at right place in the array
        let pivot = partition(array, low, high);

        //Mark the pivot only once, because it goes to the correct place right away
        animations.push([pivot]);
        //Mark the boundaries once more after swapping animations
        animations.push([low, high, 0]);

        // Separately sort elements before pivot and after it
        recursiveQuickSort(array, low, pivot - 1);
        recursiveQuickSort(array, pivot + 1, high);
    }
    return array;
}

//Driver code
export const quickSort = array => {
    animations = [];
    array = recursiveQuickSort(array, 0, array.length - 1);
    return animations;
}
//QUICK SORT ABOVE

//MERGE SORT BELOW
//This function merges arrays into one array in sorted order
const merge = (array, left, medium, right) => {
    //Get sizes and temp arrays
    let size1 = medium - left + 1;
    let size2 = right - medium;
    let leftSubArr = new Array(size1);
    let rightSubArr = new Array(size2);
    
    //Fill temp arrays
    for(let i = 0; i < size1; i++)
        leftSubArr[i] = array[left + i];
    for(let j = 0; j < size2; j++)
        rightSubArr[j] = array[medium + j + 1];

    //Initial indeces of temp subarrays and merged subarray
    let i = 0;
    let j = 0;
    let k = left;
    while(i < size1 && j < size2){
        //Mark the compared values
        animations.push([left + i, medium + j + 1]);
        //Twice to revert the colors
        animations.push([left + i, medium + j + 1]);

        if(leftSubArr[i] <= rightSubArr[j]){
            //Update this correctly put value in the current array (two times to change color, once to change value)
            animations.push([k]);
            animations.push([k, leftSubArr[i]]);
            animations.push([k]);

            array[k++] = leftSubArr[i++];
        } else {
            //Update this correctly put value in the current array (two times to change color, once to change value)
            animations.push([k]);
            animations.push([k, rightSubArr[j]]);
            animations.push([k]);

            array[k++] = rightSubArr[j++];
        }
    }

    //Copy the remaining elements if there are any (they will already be sorted, because of recursion)
    while (i < size1){
        //Mark the 'compared' values
        animations.push([left + i + 1, left + i + 1]);
        //Twice to revert the colors
        animations.push([left + i + 1, left + i + 1]);
        //Update this correctly put value in the current array (two times to change color, once to change value)
        animations.push([k]);
        animations.push([k, leftSubArr[i]]);
        animations.push([k]);

        array[k++] = leftSubArr[i++];
    }
    while (j < size2){
        //Mark the 'compared' values
        animations.push([medium + j + 1, medium + j + 1]);
        //Twice to revert the colors
        animations.push([medium + j + 1, medium + j + 1]);
        //Update this correctly put value in the current array (two times to change color, once to change value)
        animations.push([k]);
        animations.push([k, rightSubArr[j]]);
        animations.push([k]);

        array[k++] = rightSubArr[j++];
    }
}

//Actual recursive merge sorting algorithm
const recursiveMergeSort = (array, left, right) => {
    if (left < right){
        const medium = left + Math.floor((right - left)/2);
        recursiveMergeSort(array, left, medium);
        recursiveMergeSort(array, medium + 1, right);
        merge(array, left, medium, right);
    }
    return array;
}

//Driver code
export const mergeSort = array => {
    animations = [];
    array = recursiveMergeSort(array, 0, array.length - 1);
    return animations;
}
//MERGE SORT ABOVE

//BUBBLE SORT BELOW
export const bubbleSort = array => {
    animations = [];
    //Iterators: i, j; Temp value: temp; Boolean check if there was no swap during the nested loop
    let i, j, temp, swapped;
    for (i = 0; i < array.length - 1; ++i){
        swapped = false;
        //The length to compare pairs is decreasing
        //Because with each iteration we are putting the greatest element to a correct spot
        for (j = 0; j < array.length - i - 1; j++){
            //Color change animation
            animations.push([j, j + 1]);
            //Twice to revert the color
            animations.push([j, j + 1]);

            if (array[j] > array[j + 1]){
                //Swapping animation
                animations.push([j, j + 1, 0]);

                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
            //Mark a correctly positioned element
            if (j + 1 === array.length - i - 1) animations.push([j + 1]);
        }
        //Stop looping, no swapping needed only for a sorted array
        if (!swapped){
            for(j = 0; j < array.length - 1; ++j)
                //Mark a correctly positioned element
                animations.push([j]);
            break;
        };
    }
    return animations;
}
//BUBBLE SORT ABOVE

//HEAP SORT BELOW
//Recursive heap array building function (array, size = end, i = start)
const heapify = (array, size, i) => {
    let max = i; //Should be the root element eventually
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    //Find max element in the given triple of nodes
    if (left < size && array[left] > array[max]) max = left;
    if (right < size && array[right] > array[max]) max = right;
    //If max is not at the start (not the root), base case condition
    if (max !== i){
        //Swapped values
        animations.push([i, max]);
        //Twice to revert colors
        animations.push([i, max]);
        //Swapped values
        animations.push([i, max, 0]);

        let tempValue = array[i];
        array[i] = array[max];
        array[max] = tempValue;

        //Recursive call for the subtree, because we change its head, we might need to swap some of its elements around
        heapify(array, size, max);
    }
}

//Driver code
export const heapSort = array => {
    animations = [];
    let size = array.length;
    //Rearrange the array to represent a heap data structure
    for (let i = Math.floor(size / 2) - 1; i >= 0; --i)
        heapify(array, size, i);

    for (let i = size - 1; i > 0; --i){
        //With every iteration the root element is the greatest one, so we put it to its position
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        //Mark correctly positioned element
        animations.push([i]);

        //Let's now restructure (from 0 to current i) array again to put max element to its position
        heapify(array, i, 0);
    }
    //Mark correctly positioned min element
    animations.push([0]);
    return animations;
}
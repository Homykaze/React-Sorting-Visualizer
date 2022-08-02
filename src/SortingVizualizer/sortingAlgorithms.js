let animations = [];

//Selection sort
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
            animations.push([0]);
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
//Selection sort

//Insertion sort
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
//Insertion sort

//Quick sort
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
        //Mark the boundaries of the currenttly being sorted array
        animations.push([low, high, 0]);

        //pivot is partitioning index; arr[pivot] is now at right place in the array
        let pivot = partition(array, low, high);

        //Mark the pivot only once, because it goes to the correct place right away
        animations.push([pivot]);
        //Mark the boundaries once more to revert the colors
        animations.push([low, high, 0]);

        // Separately sort elements before pivot and after it
        recursiveQuickSort(array, low, pivot - 1);
        recursiveQuickSort(array, pivot + 1, high);
    }
}

//Driver code
export const quickSort = array => {
    animations = [];
    array = recursiveQuickSort(array, 0, array.length - 1);
    return animations;
}
//Quick sort
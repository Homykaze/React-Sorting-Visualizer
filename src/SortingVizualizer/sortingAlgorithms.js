export const selectionSort = array => {
    let i = 0;
    let j = i + 1;
    let animations = [];
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

export const insertionSort = array => {
    let i, key, j;
    let animations = [];
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
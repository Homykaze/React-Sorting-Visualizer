export const selectionSort = array => {
    let i = 0;
    let j = i + 1;
    let animations = [];
    //Iterate over the whole array
    for (i = 0; i < array.length - 1; i++){
        //Find min in the rest of the array
        let min = 99999;
        let indexOfMin = -1;

        for(j = i + 1; j < array.length; j++){
            //Copmarison indeces
            animations.push([i, j, array.length - 1]);
            //Twice to revert the color
            animations.push([i, j, array.length - 1]);
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
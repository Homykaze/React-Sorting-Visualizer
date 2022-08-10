# Sorting Visualizer

[Enjoy exploring sorting algorithms here.](https://moonlit-melba-02cf2d.netlify.app/)
Implemented a responsive sorting visualizing application that uses 6 most popular sorting algorithms, such as:

## Selection sort
Always takes O(n²) operations to execute and is one of the most basic sorting algoritms out there. It was my first sorting algorithm to learn and its logic is implemented with two nested 'for' loops as follows:

- first 'for' loop: iterate over the array (starting from the first element)
    - take the current element 
    - second 'for' loop: find the least element in the rest of the array
        - swap the current element with the one found
    - go to the next element after the current one

## Bubble sort
Worst-case performance is O(n²) and best-case performance is O(n). The way it works is by comparing closest pairs of elements starting from the beginning of the array to its end. By comparing each pair of elements it may swap them if a pair is in descending order, as a result of each walk-though an array we put at least the one highest unsorted element to its correct position. The algorithm is very similar to selection sort, however, 'Selection sort' performance is always O(n²). Bubble sort logic:

- iterate over the entire array with a 'for' loop
    -store 'swapped' status to be false
    - iterate over each closest pair of elements and compare them with another 'for' loop
        - if they are in descending order, then swap them, changed 'swapepd' status to 'true'
    - if we never swapped in the nested loop, break out of the outer loop

## Insertion sort
On average takes O(n²) operations to execute, just like 'Selection Sort', however, the best-case performance takes O(n) operations, whereas 'Selection Sort' best-case performance is same as average, and worst-case performances are all the same: O(n²), which makes 'Insertion Sort' slightly better even on average in comparison with 'Selection Sort'. I learned this algorithm after getting to know the 'Qiuick Sort' algorithm as I was curious to see the differences between all of them. It is usually implemented with a 'for' loop and a nested 'while' loop as follows:

- 'for' loop: iterate over the array (starting with the second element)
    - store the value of the current element in a separate variable
    - if the previous element is greater then the current one, start a 'while' loop iterating down to the start of the array:
        - change the value of the current element to the value of the previous element
        - keep doing this with each iteration until an element is no longer greater than the current one
    - use the stored value to replace one of the duplicated elements where the 'while' loop stopped
    - do the same for the next element(s)

## Quick sort
Is considered the 'fastest' sorting algorithm and takes O(n*log(n)) in both best and average case scenarios, but takes O(n²) in worst case scenarios, nevertheless, its constant operation time variable is less than the constant operation time of the 'Merge Sort' algorithm. It was my second sorting algorithm to learn, and it is a recursive sorting algorithm with a 'for' loop, where recursion takes O(log(n)) operations, whereas the loop O(n). Algorithm's logic:

- if current array's size is less than 2, return it (base case)
- otherwise select a pivot (pivot is a random element, pivot's selection may affect algorithm's performance)
- 'for' loop to partition the selected pivot between the elemenets smaller than pivot and greater than pivot
    - initialize the variable to store the final position of the pivot to be equal to the starting index of the array
    - if an iterated element is smaller than the pivot, swap it with the element by index of variable tracking the final position of the pivot
    - increment the variable tracking the final position of the pivot
- swap pivot with with the finally computed position
- return qSort(subarray1) + pivot + qSort(subarray2)

## Merge sort
This algorithm implements an idea of sorting subarrays recursively (almost like 'Quick sort'), where division into subarrays happens by splitting array(s) in halves literally by indeces, which gives it O(n*log(n)) performance in all best, average and worst cases. Whereas 'Quick Sort' division into subarrays happens by taking a pivot, putting it into a correct place in the array, and sorting subarrays arround this pivot. I learned this algorithm while implementing this project and was amazed by its simple logic:

- if current array's size is less than 2, return it (base case)
- otherwise divide it in half with 2 recursive calls (for first half and second half)
- merge these halves into a sorted (sub)array:
    - allocate 2 temporary arrays keeping the data of both subarrays
    - insert the smallest elements into the merged array with a 'while' loop by iterating over both subarays
    - insert the left over elements with another couple of 'while' loops (if there are any)

## Heap sort
Average performance is O(n*log(n)), as well as worst-case and best-case. Uses a heap-based approach to find the greatest element and put it in its correct position. Even though it is implemented recursively, this algorithm can be implemented without recursion based on the concept of priority queue. Algorithm:

- rearrange the array into heap data-structure by accessing each element of the first half of the array with a 'for' loop
- main sorting 'for' loop:
    - swap the first element with the last element of the unsorted part of the array
    - change the boundaries of both sorted and unsorted parts of the array
    - rearrange the unsorted part of the array into heap again by accessing each element that is affected by rearranging the root element

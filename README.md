# Sorting Visualizer

Implemented a sorting visualizing application that uses 2 different sorting algorithms:

## Selection sort
Takes O(n*n) operations to execute (on average) and is one of the most basic sorting algoritms out there. It was my first sorting algorithm to learn and its logic is implemented with two nested 'for' loops as follows:

- first 'for' loop: iterate over the array (starting from the first element)
    - take the current element 
    - second 'for' loop: find the least element in the rest of the array
        - swap the current element with the one found
    - go to the next element after the current one

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
Is considered the 'fastest' sorting algorithm and takes O(n*log(n)) in the best and average case scenarios, but takes O(n²) in worst case scenarios, nevertheless, its constant operation time variable is less than the constant operation time of the 'Merge Sort' algorithm. It was my second sorting algorithm to learn, and it is a recursive sorting algorithm with a 'for' loop, where recursion takes O(log(n)) operations, whereas the loop O(n). Algorithm's logic:

- if current array's size is less than 2, return it (base case)
- otherwise select a pivot (pivot is a random element, pivot's selection may affect algorithm's performance)
- 'for' loop to partition the selected pivot between the elemenets smaller than pivot and greater than pivot
    - initialize the variable to store the final position of the pivot to be equal to the starting index of the array
    - if an iterated element is smaller than the pivot, swap it with the variable tracking the final position of the pivot
    - increment the variable tracking the final position of the pivot
- swap pivot with with the finally computed position
- do the same procedure to the subarrays of elements before pivot and after it
- return subarray1 + pivot + subarray2
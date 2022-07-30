# Sorting Visualizer

Implemented a sorting visualizing application that uses 1 different sorting algorithms:

## Selection sort
Takes O(n*n) operations to complete and is one of the most basic sorting algoritms out there. It was my first sorting algorithm to learn and its logic is implemented with two nested 'for' loops as follows:

- first 'for' loop: iterate over the array (starting from the first element)
    - take the current element 
    - second 'for' loop: find the least element in the rest of the array
    - swap the current element with the one found
    - select the next element after the current one
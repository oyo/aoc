0 -> 2 [[true],[false],[true]]
0 -> 2
0 -> 12 [[true],[false],[false]]
0 -> 2,12
1 -> 19 [[false],[true],[true]]
1 -> 19
2 -> 0 [[false],[true],[true]]
2 -> 0
2 -> 24 [[true],[false],[true]]
2 -> 0,24
3 -> 11 [[true],[true],[true]]
3 -> 11
6 -> 32 [[true],[true],[true]]
6 -> 32
7 -> 13 [[true],[false],[true]]
7 -> 13
7 -> 14 [[true],[false],[true]]
7 -> 13,14
8 -> 17 [[true],[true],[false]]
8 -> 17
9 -> 25 [[true],[false],[true]]
9 -> 25
9 -> 28 [[true],[true],[false]]
9 -> 25,28
11 -> 3 [[true],[true],[true]]
11 -> 3
11 -> 31 [[false],[true],[false]]
11 -> 3,31
12 -> 0 [[false],[false],[true]]
12 -> 0
13 -> 7 [[true],[false],[true]]
13 -> 7
14 -> 7 [[true],[true],[false]]
14 -> 7
14 -> 19 [[true],[false],[false]]
14 -> 7,19
14 -> 26 [[true],[false],[true]]
14 -> 7,19,26
17 -> 8 [[false],[true],[true]]
17 -> 8
19 -> 1 [[true],[false],[true]]
19 -> 1
19 -> 14 [[false],[true],[false]]
19 -> 1,14
20 -> 33 [[true],[true],[true]]
20 -> 33
21 -> 23 [[false],[false],[false]]
21 -> 23
21 -> 32 [[false],[true],[false]]
21 -> 23,32
23 -> 21 [[false],[false],[false]]
23 -> 21
23 -> 27 [[false],[true],[true]]
23 -> 21,27
24 -> 2 [[true],[true],[false]]
24 -> 2
25 -> 9 [[true],[true],[false]]
25 -> 9
26 -> 14 [[false],[true],[true]]
26 -> 14
27 -> 23 [[true],[false],[true]]
27 -> 23
27 -> 29 [[true],[true],[true]]
27 -> 23,29
28 -> 9 [[true],[false],[true]]
28 -> 9
29 -> 27 [[true],[true],[true]]
29 -> 27
29 -> 33 [[true],[false],[true]]
29 -> 27,33
31 -> 11 [[false],[true],[false]]
31 -> 11
32 -> 6 [[true],[true],[true]]
32 -> 6
32 -> 21 [[false],[false],[true]]
32 -> 6,21
33 -> 20 [[true],[true],[true]]
33 -> 20
33 -> 29 [[false],[true],[true]]
33 -> 20,29
[
  [ 2, 12 ],  [ 19 ],     [ 0, 24 ],
  [ 11 ],     [],         [],
  [ 32 ],     [ 13, 14 ], [ 17 ],
  [ 25, 28 ], [],         [ 3, 31 ],
  [ 0 ],      [ 7 ],      [ 7, 19, 26 ],
  [],         [],         [ 8 ],
  [],         [ 1, 14 ],  [ 33 ],
  [ 23, 32 ], [],         [ 21, 27 ],
  [ 2 ],      [ 9 ],      [ 14 ],
  [ 23, 29 ], [ 9 ],      [ 27, 33 ],
  [],         [ 11 ],     [ 6, 21 ],
  [ 20, 29 ], []
]





const m = [
[ 2, 12 ],
[ 19 ],
[ 0, 24 ],
[ 11 ],
[],
[],
[ 32 ], 
[ 13, 14 ],
[ 17 ],
[ 25, 28 ],
[],
[ 3, 31 ],
[ 0 ],
[ 7 ],
[ 7, 19, 26 ],
[],
[],
[ 8 ],
[],
[ 1, 14 ],
[ 33 ],
[ 23, 32 ],
[],
[ 21, 27 ],
[ 2 ],
[ 9 ],
[ 14 ],
[ 23, 29 ],
[ 9 ],
[ 27, 33 ],
[],
[ 11 ],
[ 6, 21 ],
[ 20, 29 ],
[]
]

let s = []


var traverse = function(tree, current) {
    if (s.includes(current))
        return
    s.push(current)
    //console.log(s)
    //process current node here

    //visit children of current
    for (var cki of tree[current]) {
        traverse(tree, cki);
    }
}

//call on root node
for (let i=0; i<34; i++){
    console.log(i)
    s = []
    traverse(m, i);
    console.log(s)
}
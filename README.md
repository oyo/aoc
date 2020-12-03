# Advent of Code in Node.js and Javascript

Helper utils and solutions for AoC


### Setup

Install node and yarn then use yarn to install the required packages.
Show the help message and run the mocked example 01/2000 and check the tests.

    brew install node yarn
    yarn install
    yarn solve help
    yarn solve 0 1 2000
    yarn test


### Prepare automatic download

In order to run a real example with automatic input download follow these steps.
Sign in from your browser and use the developer tools to retrieve your AoC session cookie.
In Chrome open https://adventofcode.com/ an sign in, press "Ctrl-Shift-I" or "Command-Option-I" (Mac),
select "network", reload the page, select the first entry and scroll down to the "Request Headers"
section and find the value for "cookie". There you copy the string starting with "session=" until the
next semicolon. Set this as environment variable AOC_COOKIE.

    export AOC_COOKIE='session=34543c7465645f5fdf...4e436254bca92710;'
    curl https://adventofcode.com/2015/day/1/input --cookie $AOC_COOKIE

You should receive a lengthy text of characters '(' and ')'. If this works you are set to start.


### Run

Run the solver for any valid date. In case you are solving the puzzle on the same day you can omit
the parameters and it will try to load from the current year and/or day.
Also try the tests and check out the skeleton code.

    yarn solve 0 1 2015
    yarn test 2015/01
    vi src/2015/01/puzzle.js


### Submit Solution

If you are confident your code calculates the correct puzzle solution you can directly submit the answer.
Here for example first part of Dec 1 in 2020

    yarn solve 1 1 2020


### Troubleshooting

In case you keep receiving the input

    Puzzle inputs differ by user.  Please log in to get your puzzle input.

Make sure you have set the AOC session cookie like described above AND also remove that input from the day folder
because the utils will only try to download when there is no input already present.

    echo $AOC_COOKIE    
    rm src/2015/01/input
    yarn solve 1 2015

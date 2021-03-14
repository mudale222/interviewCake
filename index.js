/*
    To run the program, nodmon index.js
    The program will run on all edge cases and 2 normal cases.
    Algo complexaty at worst case is: O(NlogN + N).
    The sort function can move from O(N) to O(NlogN), depend on the array and the browser.
    The reduce function just run once on the arr, so: O(N).
*/

const edgeCases = [
    [{ startTime: 0, endTime: 1 }, { startTime: -1, endTime: -50 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, { startTime: 'gd', endTime: 65 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, { startTime: null, endTime: 5 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, { startTime: undefined, endTime: 5 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [],
    undefined,
    null,
    234324,
    'asdfasdf',
    {},
    [{ startTime: 0, endTime: 1 }, {}, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, null, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 21 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, undefined, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, 234234, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 0, endTime: 1 }, 'asdfsaf', { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }],
    [{ startTime: 1615543072, endTime: 1 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 1615543072 }, { startTime: 9, endTime: 10 }],
]

const noramlCases1 = [{ startTime: 0, endTime: 1 }, { startTime: 3, endTime: 5 }, { startTime: 4, endTime: 8 }, { startTime: 10, endTime: 12 }, { startTime: 9, endTime: 10 }]
const noramlCases2 = [{ startTime: 1111, endTime: 2222 }, { startTime: 3388, endTime: 4477 }, { startTime: 3322, endTime: 4422 }]

const isArrIntact = (arr) => {
    try {
        if (!arr || !Array.isArray(arr) || !arr.length > 0)
            return false
    } catch (error) { return false }
    return true
}

const isTimesValueCorrect = (x, y) => {
    if (!Number.isFinite(x.startTime) || !Number.isFinite(x.endTime) || !Number.isFinite(y.startTime) || !Number.isFinite(y.endTime) ||
        x.endTime <= x.startTime || y.endTime <= y.startTime)
        return false
    return true
}

const merge_ranges = (timeRangesArr) => {
    if (!isArrIntact(timeRangesArr))
        return [undefined]
    try {
        return timeRangesArr
            .sort((x, y) => {//sort by time if value formatted correctly
                if (!isTimesValueCorrect(x, y))
                    throw "time range value not formatted"
                return x.startTime - y.startTime
            }).reduce((x, y) => { //merging 
                if (Array.isArray(x) && x[x.length - 1].endTime >= y.startTime) { //case need to marge
                    let result = x.concat({ startTime: x[x.length - 1].startTime, endTime: y.endTime }) //merging
                    result.splice(result.length - 2, 1) //delete old value before marge happend
                    return result
                }
                return x == [] ? x.concat(y) : [].concat(x).concat(y) //normal add, no marge
            })
    } catch (error) {
        return [undefined]
    }
}

console.log("Testing edge cases:")
edgeCases.forEach(arr => {
    console.log(merge_ranges(arr))
});

console.log("Testing normal cases:\n", merge_ranges(noramlCases1))
console.log("Testing normal cases2:\n", merge_ranges(noramlCases2))
/**
We want to return an ordinal-style date string, 
for example 01/01/2021 would be January 1st, 2021

Deprecated libraries like Moment offer a solution, but
native JS is cleaner and lighter.

Thanks to Dr. Drang for this blog post solution:
https://leancrew.com/all-this/2020/06/ordinal-numerals-and-javascript/
*/

function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd']
    var v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}

module.exports = (value) => {
    const ord = ordinal(value.getDay())
    const month = value.toLocaleString('default', { month: 'long' })

    return `${month} ${ord}, ${value.getFullYear()}`
}

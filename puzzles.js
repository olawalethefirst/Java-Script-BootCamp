//build a function that capitalizes even index positions of a string 
const toWeirdCase = function (string) {
    let newString = ''
    for (i = 0; i < string.length; i++) {
        let a = null
        if (i % 2 === 0) {
            a = string[i].toUpperCase()                
        } else {
            a = string[i].toLowerCase()
        }
        newString = newString + a
    }
    return newString
}

newWord = toWeirdCase('umbrella')
console.log(newWord)





//build the function to find n sequence in this pattern -> A = [1,2,5,11,21,36,57,85,...]

const findTheNth = function (n) {
    const a = []
    const b = []
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            a.push(1) 
        } else {
            if (i === 1) {
                b.push(i)
            } else {
                b.push(b[i - 2] + i)
            }
            a.push(a[i - 1] + b[i - 1])
        }
    }
    return a[n - 1]
}
const a = findTheNth(17)
console.log(a)



// nums = '14316342115414321154'
// predefinedNumbers = ['21154', '143', '21154143', '1634', '163421154']
// makeNumSentences(nums, predefinedNumbers)


// Output:
// [
// ':143:1634:21154:143:21154:',
// ':143:163421154:143:21154:',
// ':143:1634:21154143:21154:'


const nums = '14316342115414321154'
const predefinedNumbers = ['21154', '143', '21154143', '1634', '163421154']

function sortByIndex(arr) {
    return arr.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
}

function makeNumSentences(nums, predefinedNumbers) {
    let variations = [];
    let regexMatches = [];

    predefinedNumbers.forEach(num => {
        regexMatches = [...regexMatches, ...nums.matchAll(num)];
    });

    regexMatches = sortByIndex(regexMatches)
    console.log(regexMatches)
    createFinalVariation('', regexMatches)

    function createFinalVariation(baseWord, array) {
        // console.log(array)
        if (array.length == 0) return

        // let currentIndex = baseWord.length
        let currentIndex = array[0].index
        let result = baseWord
        
        array.forEach(doRecursive);

        function doRecursive(el, index) {
            if (array[1] && el.index === array[1].index) {
                const clone = [...array]
                clone.shift()
                // console.log(clone)
                // console.log('--------------------------------------------------------------')
                createFinalVariation(result, clone)
            }

            if (el.index >= currentIndex) {
                // console.log('currentIndex', currentIndex)
                result += `${el[0]}:`
                currentIndex = el[0].length + el.index
            }
        }

        variations.push(result)
    }
    variations = [...new Set(variations)]
    // console.log(variations)
}

makeNumSentences(nums, predefinedNumbers);



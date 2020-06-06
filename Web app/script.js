var combArrLen = 0
const fieldLimit = 2 //F(2)
var htmlContentToAppend = '' 

function startAlgorithm() {
    if(document.getElementById('calc-attr-wrapper') != null) {
        htmlContentToAppend = ''
        document.getElementById('calc-attr-wrapper').remove()
    }
    input = (document.getElementById('input').value)
    reg = new RegExp('^[0-9]+(,[0-9]+)*$')
    console.log(input)
    if(reg.test(input)) {
        console.log('g')
        document.getElementById('error').style.display = 'none'
        document.getElementById('calculations').style.display = 'block'
        generatePattern(input.split(','))
    }

    else {
        document.getElementById('error').style.display = 'block'
    }
}

function generatePattern(input) {
    let patternArr = []
    combArrLen = parseInt(input[0])

    for(let i = 1; i < input.length; i++) {
        patternArr.push(input[i] - input[0])
    }

    console.log(patternArr)
    combinations(patternArr)
}

function combinations(patternArr) {
    let j = 0
    let combinationsArr = []

    for(let i = 0; i < combArrLen; i++) {
        combinationsArr[i] = []
        while(j < 2**combArrLen) {
            for(let b = 0; b < fieldLimit; b++) {
                for(let c = 0; c < 2**i; c++) {
                    combinationsArr[i][j] = b
                    j++
                }
            }
        }
        j = 0
    }

    calculatePeriod(combinationsArr, patternArr)
}

function calculatePeriod(combinationsArr, patternArr) {
    let period = null
    let i = combArrLen

    while(period == null) {    
        //adds a new line to the combinations array
        combinationsArr.push([])
        for(let j = 0; j < 2**combArrLen; j++) {
            let sum = 0
            for(let l = 0; l < patternArr.length; l++) {
                sum += combinationsArr[parseInt(i) + parseInt(patternArr[l])][j]
            }
            sum = sum % 2
            combinationsArr[i].push(sum)
        }

        period = checkRows(i, combinationsArr)
        i++
    }

    //end of the algorithm
    printResults(combinationsArr, patternArr, period)
    console.log('period: ', period)
    document.getElementById('calculations').insertAdjacentHTML('beforeend', htmlContentToAppend)
}

function checkRows(rowNumber, combinationsArr) {
    if (checkRowEquality(combinationsArr[rowNumber], combinationsArr[combArrLen - 1])) {
        let state = true
        for(var k = 2; k < combArrLen + 1; k++) {
            if(!checkRowEquality(combinationsArr[rowNumber + 1 -k], combinationsArr[combArrLen - k])) {
                state = false
            }
        }

        if(state) {
            //period found - return its size
            return rowNumber + 2 - k
        }
    }
}

function checkRowEquality(row1, row2) {
    strJoined1 = row1.join('')
    strJoined2 = row2.join('')
    console.log(strJoined1, '?', strJoined2)

    if (strJoined1 == strJoined2) {
        return true
    }

    return false
}

function printResults(combinationsArr, patternArr, period) {
    htmlContentToAppend +=
    '<div id="calc-attr-wrapper">' +
        '<div class="count-attr">' +
            '<h5 id="label">Predpis: </h5>' +
            '<h5 id="label">Prvotné kombinácie v F(2): </h5>'

    for(let i = 0; i < combArrLen; i++) {
        htmlContentToAppend +=
            '<h5 style="opacity: 0">b</h5>'
    }
    htmlContentToAppend += 
            '<h5 id="label">Počítanie periódy: </h5>' +
        '</div>' +
        '<div class="count-val">' +
            '<h5 class="font-weight-light">' + patternArr + '</h5>'
    
    for(let i = 0; i < combArrLen; i++) {
        htmlContentToAppend +=
            '<h5 class="font-weight-light">' + combinationsArr[i] + '</h5>'
    }

    let underscores = ''
    for(let i = 0; i < 2**combArrLen; i++) {
        underscores += '__'
    }
        htmlContentToAppend +=
            '<h5 class="font-weight-light">' + underscores + '</h5>'
    for(let l = combArrLen; l < combinationsArr.length; l++) {
        if(l == combinationsArr.length-1) {
            htmlContentToAppend +=
            '<div style="display: flex;">' +
                '<h5 class="font-weight-normal">' + combinationsArr[l] + '</h5>' +
                '<h5 class="font-weifht-normal"> &rarr; Perióda nájdená</h5>' +
            '</div>'
        }
        else {
            htmlContentToAppend +=
                '<h5 class="font-weight-light">' + combinationsArr[l] + '</h5>'
        }
    }

    htmlContentToAppend +=
        '</div>' +
        '<div class="count-result">' +
            '<h3>Perióda:</h3>' +
            '<h1>' + period + '</h1>' 
        '</div>' +
    '</div>'
}
combArrLen = 0
fieldLimit = 2 //F(2)

function generatePattern() {
    let patternArr = []
    input = (document.getElementById('input').value).split(',')
    combArrLen = input[0]

    for(let i = 0; i < input.length; i++) {
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
                sum += combinationsArr[i + patternArr[l]][j]
            }
            sum = sum % 2
            combinationsArr[i].push(sum)
        }

        period = checkRows(i)
        i++
    }

    //end of the algorithm
    console.log(period)
}

function checkRows(rowNumber) {
    if (checkRowEquality(combinationsArr[rowNumber], combinationsArr[combArrLen - 1])) {
        let state = true
        for(let k = 2; k < combArrLen + 1; k++) {
            if(!checkRowEquality(combinationsArr[rowNumber + 1 -k], combinationsArr[combArrLen - k])) {
                state = false
            }
        }

        if(state) {
            //period found - return its size
            return rowNumber + 1 - k
        }
    }
}

function checkRowEquality(row1, row2) {
    strJoined1
    strJoined2

    if (strJoined1 == strJoined2) {
        return true
    }

    return false
}
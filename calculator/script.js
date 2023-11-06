const body = document.querySelector('body')
const randomTheme = () => {
    const themes = ['olive', 'green', 'blue']
    const random = themes[Math.floor(Math.random() * 3)]
    body.classList.add(random)
}

randomTheme()

const calculations = document.getElementById('calculations')
const afterCalculation = document.getElementById('afterCalculation')
const numbers = document.querySelectorAll('.numbers > div')
const dot = document.getElementById('dot')

numbers.forEach(number => {
    number.onclick = () => {
        if (calculations.innerText == '0' || calculations.innerText == "Can't divide by 0") {
            calculations.innerText = number.innerText
        } else if(afterCalculation.innerText.includes('=')) {
            calculations.innerText = number.innerText
            afterCalculation.innerText = ''
        } else {
            calculations.innerText += number.innerText
        }
        
    }

    dot.onclick = () => {
        if(calculations.innerText.includes('.')) {
            return
        } else {
            calculations.innerText += dot.innerText
        }
    }
})

const remove = document.getElementById('delete')

remove.onclick = () => {
    if (calculations.innerText.length == 1 || calculations.innerText == "Can't divide by 0") {
        calculations.innerText = 0
    } else {
        calculations.innerText = calculations.innerText.slice(0, -1)
    }
}

const clearAll = document.getElementById('removeAll')


clearAll.onclick = () => {
    calculations.innerText = 0
    afterCalculation.innerText = ''
}

const operations = document.querySelectorAll('#operations > div')

operations.forEach(operation => {
    operation.onclick = () => {
        const operator = operation.innerText


        if(calculations.innerText == "Can't divide by 0") {
            calculations.innerText = 0
            afterCalculation.innerText = afterCalculation.innerHTML.slice(0, -1) + operator
        } else if(calculations.innerText == '0' && afterCalculation.innerText !== '' && !afterCalculation.innerText.includes('=')){
            afterCalculation.innerText = afterCalculation.innerText.slice(0, -1) + operator
        } else if(afterCalculation.innerText !== '' && !afterCalculation.innerText.includes('=')) {
            const operatorTemporary = afterCalculation.innerText.slice(-1)
            afterCalculation.innerText = result(operatorTemporary) + ' ' + operator
            calculations.innerText = 0
        } else {
            afterCalculation.innerText = calculations.innerText + ' ' + operator
            calculations.innerText = 0
        }

        const equals = document.getElementById('equals')
        equals.onclick = () => {
            if(calculations.innerText == 0 && operator == '÷') {
                calculations.innerText = "Can't divide by 0"
            }else {
                endCalculation(result(operator))
            }
        }
    }
})

const result = (operator) => {
    if(operator == '÷') {
        return Number(afterCalculation.innerText.slice(0, -1)) / Number(calculations.innerText)
    } else if(operator == '×') {
        return Number(afterCalculation.innerText.slice(0, -1)) * Number(calculations.innerText)
    } else if(operator == '−') {
        return Number(afterCalculation.innerText.slice(0, -1)) - Number(calculations.innerText)
    } else if(operator == '+') {
        return Number(afterCalculation.innerText.slice(0, -1)) + Number(calculations.innerText)
    }
}

const endCalculation = (operationResult) => {
    if(afterCalculation.innerText == '' || afterCalculation.innerText.includes('=') || calculations.innerText == "Can't divide by 0") {
        return
    } else {
        afterCalculation.innerText = afterCalculation.innerText + ' ' + calculations.innerText + ' ' + '='
        calculations.innerText = operationResult
    }
}
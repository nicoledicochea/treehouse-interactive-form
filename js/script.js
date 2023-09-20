// name field

const nameInput = document.querySelector('#name')
document.addEventListener('DOMContentLoaded', (e) => {
    nameInput.focus()
})

// job role section

const jobRole = document.querySelector('select#title')

const otherJobInput = document.querySelector('#other-job-role')

document.addEventListener('DOMContentLoaded', (e) => {  
    otherJobInput.hidden = true
})

jobRole.addEventListener('change', (e) => {
    console.log(e.target.value)
    if(e.target.value ==='other') {
        otherJobInput.hidden = false
    }
})

// t-shirt info

const colorSelect = document.querySelector('#color')
colorSelect.disabled = true

const designSelect = document.querySelector('#design')
designSelect.addEventListener('change', (e) => {
    const design = e.target.value
    colorSelect.disabled = false
    const colorOptions = colorSelect.querySelectorAll(`option`)
    colorOptions.forEach(option => {
        if(option.dataset.theme === design) {
            option.hidden = false
        } else {
            option.hidden = true
        }
    })
})


// activities 

const activitiesField = document.querySelector('#activities')

activitiesField.addEventListener('change', (e) => {
    const total = document.querySelector('#activities-cost')
    const regex = /(\w*)(: \$)(\d{1,})/i
    let totalCost = total.innerText.replace(regex, '$3')
    // let totalCost = total.innerText.split('$').slice(-1)
    totalCost = +totalCost
    
    const activityChecked = e.target

    if(activityChecked.checked) {
        const activityCost = activityChecked.dataset.cost
        totalCost += +activityCost
        total.innerText = `Total: $${totalCost}`
    } else {
        const activityCost = activityChecked.dataset.cost
        totalCost -= +activityCost
        total.innerText = `Total: $${totalCost}`
    }
})

// payment info

const paymentSelect = document.querySelector('#payment')

const creditCard = document.querySelector('#credit-card')

document.addEventListener('DOMContentLoaded', (e) => {
    paymentSelect.value = 'credit-card'

    creditCard.style.display = 'block'
    paypal.style.display = 'none'
    bitcoin.style.display = 'none'
})

paymentSelect.addEventListener('change', (e) => {
    
    const paypal = document.querySelector('#paypal')
    const bitcoin = document.querySelector('#bitcoin')

    const paymentChoice = e.target.value
    
    if(paymentChoice === 'paypal') {
        creditCard.style.display = 'none'
        paypal.style.display = 'block'
        bitcoin.style.display = 'none'
    } else if (paymentChoice === 'bitcoin') {
        creditCard.style.display = 'none'
        paypal.style.display = 'none'
        bitcoin.style.display = 'block'
    } else {
        creditCard.style.display = 'block'
        paypal.style.display = 'none'
        bitcoin.style.display = 'none'
    }
})

// form validation
// visual validation errors

function isValidEmail() {
    const email = document.querySelector('#email').value
    // regex code referenced from https://emailregex.com/
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(email)
}

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {

    // name validation

    function isValidName() {
        let userName = document.querySelector('#name')

        userName = userName.value.trim()
        return userName !== ''

    }

    if(isValidName()) {
        userName.parentElement.classList.add('valid')
        userName.parentElement.classList.remove('not-valid')
        userName.nextElementSibling.style.display = 'block'
    } else {
        e.preventDefault()
    }

    // email validation

    if (!isValidEmail()) {
        e.preventDefault()
        // console.log('invalid')
    }

    // activity validation

    function isValidActivity() {
        const total = document.querySelector('#activities-cost')
        const regex = /(\w*)(: \$)(\d{1,})/i
        let totalCost = total.innerText.replace(regex, '$3')
        totalCost = +totalCost

        return totalCost === 0
    }

    
    if(isValidActivity()) {
        e.preventDefault()
        // console.log('no activity chosen')
    }


    // credit card validation
    
    function isValidCCNum() {
        const ccNum = document.querySelector('#cc-num')

        const regex = /^\d{13,16}$/
        return regex.test(ccNum.value)
    }

    function isValidZipCode() {
        const zip = document.querySelector('#zip')

        const regex = /^\d{5}$/
        return regex.test(zip.value)
    }

    function isValidCVV() {
        const cvv = document.querySelector('#cvv')

        const regex = /^\d{3}$/
        return regex.test(cvv.value)
    }

    if(paymentSelect.value === 'credit-card') {
        if(!isValidCCNum()) {
            e.preventDefault()
            // console.log('invalid num')
        }
        
        if(!isValidZipCode()) {
            e.preventDefault()
            // console.log('invalid zip')
        }

        if(!isValidCVV()) {
            e.preventDefault()
            // console.log('invalid cvv')
        }
    }
    
})


// the activities section

const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]')

activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus')
    })
})

activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus')
    })
})




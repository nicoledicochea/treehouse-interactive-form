const form = document.querySelector('form')

// basic info
const nameInput = document.querySelector('#name')
const email = document.querySelector('#email')
const jobRole = document.querySelector('select#title')
const otherJobInput = document.querySelector('#other-job-role')
const colorSelect = document.querySelector('#color')
const designSelect = document.querySelector('#design')
const colorOptions = colorSelect.querySelectorAll(`option`)

// activities field
const activitiesField = document.querySelector('#activities')
const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]')
const activitiesTotalCost = document.querySelector('#activities-cost')

// payment info
const paymentSelect = document.querySelector('#payment')
const creditCard = document.querySelector('#credit-card')
const ccNum = document.querySelector('#cc-num')
const zip = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')

document.addEventListener('DOMContentLoaded', () => {
    nameInput.focus()
    otherJobInput.hidden = true
    colorSelect.disabled = true
    paymentSelect.value = 'credit-card'
    creditCard.style.display = 'block'
    paypal.style.display = 'none'
    bitcoin.style.display = 'none'
})

jobRole.addEventListener('change', (e) => {
    if(e.target.value ==='other') {
        otherJobInput.hidden = false
    }
})

designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false
    const design = e.target.value
    colorOptions.forEach(option => {
        if(option.dataset.theme === design) {
            option.hidden = false
        } else {
            option.hidden = true
        }
    })
})

activitiesField.addEventListener('change', (e) => {
    const activityChecked = e.target
    const dayTime = document.querySelectorAll('[data-day-and-time]')
    const regex = /(\w*)(: \$)(\d{1,})/i

    let totalCost = activitiesTotalCost.innerText.replace(regex, '$3')
    totalCost = +totalCost

    function disableConflictingActivities() {
        dayTime.forEach(checkbox => {
            if(checkbox !== activityChecked 
            && checkbox.dataset.dayAndTime === activityChecked.dataset.dayAndTime) {
                checkbox.disabled = true
                checkbox.parentElement.classList.add('disabled')
            }
        })
    }
    function enableConflictingActivities() {
        dayTime.forEach(checkbox => {
            if(checkbox !== activityChecked 
            && checkbox.dataset.dayAndTime === activityChecked.dataset.dayAndTime) {
                checkbox.disabled = false
                checkbox.parentElement.classList.remove('disabled')
            }
        })
    }

    if(activityChecked.checked) {
        const cost = activityChecked.dataset.cost
        totalCost += +cost
        activitiesTotalCost.innerText = `Total: $${totalCost}`
        disableConflictingActivities()
    } else {
        const cost = activityChecked.dataset.cost
        totalCost -= +cost
        activitiesTotalCost.innerText = `Total: $${totalCost}`
        enableConflictingActivities()
    }
})

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

paymentSelect.addEventListener('change', (e) => {
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

form.addEventListener('submit', (e) => {

    function displayHint(element, validator) {
        if(validator) {
            element.parentElement.classList.add('valid')
            element.parentElement.classList.remove('not-valid')
            element.nextElementSibling.style.display = 'none'
        } else {
            e.preventDefault()
            element.parentElement.classList.add('not-valid')
            element.parentElement.classList.remove('valid')
            element.nextElementSibling.style.display = 'block'
        }
    }
    // function isValidName() {
    //     return nameInput.value.trim() !== ''
    // }
    function isValidEmail() {
        // regex code referenced from https://emailregex.com/
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(email.value)
    }
    function isValidActivity() {
        const regex = /(\w*)(: \$)(\d{1,})/i
        let totalCost = activitiesTotalCost.innerText.replace(regex, '$3')
        totalCost = +totalCost
        return totalCost !== 0
    }
    function isValidCCNum() {
        const regex = /^\d{13,16}$/
        return regex.test(ccNum.value)
    }
    function isValidZipCode() {
        const regex = /^\d{5}$/
        return regex.test(zip.value)
    }
    function isValidCVV() {
        const regex = /^\d{3}$/
        return regex.test(cvv.value)
    }

    // displayHint(nameInput, isValidName())
    displayHint(email, isValidEmail())
    displayHint(activitiesTotalCost, isValidActivity())

    if(paymentSelect.value === 'credit-card') {
        displayHint(ccNum, isValidCCNum())
        displayHint(zip, isValidZipCode())
        displayHint(cvv, isValidCVV())
    }
})

nameInput.addEventListener('keyup', (e) => {

    function isValidName() {
        return nameInput.value.trim() !== ''
    }

    // function nameContainsDigits() {
    //     const regex = /\d+/
    //     return regex.test(nameInput.value)
    // }
    
 if(isValidName()) {
        nameInput.parentElement.classList.add('valid')
        nameInput.parentElement.classList.remove('not-valid')
        nameInput.nextElementSibling.style.display = 'none'
    } else {
        e.preventDefault()
        nameInput.parentElement.classList.add('not-valid')
        nameInput.parentElement.classList.remove('valid')
        nameInput.nextElementSibling.style.display = 'block'
    }
})
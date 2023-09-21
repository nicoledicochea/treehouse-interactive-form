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

    // conflicting activity times
        // Tuesday 9am-12pm
        // Tuesday 9am-12pm
        // Tuesday 1pm-4pm
        // Tuesday 1pm-4pm
        // Wednesday 9am-12pm
        // Wednesday 1pm-4pm

    // select all 'data-day-and-time' attributes
    // loop through all activities
        // if activity value equals e.target value 
            // disable checkbox input
            // add 'disabled' class to parent label
        // else 
            // enable checkbox input
            // remove 'disabled class from parent label
    
    const dayTime = document.querySelectorAll('[data-day-and-time]')

    // actvitity checked TRUE

    if (activityChecked.checked) {
        dayTime.forEach(input => {
            if (input !== activityChecked) {
                if (input.dataset.dayAndTime === activityChecked.dataset.dayAndTime) {
                    input.disabled = true
                input.parentElement.classList.add('disabled')
                }
            } 
        })

    // actvitity checked FALSE

    } else {
        dayTime.forEach(input => {
            if (input !== activityChecked) {
                if (input.dataset.dayAndTime === activityChecked.dataset.dayAndTime) {
                    input.disabled = false
                input.parentElement.classList.remove('disabled')
                } 
            } 
        })
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



const form = document.querySelector('form')

form.addEventListener('submit', (e) => {

    // name validation
    
    function isValidName() {
        let name = document.querySelector('#name')
        name = name.value.trim()
        return name !== ''
    }

    const name = document.querySelector('#name')

    if(isValidName()) {
        name.parentElement.classList.add('valid')
        name.parentElement.classList.remove('not-valid')
        name.nextElementSibling.style.display = 'none'
    } else {
        e.preventDefault()
        name.parentElement.classList.add('not-valid')
        name.parentElement.classList.remove('valid')
        name.nextElementSibling.style.display = 'block'
    }

    // email validation

    function isValidEmail() {
        const email = document.querySelector('#email').value
        // regex code referenced from https://emailregex.com/
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        return regex.test(email)
    }

    const email = document.querySelector('#email')

    if (isValidEmail()) {
        email.parentElement.classList.add('valid')
        email.parentElement.classList.remove('not-valid')
        email.nextElementSibling.style.display = 'none'
    } else {
        e.preventDefault()
        email.parentElement.classList.add('not-valid')
        email.parentElement.classList.remove('valid')
        email.nextElementSibling.style.display = 'block'
    }

    // activity validation

    function isValidActivity() {
        const total = document.querySelector('#activities-cost')
        const regex = /(\w*)(: \$)(\d{1,})/i
        let totalCost = total.innerText.replace(regex, '$3')
        totalCost = +totalCost

        return totalCost === 0
    }

    if(!isValidActivity()) {
        activitiesField.classList.add('valid')
        activitiesField.classList.remove('not-valid')
        activitiesField.lastElementChild.style.display = 'none'
    } else {
        e.preventDefault()
        activitiesField.classList.add('not-valid')
        activitiesField.classList.remove('valid')
        activitiesField.lastElementChild.style.display = 'block'
    }


    // credit card validation

    const ccNum = document.querySelector('#cc-num')
    const zip = document.querySelector('#zip')
    const cvv = document.querySelector('#cvv')

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

    function displayHint(element, validator) {
        // if validator is true
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

    if(paymentSelect.value === 'credit-card') {
        displayHint(ccNum, isValidCCNum())
        displayHint(zip, isValidZipCode())
        displayHint(cvv, isValidCVV())
    }
    
})


// the activities section focus/blur



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




// validation using helper functions

// // displayHint helper function
// function displayHint(display, element) {
//     // show element when show is true
//     // hide when show is false
//     if (display) {
//         element.style.display = 'block'
//     } else {
//         element.style.display = 'none'
//     }
// }

// // createListener helper function
// function createListener(validator) {
//     return e => {
//         const text = e.target.value
//         const valid = validator(text)
//         const showHint
//     }
// }


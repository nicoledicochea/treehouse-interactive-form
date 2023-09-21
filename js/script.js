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

/*** 
 * @event
 * set default values once the DOM loads
*/
document.addEventListener('DOMContentLoaded', () => {
    nameInput.focus()
    otherJobInput.hidden = true
    colorSelect.disabled = true
    paymentSelect.value = 'credit-card'
    creditCard.style.display = 'block'
    paypal.style.display = 'none'
    bitcoin.style.display = 'none'
})

/*** 
 * @event
 * conditionally show 'other job role' input box 
*/
jobRole.addEventListener('change', (e) => {
    if(e.target.value ==='other') {
        otherJobInput.hidden = false
    } else {
        otherJobInput.hidden = true
    }
})

/*** 
 * @event
 * change color options when design input changes
*/
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

/*** 
 * @event
 * update activities total cost and disable conflicting activity times when checkbox input changes
*/
activitiesField.addEventListener('change', (e) => {
    const activityChecked = e.target
    const dayTime = document.querySelectorAll('[data-day-and-time]')
    const regex = /(\w*)(: \$)(\d{1,})/i

    let totalCost = activitiesTotalCost.innerText.replace(regex, '$3')
    totalCost = +totalCost
    /*** 
     * @function disableConflictingActivities
     * when e.targeet checked, disable conflicting activities
    */
    function disableConflictingActivities() {
        dayTime.forEach(checkbox => {
            if(checkbox !== activityChecked 
            && checkbox.dataset.dayAndTime === activityChecked.dataset.dayAndTime) {
                checkbox.disabled = true
                checkbox.parentElement.classList.add('disabled')
            }
        })
    }
    /*** 
     * @function disableConflictingActivities
     * when e.targeet unchecked, enable conflicting activities
    */
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

/*** 
 * @event
 * add focus class when activity checkbox focused
*/
activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus')
    })
})

/*** 
 * @event
 * remove focus class when activity checkbox not focused
*/
activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus')
    })
})

/*** 
 * @event
 * change payment option when payment selection changes
*/
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

/*** 
 * @event
 * user validation for the form upon submit
*/
form.addEventListener('submit', (e) => {
    /*** 
     * @function displayHint
     * conditionally displays hint for required sections
     * @param {@Object} element - input field
     * @param {@Function} validator - function for validation (ie. isValidName)
    */
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
    /*** 
     * @function isValidName
     * checks if the user input is not blank
     * @returns {@boolean}
    */
    function isValidName() {
        return nameInput.value.trim() !== ''
    }
    /*** 
     * @function isValidEmail
     * checks if the user input email has the correct format
     * @returns {@boolean}
    */
    function isValidEmail() {
        // regex code referenced from https://emailregex.com/
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(email.value)
    }
    /*** 
     * @function isValidActivity
     * checks if at least one activity is checked
     * @returns {@boolean}
    */
    function isValidActivity() {
        const regex = /(\w*)(: \$)(\d{1,})/i
        let totalCost = activitiesTotalCost.innerText.replace(regex, '$3')
        totalCost = +totalCost
        return totalCost !== 0
    }
    /*** 
     * @function isValidCCNum
     * checks if the credit card num has 13 - 16 digits
     * @returns {@boolean}
    */
    function isValidCCNum() {
        const regex = /^\d{13,16}$/
        return regex.test(ccNum.value)
    }
    /*** 
     * @function isValidZipCode
     * checks if the zip code has 5 digits
     * @returns {@boolean}
    */
    function isValidZipCode() {
        const regex = /^\d{5}$/
        return regex.test(zip.value)
    }
    /*** 
     * @function isValidCVV
     * checks if the cvv num has 3 digits
     * @returns {@boolean}
    */
    function isValidCVV() {
        const regex = /^\d{3}$/
        return regex.test(cvv.value)
    }

    /*** 
     * call displayHint on all required form fields
    */
    displayHint(nameInput, isValidName())
    displayHint(email, isValidEmail())
    displayHint(activitiesTotalCost, isValidActivity())
    if(paymentSelect.value === 'credit-card') {
        displayHint(ccNum, isValidCCNum())
        displayHint(zip, isValidZipCode())
        displayHint(cvv, isValidCVV())
    }
})

/*** 
 * create and insert the additional name input hint
*/
const additionalNameHint = document.createElement('span')
additionalNameHint.innerText = "Name field cannot contain digits"
additionalNameHint.classList.add('name-hint')
additionalNameHint.classList.add('hint')
additionalNameHint.style.display = 'none'
const nameLabel = nameInput.parentElement
const nameHint = nameInput.nextElementSibling
nameLabel.insertAdjacentElement('beforeend', additionalNameHint)

/*** 
 * @event
 * user validation for name input when a key is released
*/
nameInput.addEventListener('keyup', (e) => {
    /*** 
     * @function isNameBlank
     * checks if the user input is blank
    */
    function isNameBlank() {
        return nameInput.value.trim() === ''
    }
    /*** 
     * @function nameContainsDigits
     * checks if the user input has any digits
    */
    function nameContainsDigits() {
        const regex = /\d+/
        return regex.test(nameInput.value)
    }
    if(nameContainsDigits()) {
        nameLabel.classList.add('not-valid')
        nameLabel.classList.remove('valid')
        nameHint.style.display = 'none'
        additionalNameHint.style.display = 'block'
    } else if(isNameBlank()) {
        nameLabel.classList.add('not-valid')
        nameLabel.classList.remove('valid')
        nameHint.style.display = 'block'
        additionalNameHint.style.display = 'none'
    } else {
        nameLabel.classList.add('valid')
        nameLabel.classList.remove('not-valid')
        nameHint.style.display = 'none'
        additionalNameHint.style.display = 'none'
    }
})
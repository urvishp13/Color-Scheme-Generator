const schemeModeSelectorBtn = document.getElementById("scheme-mode-selector-btn")
const schemeModesDropdown = document.getElementById("scheme-dropdown")
const schemeOptions = document.querySelectorAll(".option")
const selectedScheme = document.getElementById("selected-value")
let selectedRadio = document.querySelector('input[type="radio"]:checked') // get the radio selected by default on startup
console.log(selectedRadio)

schemeModeSelectorBtn.addEventListener("click", function() {
    schemeModesDropdown.classList.toggle("show")
})

schemeOptions.forEach(option => option.addEventListener("click", function() {
    selectedScheme.textContent = option.textContent
    schemeModesDropdown.classList.remove("show")
}))

// when a new scheme option is clicked, move the checkmark to that option
schemeModesDropdown.addEventListener("change", function() {
    // get the label of the previously selected option
    const radioLabel = selectedRadio.nextElementSibling
    // extract the checkmark from that option
    const checkmark = radioLabel.children[0]
    // remove it from that option
    radioLabel.removeChild(checkmark)
    // get the new selected option
    selectedRadio = document.querySelector('input[type="radio"]:checked')
    const newRadioLabel = selectedRadio.nextElementSibling
    // add the checkmark next to the new selected option
    newRadioLabel.appendChild(checkmark)
})

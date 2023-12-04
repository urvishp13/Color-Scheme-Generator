const schemeModeSelectorBtn = document.getElementById("scheme-mode-selector-btn")
const schemeModesDropdown = document.getElementById("scheme-dropdown")
const schemeOptions = document.querySelectorAll(".option")
const selectedScheme = document.getElementById("selected-value")
let selectedRadio = document.querySelector('input[type="radio"]:checked') // get the radio selected by default on startup

const form = document.getElementById("scheme-picker-form")
const colorWheel = document.getElementById("color-wheel")

let colorChosen = colorWheel.value.split("#")[1]
let schemeChosen = selectedScheme.textContent.toLowerCase()

// get the color selected after closing the color wheel pop-up
colorWheel.addEventListener("change", function(e) {
    colorChosen = e.target.value.split("#")[1]
})

// show/hide the scheme modes dropdown
schemeModeSelectorBtn.addEventListener("click", function() {
    schemeModesDropdown.classList.toggle("show")
})

// show the selected scheme from the dropdown in the UI display once the dropdown is hidden
schemeOptions.forEach(option => option.addEventListener("click", function() {
    selectedScheme.textContent = option.textContent
    schemeChosen = selectedScheme.textContent.trim().toLowerCase()
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

// when all the inputs are submitted and a color scheme is wanted back
form.addEventListener('submit', function(e) {
    // don't wan't chosen scheme option to go back to default upon submission
    e.preventDefault()
    // GET the color scheme from the ColorAPI
    // get the seed colot and get the scheme type
    console.log({colorChosen}, {schemeChosen})
    // send these two qualifications to the API
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChosen}&mode=${schemeChosen}`)
        .then(res => res.json())
        .then(palette => console.log(palette))

})

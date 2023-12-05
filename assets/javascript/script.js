const schemeModeSelectorBtn = document.getElementById("scheme-mode-selector-btn")
const schemeModesDropdown = document.getElementById("scheme-dropdown")
const schemeOptions = document.querySelectorAll(".option")
const selectedScheme = document.getElementById("selected-value")
let selectedRadio = document.querySelector('input[type="radio"]:checked') // get the radio selected by default on startup

const form = document.getElementById("scheme-picker-form")
const colorWheel = document.getElementById("color-wheel")

let colorChosen = colorWheel.value.split("#")[1]
let schemeChosen = selectedScheme.textContent.toLowerCase()

const schemeColorSlots = document.getElementsByClassName("color")
const schemeColorHexes = document.getElementsByClassName("hex")

function fetchColorScheme(e) {
    // don't wan't chosen scheme option to go back to default upon submission
    e.preventDefault()
    // GET the color scheme from the ColorAPI
    // send the seed color and the scheme type to the API
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChosen}&mode=${schemeChosen}`)
        .then(res => res.json())
        .then(palette => drawColorScheme(palette))
}

function drawColorScheme(palette) {
    console.log(palette.colors)
    const colors = palette.colors
    // loop through all the slots, hexes, and colors
    for (let i = 0; i < colors.length; i++) {
        // fill corresponding slot and hex with corresponding color and hex code
        schemeColorSlots[i].style.backgroundColor = colors[i].hex.value
        schemeColorHexes[i].textContent = colors[i].hex.value
    }
}

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
form.addEventListener('submit', fetchColorScheme)

// on document load, display a placeholder scheme to make the display not seem blank and confusing
window.addEventListener("load", fetchColorScheme)

// make the hex codes clickable so can copy their value

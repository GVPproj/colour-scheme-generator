const bars = [
  document.getElementById("colour-bar-1"),
  document.getElementById("colour-bar-2"),
  document.getElementById("colour-bar-3"),
  document.getElementById("colour-bar-4"),
  document.getElementById("colour-bar-5"),
] // all our colour bars in the DOM
const hexCodes = [
  document.getElementById("hex-1"),
  document.getElementById("hex-2"),
  document.getElementById("hex-3"),
  document.getElementById("hex-4"),
  document.getElementById("hex-5"),
] // all our hex code buttons at bottom
const colourPicker = document.getElementById("colour-picker")
const schemeSelect = document.getElementById("scheme-select")
const submitBtn = document.getElementById("btn-submit")
const userHexDisplay = document.getElementById("user-hex-display")
const copyNotification = document.getElementById("copy-notification")


let userHex = colourPicker.value
userHexDisplay.value = userHex

initialize()

colourPicker.addEventListener("change", watchColorPicker, false)
userHexDisplay.addEventListener("change", () => {
  userHex = userHexDisplay.value
  colourPicker.value = userHex
})
submitBtn.addEventListener("click", fetchScheme)

function initialize() {
  bars[0].style.background = colourPicker.value
  bars[1].style.background = "#EE61E5"
  bars[2].style.background = "#FF4444"
  bars[3].style.background = "#00ffff"
  bars[4].style.background = "#45E255"

  hexCodes[0].textContent = colourPicker.value
  hexCodes[1].textContent = "#EE61E5"
  hexCodes[2].textContent = "#FF4444"
  hexCodes[3].textContent = "#00ffff"
  hexCodes[4].textContent = "#45E255"
}

function watchColorPicker(event) {
  userHex = event.target.value
  userHexDisplay.value = userHex
}

function fetchScheme() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${userHex.substring(
      1,
      userHex.length
    )}&mode=${schemeSelect.value}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      bars[0].style.background = data.colors[0].hex.value
      bars[1].style.background = data.colors[1].hex.value
      bars[2].style.background = data.colors[2].hex.value
      bars[3].style.background = data.colors[3].hex.value
      bars[4].style.background = data.colors[4].hex.value
      hexCodes[0].textContent = data.colors[0].hex.value
      hexCodes[1].textContent = data.colors[1].hex.value
      hexCodes[2].textContent = data.colors[2].hex.value
      hexCodes[3].textContent = data.colors[3].hex.value
      hexCodes[4].textContent = data.colors[4].hex.value
    })
}

for (let i = 0; i < hexCodes.length; i++) {
  hexCodes[i].addEventListener("click", () => {
    const code = hexCodes[i].textContent.toUpperCase()
    navigator.clipboard.writeText(code)
    copyNotification.textContent = `Copied ${code} to clipboard!`
    setTimeout(()=>{
        copyNotification.textContent = 'Copy hex codes with a click.'
    }, 1500)
  })
}

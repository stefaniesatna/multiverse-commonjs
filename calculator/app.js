const add = (a, b) => a + b
// const subtract = (a, b) => a - b
// const multiply = (a, b) => a * b
// const divide = (a, b) => a / b

const result = document.getElementById("result")
const buttons = []
const addButton = document.getElementById("add")

addButton.addEventListener("click", () => {
    const num1 = Number(document.getElementById("num1").value)
    const num2 = Number(document.getElementById("num2").value)
    result.innerText = add(num1, num2)
})
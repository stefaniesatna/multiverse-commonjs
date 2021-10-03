function setupEventListeners(){
    const deleteC1button = document.getElementById("delete1")
    console.log(deleteC1button)
    deleteC1button.addEventListener("click", () => {
        console.log("We're in the game!")
        getCompanies()
    })

    let id = 0

    while(true){
        let elementId = `delete${id}`
        let element = document.getElementById(elementId)
        if (!element){
            break;
        }
        element.addEventListener("click", () => {
            console.log("We're in the game!")
        })
    }

}

async function getCompanies(){
    const response = await fetch("/companies")
    const companies = await response.json()
    console.log(companies)
}
setupEventListeners()


con
// setup an iterator (id)
// create a loop
//  concatenate delete with the id and check if such element exists
//    if doesn't, exit loop
//    if does, setup event listener, increment iterator and reassign wholeid
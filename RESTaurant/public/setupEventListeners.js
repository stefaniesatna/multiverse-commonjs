function setupEventListeners(){

    let id = 1;
    
    while (true) {
      let elementId = `delete${id}`;
      let companyId = id
    
      let element = document.getElementById(elementId);
      if (!element) {
        break;
      }
    
      element.addEventListener("click", () => {
          console.log(`You've clicked delete button ${companyId} ${elementId}`)
          deleteCompany(companyId)
      })

      id++;
    }
}

setupEventListeners()

// setup an iterator (id)
// create a loop
//  concatenate delete with the id and check if such element exists
//    if doesn't, exit loop
//    if does, setup event listener, increment iterator and reassign wholeid

async function deleteCompany(id){
    const url = `/companies/${id}`
    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(`Company ${id} successfully deleted`)
}
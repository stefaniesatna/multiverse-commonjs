function setupEventListeners(){

    let elements = document.getElementsByName("deleteButton");

    if (!elements) {
        return
    }

    elements.forEach(el => {
        const companyId = el.getAttribute("companyId")
        el.addEventListener("click", () => {
            deleteCompany(companyId)
        })
    })

}

async function deleteCompany(id){
    const url = `/companies/${id}`;
    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    location.reload()
}

setupEventListeners()
let inputEl=document.getElementById("searchInput");
let outputEl=document.getElementById("searchResults")
let spinnerEl=document.getElementById('spinner')
function createandAppend(result){
    // {link,title,description}=result
    let containerEl=document.createElement('div');
    containerEl.classList.add("result-item")
    outputEl.appendChild(containerEl)

    let nameEl=document.createElement('a');
    nameEl.textContent=result.title
    nameEl.classList.add("result-title")
    nameEl.setAttribute('href',result.link)
    containerEl.appendChild(nameEl)

    let brEl=document.createElement('br');
    containerEl.appendChild(brEl)

    let linkEl=document.createElement('a');
    linkEl.textContent=result.link
    linkEl.classList.add("result-url")
    linkEl.setAttribute('href',result.link)
    linkEl.target="_blank"
    containerEl.appendChild(linkEl)

    let brEl2=document.createElement('br');
    containerEl.appendChild(brEl2)

    let descriptionEl=document.createElement('p');
    descriptionEl.classList.add("link-description")
    descriptionEl.textContent=result.description
    containerEl.appendChild(descriptionEl)
}

function displayResult(search_results){
    spinnerEl.classList.toggle("d-none")
    for (let result of search_results){
        createandAppend(result);
    }
    
}

function searchWikipedia(event){
    if (event.key==="Enter"){
        spinnerEl.classList.toggle('d-none')
        outputEl.textContent="";
        let inputValue=inputEl.value
        let url="https://apis.ccbp.in/wiki-search?search="+inputValue;
        let options={
            method:"GET"
        }
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let {search_results}=data
            displayResult(search_results);
        })
        inputEl.value=""
    }
    
}



inputEl.addEventListener('keydown',searchWikipedia)



// mapping object
// key present the mapped object
// value present the server response object path 


const mapping = {
    name: { fn: getName, isVisible: true },
    city: { path: "location.city", isVisible: true },
    address: { path: "location.street.name", isVisible: true },
    src: { path: "picture.large", isVisible: true },

}

const mappingWithFunction = {
    name: { fn: getName, isVisible: true },
    name: { fn: getCity, isVisible: true },
}

function getName (user) {
    return `${user.name.first} ${user.name.last}`
}

function getCity (user) {
    return `${user.name.first} ${user.name.last}`
}





 function init () {
        const searchValue = document.querySelector("#search").addEventListener("click", async function(){
           const select = document.querySelector("#select").value
        try {
        const response = await getUsersFetch({ url:  `https://randomuser.me/api/?results=${select}` })
        const { results } = response
        draw(results)
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
})
}




function draw (arrOfObjects) {



    const mappedUsers = arrOfObjects.map((user) => {
        return getMappedUser(user)
    })

    console.log(mappedUsers)
    const name = mappedUsers.map(item => item.name)
    const city = mappedUsers.map(item => item.city)
    const address = mappedUsers.map(item => item.address)
    const src = mappedUsers.map(item => item.src)
  
    const containerData = $("#container-data")
for(let i=0;i<name.length;i++){
    const card=$("<div></div>")
    card.addClass("card")
const cardBody =$("<div></div>")
cardBody.addClass("card-body")
const cardTitle =$("<h1></h1>")
cardTitle.addClass("card-title")
const cardTextCity =$("<p></p>")
const cardTextAddress =$("<p></p>")
cardTextCity.addClass("card-text")
cardTextAddress.addClass("card-text")
    cardTitle.text(name[i])
    cardTextCity.text(city[i] )
    cardTextAddress.text(address[i] )
    const cardImg =$("<img></img>")
    cardImg.attr("src", src[i])
    cardImg.addClass("card-img-top")
    

    cardImg.appendTo(card)
    cardTitle.appendTo(card)
    cardTextCity.appendTo(card)
    cardTextAddress.appendTo(card)
cardBody.appendTo(card)
card.appendTo(containerData)
}








//     <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div>

}

function getMappedUser (user) {
    const keyValueMappingArray = Object.entries(mapping)
    return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
        const [ key, settingObj ] = KEYVALUEPAIR_ARRAY
        const { path } = settingObj
        const isFunction = typeof settingObj[ "fn" ] === 'function'
        return { ...mappedUser, [ key ]: isFunction ? settingObj[ "fn" ](user) : getValueFromPath(path, user) }
    }, {})
}



function getValueFromPath (path, user) {
    if (typeof path !== 'string') return
    const splittedPath = path.split(".")
    const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
        const isValueExist = currentUser[ partOfPath ]
        return isValueExist ? currentUser[ partOfPath ] : "Not Availble"
    }, user)
    return theRequestedValue
}


(function () {
    init()
})()



// init()

// function getMappedUserFn (user) {
//     const keyValueMappingArray = Object.entries(mappingWithFunction)
//     return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
//         const [ key, settingObj ] = KEYVALUEPAIR_ARRAY

//         // console.log(settingObj[ "fn" ])
//         return { ...mappedUser, [ key ]: settingObj[ "fn" ](user) }
//     }, {})
// }

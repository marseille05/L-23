const btnList = [
    {
      id:1,
      caption:"Posts",
      endPoint:"posts"
    },
    {
      id:2,
      caption:"Comments",
      endPoint:"comments"
    },
    {
      id:3,
      caption:"Users",
      endPoint:"users"
    },
    {
      id:4,
      caption:"Albums",
      endPoint:"albums"
    },
    {
      id:5,
      caption:"Photos",
      endPoint:"photos"
    },
    {
      id:6,
      caption:"Todos",
      endPoint:"todos"
    },
  ]

  const container = document.querySelector(".row")
  const cardContainer = document.querySelector(".rowCard")


function getData(endPoint) {
    fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
    .then(response => response.json())
    .then(response => getDatabase(endPoint, response))
}


window.addEventListener("load", () => {
    if(!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "false") {
      window.open("../auth.html", "_self")
    }

    getData("posts", (response) => console.log(response))

    Buttons(btnList)
})


function Buttons(base) {
    const template = base.map(item => {
        return`
        <button onclick="getData('${item.endPoint }')">
            ${item.caption}
        </button>
        `
    }).join(" ")

    container.innerHTML = template;
}


function getDatabase(route, database) {
  var template = ``;
  
  if(route === "posts") {
    template = database.map(item => {
      return `
      <div class="card">
        <h2>${item.title}</h2>
        
        <p>${item.body}</p>
      </div>
      `
    }).join(" ")
  } else if (route === "comments") {
    template = database.map(item => {
      return `
      <div class="cardComments">
        <h2>${item.name}</h2>
        <p>${item.email}</p>
        <p>${item.body}</p>
      </div>
      `
    }).join(" ")
  } else if (route === "users") {
    template = database.map(item => {
      return `
      <div class="cardUsers">
        <h2>${item.name}</h2>
        <p>${item.email}</p>
        <p>${item.username}</p>
        <p>${item.phone}</p>
        <p>${item.website}</p>
      </div>
      `
    }).join(" ")
  } else if (route === "albums") {
    template = database.map(item => {
      return `
      <div class="cardAlbums">
        <h2>${item.title}</h2>
      </div>
      `
    }).join(" ")
  } else if (route === "photos") {
    template = database.map(item => {
      return `
      <div class="cardPhotos">
        <h2>${item.title}</h2>
        <img src="${item.thumbnailUrl}">
        <p>${item.url}</p>
      </div>
      `
    }).join(" ")
  } else {
    template = database.map(item => {
      console.log(item)
      return `
      <div class="cardTodos">
        <h2>${item.title}</h2>
        <p>${item.completed}</p>
      </div>
      `
    }).join(" ")
  }

  cardContainer.innerHTML = template;
}


 
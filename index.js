let url = "https://newsapi.org/v2/everything?language=en&q=india&apiKey=f6b7a74dad3840b5a27ccb9877370e72";


async function getData(){
    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }
}

function setData(){
    getData()
    .then(data => {
        const cardContainer = document.querySelector(".news-cards");
        cardContainer.innerHTML = "";
        data.articles.forEach(item => {
            let title = item.title.toString();
            if(title.length > 100)   title = title.substring(0, 100) + "...";
            let description = item.description.toString();
            if(description.length > 200)   description = description.substring(0, 200) + "...";
            const card = `<div class="card">
                            <div class="image-section">
                                <img src="${item.urlToImage ? item.urlToImage: "./images/logo.png"}" alt="News Image">
                            </div>
                            <div class="description-section">
                                <div class="text-des">
                                    <p class="card-heading">${title}</p>
                                    <textarea disabled class="card-body">${description}</textarea>
                                    <p class="card-datetime">${item.publishedAt.replace("Z","").split("T")[0]} ${item.publishedAt.replace("Z","").split("T")[1]}</p>
                                </div>
                                <div class="card-other">
                                    <span class="card-tag">${item.source.name}</span>
                                    <span onclick="window.open('${item.url}')" class="card-readmore">Read Article <i class="bi bi-arrow-right"></i></span>
                                </div>
                            </div>
                        </div>`;
            cardContainer.innerHTML += card;
        })
    })
    .catch(error => console.log(error));
}

const tag = document.querySelector(".tags");

tag.addEventListener("click", event => {
    url = "https://newsapi.org/v2/";
    const value = event.target.innerHTML.toString();
    if(value === "US(All)") url += "top-headlines?language=en&country=us";
    else if(value === "US(Business)")   url += "top-headlines?language=en&country=us&category=business";
    else if(value === "Cryptocurrency")   url += "everything?language=en&q=cryptocurrency&sortBy=publishedAt";
    else if(value === "Techcrunch")   url += "top-headlines?language=en&domains=techcrunch.com";
    url += "&apiKey=f6b7a74dad3840b5a27ccb9877370e72";
    console.log(url)
    tag.children[0].classList.remove("active");
    tag.children[1].classList.remove("active");
    tag.children[2].classList.remove("active");
    tag.children[3].classList.remove("active");
    event.target.classList.add("active");
    setData();
});

setData();


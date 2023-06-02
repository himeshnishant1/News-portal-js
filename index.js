const url = "https://newsapi.org/v2/everything?language=en&q=tesla&from=2023-05-02&sortBy=publishedAt&apiKey=f6b7a74dad3840b5a27ccb9877370e72";


async function getData(url){
    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }
}

getData(url)
    .then(data => {
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
                                    <p class="card-datetime">${item.publishedAt}</p>
                                </div>
                                <div class="card-other">
                                    <span class="card-tag">${item.source.name}</span>
                                    <span onclick="window.open('${item.url}')" class="card-readmore">Read Article <i class="bi bi-arrow-right"></i></span>
                                </div>
                            </div>
                        </div>`;
            const cardContainer = document.querySelector(".news-cards");
            cardContainer.innerHTML += card;
        })
    })
    .catch(error => console.log(error));


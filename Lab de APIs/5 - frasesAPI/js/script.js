let url = "curl https://api.quotable.io/random";


const RequestAPI = async () => {
    let API = await fetch(url);
    moeda = await API.json();
    console.log(await moeda);
}

fetch('https://api.quotable.io/random')
 .then(response => response.json())
  .then(quotes => {
    p.innerHTML = quotes.content;
      }  
    );

RequestAPI();
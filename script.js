
const baseURL = "https://dummyjson.com/posts"

const btns = document.querySelectorAll(".btn");
const divs = document.querySelectorAll(".content");
const mainDiv = document.querySelectorAll(".fetching");
// fetchingData(callback)
const fetchingData = (div) =>{
    div.innerText+= "\nData loaded...";
    fetch(baseURL)
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        div.innerText="";
        for (let i=0;i<data["posts"].length;i++) {
            let title = data["posts"][i].title;
            let body = data["posts"][i].body;
            div.innerHTML+=`<div class="desc"><h4>${title}</h4><p>${body}</p></div>`
        }
    })
    .catch(error =>{
        div.innerText = error;
    })
};
// fetchDataWithPromise
const fetchDataWithPromise = (div) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(baseURL)
          .then(response => {
            return response.json();
          })
          .then(
            data => {
                div.innerText = "";
                for (let i = 0; i < data["posts"].length; i++) {
                  let title = data["posts"][i].title;
                  let body = data["posts"][i].body;
                  div.innerHTML += `<div class="desc"><h4>${title}</h4><p>${body}</p></div>`;
                }
              }
          )
          .catch(error => {
            reject(div.innerText = "Operation timmed out!");
          });
      }, 5000); // 5 seconds delay
    });
  };


function delay(ms){
    return new Promise(resolve =>setTimeout(resolve,ms));
    };
// fetchingDataWithAsyncAwait
async function fetchingDataWithAsyncAwait(div){
    div.innerText = "Loading...";
    await delay(5000);
    fetchingData(div);

    };
  
//   eventlistner
btns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        const idName = event.target.getAttribute("id"); 
        divs.forEach(div=>{
            if (idName==="callbackId" && div.id==="c1"){
                div.innerText = "callback will be execute after 5sec";
                setTimeout(()=>{
                    div.innerText = "callback executed after 5sec";
                    fetchingData(div);
                },5000);

            }
            else if (idName==="promiseId" && div.id==="c2"){
                div.innerText += "loading...";
                fetchDataWithPromise(div);
            }
            else if (idName==="asyncId" && div.id==="c3"){
                fetchingDataWithAsyncAwait(div);
            };
        });
    });
});
// global error handling
window.onerror = (error) => {
    console.error("Global error:", error);
    
  };
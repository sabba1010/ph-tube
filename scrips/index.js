
// category
// : 
// "Music"
// category_id
// : 
// "1001"
const loadVideoDetails=(videoId)=>{
  console.log(videoId);

  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
  
  `;
  fetch(url)
  .then((res)=>res.json())
  .then((data)=> displayVideoDetails(data.video));
}
// 
const displayVideoDetails=(video)=>{
console.log(video);
document.getElementById("video_details").showModal();
const detailsContainer= document.getElementById("details-container");

detailsContainer.innerHTML=
`
<h2>
${video.title}
</h2>

<div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

`



};
// 


function removeActiveClass(){
    const activebtns= document.getElementsByClassName("active");

for(let btn of activebtns){
    btn.classList.remove("active")
}

    console.log(activebtns);
    
}


function loadcategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data)=> displaycategories(data.categories));
}


function displaycategories(categories) {
// 
 const categaroyContainer = document.getElementById("categaroy-container");

 for(let cat of categories){
    console.log(cat)
 const categaroyDiv = document.createElement("div");
 categaroyDiv.innerHTML=`
  <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" 
   class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white 
   ">${cat.category}</button>
 `;
categaroyContainer.append(categaroyDiv)


 }

}

// 

const loadCategoryVideos=(id)=>{

const url= `
https://openapi.programming-hero.com/api/phero-tube/category/${id}

`;
console.log(url);

fetch(url)
.then((res)=>res.json())
.then((data)=>{
    removeActiveClass();
    const clickedBtn= document.getElementById(`btn-${id}`);
    clickedBtn.classList.add("active")
    console.log(clickedBtn)
    displayVideos(data.category)
})
}


// 
function loadVideos( searchText =""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=
      ${searchText}`)
    .then((res)=>res.json())
    .then((data)=> {
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    });

}

// 

const displayVideos=(videos)=>{
const videoContaoner = document.getElementById("video-contaoner");

videoContaoner.innerHTML = "";

if(videos.length==0){
    videoContaoner.innerHTML = `
    
<div class="col-span-full flex flex-col justify-center items-center mt-16">
    <img class="w-[220px]" src="assets/Icon.png" alt="">
    <h2 class="text-2xl pt-5 font-bold text-center">
        Oops!! Sorry, There is no <br>
                content here
    </h2>
</div>
    `;
    return;
}

videos.forEach(video=>{

   console.log(video) ;

   const videoCard = document.createElement("div");

   videoCard.innerHTML=`
<div class="card bg-base-100  ">
    <figure class="relative">
      <img class="w-full h-[200px] object-cover"
        src="${video.thumbnail}" />
        <span class="absolute bottom-2 right-2 text-white bg-slate-600 p-1 rounded">
            3hrs 56 min ago
        </span>
    </figure>
    <div class="flex gap-3 py-5 px-0">
     <div class="profile">
        <div class="avatar">
            <div class="w-12 rounded-full">
              <img 
  src="${video.authors[0].profile_picture}" />
            </div>
          </div>
     </div>
     <!--  -->
     <div class="intro">
<h2 class="text-sm font-semibold">
    Midnight Serenade
</h2>
<p class="text-sm text-gray-400 flex">
   ${video.authors[0].profile_name}
   ${video.authors[0].verified == true ?` <img class="w-6 h-6 gap-3" src="
    https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``}
   
</p>
<p class="text-sm text-gray-400">
    ${video.others.views} Views
</p>
     </div>
      
      <div class="card-actions justify-end">
       
      </div>
    </div>
    <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show details</button>
  </div>
   `;
videoContaoner.append(videoCard)

})


}


// 
document.getElementById("search-input").addEventListener("keyup",
  (e)=>{
 const input=e.target.value;
 loadVideos(input)
  }
)

// 





loadcategories();










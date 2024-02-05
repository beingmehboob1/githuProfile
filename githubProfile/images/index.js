const url="https://api.github.com/users/"
const search_usernameEle=document.getElementById('search_username');
const search_btnEle=document.getElementById('search_btn');
const profile_box_containerEle=document.getElementById('profile_box_container');
const loadingEle=document.getElementById('loading');

const genearateProfile=(profile)=>{
return (
    `
   <div class="profile_box">
        <div class="top_section">
            <div class="left">
                <div class="avtar">
                    <img width="200px" src="${profile.avatar_url}" alt="avtar"/>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}"><button class="primary_button">Check profile</button></a>
            </div>
        </div>
        <div class="about_section">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="staus_item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="staus_item">
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>
            <div class="staus_item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div> 
    `
)
    
};

const fetchProfile=async()=>{
    const username=search_usernameEle.value;

    loadingEle.innerHTML="loading......."
    loadingEle.style.color="black"

    try{

        const res = await fetch(`${url}${username}`);
        const data= await res.json();
        console.log(data)
        if(data.name){
            loadingEle.innerHTML="";
            profile_box_containerEle.innerHTML = genearateProfile(data);
        }
        else{
            loadingEle.innerHTML= "data not found";
            loadingEle.style.color="red";
        }

    }
    catch(error){
        console.log({error})
        loadingEle.innerHTML="";
    }

}

search_btnEle.addEventListener('click', fetchProfile);

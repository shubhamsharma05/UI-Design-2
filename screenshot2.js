var countryDetails=[
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/af-flag.jpg",
        Cname:"Afghanistan",
        popul:"33,332,025",
        region:"Asia",
        capital:"Kabul"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/au-flag.jpg",
        Cname:"Australia",
        popul:"22,992,654",
        region:"Australia",
        capital:"Canberra"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/bh-flag.jpg",
        Cname:"Bahrain",
        popul:"1,378,904",
        region:"Asia",
        capital:"Manama"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/be-flag.jpg",
        Cname:"Belgium",
        popul:"11,455,598",
        region:"Europe",
        capital:"Brussels"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/bt-flag.jpg",
        Cname:"Bhutan",
        popul:"750.200",
        region:"Asia",
        capital:"Thimphu"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/br-flag.jpg",
        Cname:"Brazil",
        popul:"205,455,900",
        region:"South America",
        capital:"Brasilia"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/bg-flag.jpg",
        Cname:"Bulgaria",
        popul:"7,144,655",
        region:"Europe",
        capital:"Sofia"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/ca-flag.jpg",
        Cname:"Canada",
        popul:"35,365,822",
        region:"North America",
        capital:"Ottawa"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/cf-flag.jpg",
        Cname:"Central African Republic",
        popul:"5,507,250",
        region:"Africa",
        capital:"Bangui"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/dk-flag.jpg",
        Cname:"Denmark",
        popul:"5,593,875",
        region:"Europe",
        capital:"Copenhagen"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/eg-flag.jpg",
        Cname:"Egypt",
        popul:"94,778,450",
        region:"Africa",
        capital:"Cairo"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/fr-flag.jpg",
        Cname:"France",
        popul:"66,756,852",
        region:"Europe",
        capital:"Paris"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/de-flag.jpg",
        Cname:"Germany",
        popul:"80,722,145",
        region:"Europe",
        capital:"Berlin"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/in-flag.jpg",
        Cname:"India",
        popul:"1266.450.812",
        region:"Asia",
        capital:"Delhi"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/ir-flag.jpg",
        Cname:"Iran",
        popul:"82,145,855",
        region:"Asia",
        capital:"Tehran"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/my-flag.jpg",
        Cname:"Malaysia",
        popul:"31,122,450",
        region:"Asia",
        capital:"Kuala Lumpur"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/ru-flag.jpg",
        Cname:"Russia",
        popul:"142,455,891",
        region:"Europe",
        capital:"Moscow"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/za-flag.jpg",
        Cname:"South Africa",
        popul:"54,145,855",
        region:"Africa",
        capital:"Pretoria"},
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/us-flag.jpg",
        Cname:"United States",
        popul:"323,888,123",
        region:"North America",
        capital:"Washington"
    },
    {
        flag:"https://www.worldatlas.com/r/w425/img/flag/ve-flag.jpg",
        Cname:"Venezuela",
        popul:"39,888,123",
        region:"South America",
        capital:"Caracas"
    },
]

var ele=document.querySelector("body");
var cssObj=window.getComputedStyle(ele,null);
var bodybgColor;
bodybgColor=cssObj.getPropertyValue("background-color")

var filcountryDetails=countryDetails
function country(){

    for(let i=0;i<filcountryDetails.length;i++){
    document.getElementById("main").innerHTML+=`
    <div class="card">
            <img src="${filcountryDetails[i].flag}" alt="">
            <div class="bottom">
                <h4 class="country">${filcountryDetails[i].Cname}</h4>
                <br>
                <p>Population: ${filcountryDetails[i].popul}</p>
                <p>Region: ${filcountryDetails[i].region}</p>
                <p>Capital: ${filcountryDetails[i].capital}</p>
            </div>
        </div>
    `
document.querySelectorAll(".card").forEach(x=>{x.style.backgroundColor=bodybgColor} )

}
}
document.getElementById("filter").addEventListener("change",(event)=>{
    if(event.target.value=="region"){
        document.getElementById("filter").innerHTML=`
         <option value="">Choose a Region</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Australia">Ocenia/Australia</option>
        `
    }
    if(event.target.value!==""){
        filcountryDetails=countryDetails.filter(x=>x.region==event.target.value)
document.getElementById("main").innerHTML=""
country()
    }
    else{
        filcountryDetails=countryDetails;
        document.getElementById("main").innerHTML=""
country()
 }
})

document.getElementById("search").addEventListener("keyup",()=>{
    let searchedCountry=document.getElementById("search").value.toLowerCase();
    for(let i=0;i<countryDetails.length;i++){
        if(searchedCountry==filcountryDetails[i].Cname.toLowerCase()){
            filcountryDetails=countryDetails.filter(x=>x.Cname.toLowerCase()==searchedCountry)
            document.getElementById("main").innerHTML=""
            country()
        }
        else{
            document.getElementById("main").innerHTML=`<h4 >No Country found named <span id="result">${searchedCountry} !</span></h4>`

        }
    }
})

function togglemode(){
        if(bodybgColor=="rgb(255, 255, 255)"){
        document.getElementById("mode").classList.remove("fa-moon") 
        document.getElementById("mode").classList.toggle("fa-sun")
        document.getElementById("mode").innerText=" Light Mode"
        document.getElementById("parent").classList.toggle("parent-dark")
        document.querySelector("body").classList.toggle("darkmode")
        document.getElementById("main").querySelectorAll(".card").forEach(x=>{x.classList.toggle("darkmode")})
    }
        else{
            document.getElementById("mode").classList.remove("fa-sun") 
            document.getElementById("parent").classList.remove("parent-dark") 
            document.getElementById("mode").classList.toggle("fa-moon")
            document.getElementById("mode").innerText=" Dark Mode"
            document.querySelector("body").classList.remove("darkmode")
            document.getElementById("main").querySelectorAll(".card").forEach(x=> x.classList.remove("darkmode"))
        }
        bodybgColor=cssObj.getPropertyValue("background-color")
}
document.getElementById("mode").addEventListener('click',()=>{
togglemode()
country()
})

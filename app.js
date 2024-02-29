import { options } from "./utils/constants.js";

const form = document.querySelector("#searchForm");
const res = document.querySelector('#tableResult');
var upd;

var ctype;

form.addEventListener("submit", (e) => {

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
     ctype = form.elements.coinType.value;

    fetchPrice(ctype);
});

const fetchPrice =async (ctype) => {
  
      const r = await fetch(`https://openapiv1.coinstats.app/coins/${ctype}`, options);

      const data =await r.json();
      console.log(data)
      showPrice(data);  
     
}

const showPrice = (data) => {
    const rank = data?.rank;
    const name = data?.name;
    const price = data?.price;
    const vol = data?.volume;
    const change = data?.priceChange1d;
    const coin = data?.name;
    const curr = 'USD';
    var col= "green";

    if(change<0){
        col = "red";
    }

    res.innerHTML = ` <tr class="bg-primary tableRow">

    <td>Property</td>
    <td>Value</td>

  </tr>
   <tr class="tableRow">
      <td>${coin}</td>
      <td>${price} USD</td>

   </tr>
  <tr class="tableRow">
      <td>Rank</td>
      <td>${rank}</td>

  </tr>
 
  <tr class="tableRow">
      <td>Volume</td>
      <td>${vol}</td>

  </tr>
  <tr class="tableRow">
      <td>Change (24hrs)</td>
      <td style="color:${col};">${change} ${curr}</td>

  </tr>
  `
  upd = setTimeout(() => fetchPrice(ctype), 10000);
}

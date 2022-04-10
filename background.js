function reddenPage() {
  //gets all the professor names
  let links = document.querySelectorAll('[href*="mailto:"]');
  let url = 'http://localhost:3000/rmp-data/rmp-data.json';

  fetch(url).then(res => res.json()).then(
    function(container){
      let data = container["data"];
        //iterate through all links
        for(let i = 0; i < links.length; i++) {
          let currentLink_text = links[i].innerHTML.toString();
          let namesArray = currentLink_text.trim().split(" ");
          let trimmedNamesArray = namesArray.filter(function(entry) { return entry.trim() != ''; });

          //if the professor's name is irregular, ignore it, we can add this functionaility in later
          if(trimmedNamesArray.length !== 2){
            continue;
          }

          let firstName = trimmedNamesArray[0];
          let lastName = trimmedNamesArray[1];

          //find the professor in the array of objects 'data' for which 'tFName' = firstName and 'tLName' = lastName
          function getProfRating(){
            for(var k = 0; k < data.length; k++){
              if((data[k].tFname == firstName) && (data[k].tLname == lastName)){
                return data[k].overall_rating;
              }
            }
          }
          let profRating  = getProfRating();

          //if the rating is not found change the variable to that
          if (variable === undefined || variable === null) {
            profRating = "No Rating"
          }
       
          

          links[i].innerHTML += ` <span style="color:red">${profRating}</span>`;
        }

    }
  );
}

  
chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
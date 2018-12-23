import wixData from "wix-data";
import {local} from 'wix-storage';
import wixWindow from 'wix-window'; 

// SAVE VALUES TO BE USED ON THE DYNAMIC PAGE
////////////////////////////////////////////////////////
const linkField = "link-FindYourPathTRIAL-name";
const nameField = "name";
const imageField = "trailHead";
const elevationField = "elevationGraph";
////////////////////////////////////////////////////////

$w.onReady(function() {
	// SAVE VALUES FOR RANDOMISED HIKES ON THE DYNAMIC PAGE
   if(wixWindow.rendering.env === "browser") { 
    $w("#dataset1").onReady(() => {
      const numberOfItems = $w("#dataset1").getTotalCount();
   
      $w("#dataset1").getItems(0, numberOfItems)
        .then( (result) => { 
          const dynamicPageURLs = result.items.map(item => item[linkField]);
          local.setItem('dynamicPageURLs', dynamicPageURLs);
		  const dynamicPageNames = result.items.map(item => item[nameField]);
          local.setItem('dynamicPageNames', dynamicPageNames);
		  const dynamicPageImages = result.items.map(item => item[imageField]);
          local.setItem('dynamicPageImages', dynamicPageImages);
				const dynamicPageElevations = result.items.map(item => item[elevationField]);
          local.setItem('dynamicPageElevations', dynamicPageElevations);
		  console.log(local.getItem('dynamicPageImages'));
        } )
        .catch( (err) => {
          console.log(err.code, err.message);
        } );
    } );
  }
});

let lastFilterTitle;
let lastFilterCatagory;
let lastFilterDifficulty;
let lastFilterElevationGain;
let lastFilterDogs;
let lastFilterDistance;
let debounceTimer;

// RE-FILTER RESULTS WHEN SEARCH BAR VALUES CHANGE WITH A DELAY
export function searchBar_keyPress(event, $w) {
	if (debounceTimer) {
		clearTimeout(debounceTimer);
		debounceTimer = undefined;
	}
	debounceTimer = setTimeout(() => {
		filter($w('#searchBar').value,lastFilterCatagory,lastFilterDifficulty,lastFilterElevationGain,lastFilterDogs,lastFilterDistance);
	}, 500);
	$w('#dataset1').setFilter() 
}


// RE-FILTER RESULTS WHEN DROPDOWN1 VALUES CHANGE
export function dropdown1_change(event) {
	filter(lastFilterTitle,$w('#dropdown1').value,lastFilterDifficulty,lastFilterElevationGain,lastFilterDogs,lastFilterDistance);
}

// RE-FILTER RESULTS WHEN DROPDOWN2 VALUES CHANGE
export function dropdown2_change(event) {
	filter(lastFilterTitle,lastFilterCatagory,$w('#dropdown2').value,lastFilterElevationGain,lastFilterDogs,lastFilterDistance);
}

// RE-FILTER RESULTS WHEN DROPDOWN3 VALUES CHANGE
export function dropdown3_change(event) {
	filter(lastFilterTitle,lastFilterCatagory,lastFilterDifficulty,$w('#dropdown3').value,lastFilterDogs,lastFilterDistance);
}

// RE-FILTER RESULTS WHEN DROPDOWN4 VALUES CHANGE
export function dropdown4_change(event) {
	filter(lastFilterTitle,lastFilterCatagory,lastFilterDifficulty,lastFilterElevationGain,$w('#dropdown4').value,lastFilterDistance);
}

// RE-FILTER RESULTS WHEN DROPDOWN8 VALUES CHANGE
export function dropdown8_change(event) {
	filter(lastFilterTitle,lastFilterCatagory,lastFilterDifficulty,lastFilterElevationGain,lastFilterDogs,$w('#dropdown8').value);
}

// FILTER FUNCTION FILTERS RESULTS BY THE SELECTED VALUES OF THE DROPDOWNS AS WELL AS THE VALUE IN THE SEARCH BAR

function filter(title,tags,difficulty,elevationGain,dogs,distance) { 
    if (lastFilterTitle !== title || lastFilterCatagory !== tags || lastFilterDifficulty !== difficulty || lastFilterElevationGain !== elevationGain || lastFilterDogs !== dogs || lastFilterDistance !== distance) {
		let newFilter = wixData.filter();
		if (title)
			newFilter=newFilter.contains('name', title);
		if (tags)
			newFilter=newFilter.contains('tags', tags);
		if (difficulty){
			if (parseFloat(difficulty)===0){
        		newFilter=newFilter.contains('difficulty','');
        		}
			else {
				newFilter=newFilter.contains('difficulty', difficulty);
				}
		}
        if (elevationGain){
        	if (parseFloat(elevationGain)===0){
        		newFilter=newFilter.between('elevationGain',0,1000000);
        		}
        	else if (parseFloat(elevationGain)===1000){
        		newFilter=newFilter.between('elevationGain',1000,1000000);
        		}
			else {
				newFilter=newFilter.between('elevationGain',parseFloat(elevationGain)-199,parseFloat(elevationGain));
				}
			}
        if (dogs){
        	if (parseFloat(dogs)===0){
				newFilter=newFilter.contains('dogs', '');
				}
			else {
				newFilter=newFilter.eq('dogs', dogs);
			}
		}
				
		if (distance){
			if (parseFloat(distance)===0){	
        		newFilter=newFilter.between('distance',0,1000000);
        		}
        	else if (parseFloat(distance)===10){
        		newFilter=newFilter.between('distance',10,1000000);
        		}
			else {
				newFilter=newFilter.between('distance',parseFloat(distance)-1.99,parseFloat(distance));
				}
			}
			
		$w("#dataset1").setFilter(newFilter)
		lastFilterTitle = title;
		lastFilterCatagory=tags;
		lastFilterDifficulty = difficulty;
    lastFilterElevationGain = elevationGain;
		lastFilterDogs = dogs;
		lastFilterDistance=distance;
	}
}



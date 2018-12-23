import wixData from "wix-data";
import {local} from 'wix-storage';
import wixLocation from 'wix-location';

$w.onReady(() => {
    // GET THE SEARCH REQUEST FROM THE HOME PAGE SEARCH BAR AND FILTER THE RESULTS BY IT
	  var sameWord = local.getItem("searchWord");
    $w("#searchBar").value = sameWord;
    $w("#searchBar").placeholder = sameWord;
    $w('#dataset1').onReady(function () {

        filter($w('#searchBar').value);
	});
});

let lastFilterTitle;
let debounceTimer;

// WHEN THE TEXT INSIDE THE SEARCH BAR IS CHANGED THE RESULTS ARE RE-FILTERED WITH A DELAY

export function searchBar_keyPress(event, $w) {
	if (debounceTimer) {
		clearTimeout(debounceTimer);
		debounceTimer = undefined;
	}
	debounceTimer = setTimeout(() => {
		filter($w('#searchBar').value);
	}, 500);
}

// THE FILTER FUNCTION LOOKS WITHIN THE VARIOUS FIELDS OF THE DATASET AND FILTERS THE RESULTS BY THOSE THAT CONTAIN THE SEARCH BAR TEXT

function filter(title) {
	if (lastFilterTitle !== title) {
		let newFilter = wixData.filter();
		newFilter=newFilter.contains('name', title).or(newFilter.contains('coverDescription', title)).or(newFilter.contains('trailInfoDescription', title));
		$w("#dataset1").setFilter(newFilter);
		lastFilterTitle = title;
	}
}

import {local} from 'wix-storage';
import wixLocation from 'wix-location';
 
$w.onReady(function () {
});


// WHEN PRESSING ENTER WHILE IN THE SEARCH BAR THE VALUE ENTERED IS SAVED AND USER IS REDIRECTED TO THE HOME PAGE

export function searchBar_keyPress(event, $w) {
        if(event.key === "Enter"){
             let word = $w("#searchBar").value;
             local.setItem("searchWord", word);
             wixLocation.to(`/results`);
        }
}

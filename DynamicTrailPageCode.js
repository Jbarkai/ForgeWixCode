//-------------Imports-------------//

import {local} from 'wix-storage';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixCRM from 'wix-crm';

//-------------Global Variables-------------//

// Current item.
let hike;
// Current user.
let user = wixUsers.currentUser;

$w.onReady(async function () {
	//-------------Page Setup-------------//
	
	hike = $w('#dynamicDataset').getCurrentItem();
    // Check if the current item is in the hiking list and act accordingly.
	checkWishlist();
	// Set the action that occurs when the login message is clicked to be the loginMessageClick() function.
	$w('#loginMessage').onClick(loginMessageClick);

if (wixWindow.rendering.env === "browser") {
    // CREATES 3 RANDOMISED HIKES TO BE DISPLAYED
    if(local.getItem('dynamicPageNames')) {
      const dynamicPageURLs = local.getItem('dynamicPageURLs').split(',');
	  	const dynamicPageNames = local.getItem('dynamicPageNames').split(',');
	  	const dynamicPageImages = local.getItem('dynamicPageImages').split(',');
		
      const currentPage = '/' + wixLocation.prefix + '/' + wixLocation.path.join('/');
      const currentPageIndex = dynamicPageURLs.indexOf(currentPage);
			const len = dynamicPageURLs.length-1;
			const x = Math.floor((Math.random() * len) + 2);

			if (x===currentPageIndex){
				if (x < len - 2){
      		$w("#text73").text=dynamicPageNames[x+1];
	  			$w("#text93").text=dynamicPageNames[x+2];
	  			$w("#text94").text=dynamicPageNames[x+3];

					$w("#image14").src=dynamicPageImages[x+1];
	  			$w("#image15").src=dynamicPageImages[x+2];
	  			$w("#image16").src=dynamicPageImages[x+3];

					$w("#button12").link=dynamicPageURLs[x+1];
	  			$w("#button13").link=dynamicPageURLs[x+2];
	  			$w("#button14").link=dynamicPageURLs[x+3];
				}
				else{
	  			$w("#text73").text=dynamicPageNames[x-1];
	  			$w("#text93").text=dynamicPageNames[x-2];
	  			$w("#text94").text=dynamicPageNames[x-3];

					$w("#image14").src=dynamicPageImages[x-1];
	  			$w("#image15").src=dynamicPageImages[x-2];
	  			$w("#image16").src=dynamicPageImages[x-3];

					$w("#button12").link=dynamicPageURLs[x-1];
	  			$w("#button13").link=dynamicPageURLs[x-2];
	  			$w("#button14").link=dynamicPageURLs[x-3];
				}
			}
			else{
  			if (x < len - 1){
     			$w("#text73").text=dynamicPageNames[x];
				  $w("#text93").text=dynamicPageNames[x+1];
					$w("#text94").text=dynamicPageNames[x+2];

					$w("#image14").src=dynamicPageImages[x];
				  $w("#image15").src=dynamicPageImages[x+1];
					$w("#image16").src=dynamicPageImages[x+2];

					$w("#button12").link=dynamicPageURLs[x];
				  $w("#button13").link=dynamicPageURLs[x+1];
					$w("#button14").link=dynamicPageURLs[x+2];
				}
				else{
	  			$w("#text73").text=dynamicPageNames[x];
	  			$w("#text93").text=dynamicPageNames[x-1];
	  			$w("#text94").text=dynamicPageNames[x-2];

					$w("#image14").src=dynamicPageImages[x];
	  			$w("#image15").src=dynamicPageImages[x-1];
	  			$w("#image16").src=dynamicPageImages[x-2];

					$w("#button12").link=dynamicPageURLs[x];
	  			$w("#button13").link=dynamicPageURLs[x-1];
	  			$w("#button14").link=dynamicPageURLs[x-2];
				}
			}
			
			
			
    }
  }
  
  // UPDATES MAP AND WEATHER WIDGET FOR EACH ITEM BY EDITING THE HTML
  
	const siteURL = $w('#dynamicDataset').getCurrentItem().webappUrl;
	const windySrc = $w('#dynamicDataset').getCurrentItem().windysrc;
	$w("#html2").src = windySrc;
	$w("#html1").src = siteURL;
});

// OPENS A LIGHTBOX WHEN ELEVATION GRAOH BUTTON IS CLICKED, DISPLAYING GRAPH FOR THAT ROW IN THE DATASET

export function button11_click(event, $w) {
	const graphdata = $w('#dynamicDataset').getCurrentItem();
	wixWindow.openLightbox('Elevation Graph', graphdata);
}


//~~~~~~~~~~~~~~~~~~~~~~ HIKING LIST STUFF ~~~~~~~~~~~~~~~~~~~~`

// Check if the current item is in the hiking list and act accordingly.
async function checkWishlist() {
	// If the current user is logged in:
	if (wixUsers.currentUser.loggedIn) {
		// Query the collection to find if the item was already added to the user's hiking list.
		let wishListResult = await wixData.query("myhikes")
			.eq("hike", hike._id)
			.eq("userId", user.id)
			.find();

		// If the item was already added to the user's hiking list:
		if(wishListResult.items.length > 0)
			// Show the "inWishList" image with a fade effect.
			$w('#inWishList').show('fade', {duration: 100});
		// If the product was not yet added to the user's wishlist:
		else
			// Show the "notInWishList" image with a fade effect.
			$w('#notInWishList').show('fade', {duration: 100});	
	}
	// If the current user is not logged in:
	else {
		// Show the "notInWishList" image with a fade effect.
		$w('#notInWishList').show('fade', {duration: 100});
	}
}

//-------------Event Handlers-------------//

// Set the action that occurs when the "inWishList" image is clicked.
export function inWishList_click(event, $w) {
	// If the current user is logged in:
	if (user.loggedIn) 
		// Remove the current product from the wishlist.
		removeFromWishlist();
}

// Set the action that occurs when the "notInWishList" image is clicked.
export function notInWishList_click(event, $w) {
	// If the current user is logged in:
	if (user.loggedIn) 
		// Add the current product to the wishlist.
		addToWishlist()
	// If the current user is not logged in:
	else 
		// Show the login message.
		$w('#loginMessage').show();
}

// Set the action that occurs when the login message is clicked.
async function loginMessageClick() {
	// Set the login options.
	let options = {"mode": "login"};
	// Hide the login message.
	$w('#loginMessage').hide();
	// Prompt the user to login using the options created above.
	let userId;
  let userEmail;
    // prompt the user to log in 
    wixUsers.promptLogin( {"mode": "login"} )
      .then( (user) => {
        userId = user.id;
        return user.getEmail();
      } )
      .then( (email) => {
        // check if there is an item for the user in the collection
        userEmail = email;
        return wixData.query("MemberProfile")
          .eq("_id", userId)
          .find();
      } )
      .then( (results) => {
        // if an item for the user is not found
        if (results.items.length === 0) {
          // create an item
          const toInsert = {
            "_id": userId,
            "email": userEmail
          };
          // add the item to the collection
          wixData.insert("MemberProfile", toInsert)
            .catch( (err) => {
              console.log(err);
            } );

          wixCRM.emailContact('testEmail', wixUsers.currentUser.id);
          }
        //update buttons accordingly
       $w("#button15").label = "LOGOUT";
       $w("#button16").show();
		
		wixLocation.to(wixLocation.url);
		
      } )
      .catch( (err) => {
        console.log(err);
      } );
}

//-------------Hiking list Functionality-------------//

// Add the current item to the current user's hiking list and update the page accordingly.
async function addToWishlist() {
	// Create the hiking list item relating the current item to the current user.
	let wishListItem = {
		hike: hike._id, 
		userId: user.id
	};
    
	// Hide the "notInWishList" image with a fade effect.
	$w('#notInWishList').hide('fade', {duration: 100});
	// Show the "inWishList" image with a fade effect.
	$w('#inWishList').show('fade', {duration: 100});
	// Insert the item created above into the collection.
	let result = await wixData.insert("myhikes", wishListItem);
}

// Remove the current item to the current user's hiking list and update the page accordingly.
async function removeFromWishlist() {
	// Query the collection to find the hiking list item corresponding to the current item and current user.
	let wishListResult = await wixData.query("myhikes")
		.eq("hike", hike._id)
		.eq("userId", user.id)
		.find();

	// If a wishlist item was found:
	if (wishListResult.length > 0) {
		// Show the "notInWishList" image with a fade effect.
		$w('#notInWishList').show('fade', {duration: 100});
		// Hide the "inWishList" image with a fade effect.
		$w('#inWishList').hide('fade', {duration: 100});
		// Remove the wishlist item from the collection.
		await wixData.remove("myhikes", wishListResult.items[0]._id)
	}
}

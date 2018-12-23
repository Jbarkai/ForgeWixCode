//-------------Imports-------------//

import {local} from 'wix-storage';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixCRM from 'wix-crm';

//-------------Global Variables-------------//

// Current user.
let user = wixUsers.currentUser;

$w.onReady(async function () {

	//-------------Page Setup-------------//
	// Set the action that occurs when the login message is clicked to be the loginMessageClick() function.
	$w('#loginMessage').onClick(loginMessageClick);

});


//~~~~~~~~~~~~~~~~~~~~~~ USEFUL LINK SUGGESTION STUFF ~~~~~~~~~~~~~~~~~~~~`



//-------------Event Handlers-------------//


export function suggestlink_onclick(event, $w) {
	if (user.loggedIn){
		wixWindow.openLightbox("Useful Links Suggestions");
	}
	else {
		$w('#loginMessage').show();
	}

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
        // update buttons accordingly
        $w("#button15").label = "LOGOUT";
        $w("#button16").show();
		wixLocation.to(wixLocation.url);
      } )
      .catch( (err) => {
        console.log(err);
      } );
    
}


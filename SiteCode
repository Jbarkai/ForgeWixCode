import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixCRM from 'wix-crm';
import {local} from 'wix-storage';
import wixWindow from 'wix-window';


$w.onReady( () => {
  
// CHANGE LOGIN/LOGOUT BUTTON AND SHOW/HIDE MY PROFILE BUTTON AND MEMBERS FORUM

  if(wixUsers.currentUser.loggedIn) {
    $w("#button15").label = "LOGOUT";
    $w("#button16").show();
    $w("#button20").show();

  }
  else {
    $w("#button15").label = "LOGIN";
    
    $w("#button16").hide();
    $w("#button20").hide();
	//$w("#stripArea").collapse();
  }
  
} );

// ON CLICK FUNCTION OF LOGIN/LOGOUT

export async function button15_onclick(event, $w) { 
  // user is logged in
  if(wixUsers.currentUser.loggedIn) {
    // log the user out
    await wixLocation.to('/');
    wixUsers.logout()
      .then( () => {
        // update buttons accordingly
        $w("#button15").label = "LOGIN";
        $w("#button16").hide(); 
        $w("#button20").hide();
    } );
  }
  // user is logged out
  else {
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
          // SET DEFAULT VALUES FOR NEW MEMBERS
          const toInsert = {
            "_id": userId,
            "email": userEmail,
			"firstName": "New Forge",
			"surname": "Member"
          };
          // add the item to the collection and send the new member default email created
          wixData.insert("MemberProfile", toInsert)
            .catch( (err) => {
              console.log(err);
            } );

          wixCRM.emailContact('testEmail', wixUsers.currentUser.id);
          }
        // update buttons accordingly
        $w("#button15").label = "LOGOUT";
        $w("#button16").show();
        $w("#button20").show();
      } )
      .catch( (err) => {
        console.log(err);
      } );
      
  }
}

export function button16_onclick() {
  // CHANGE TO MY PROFILE PAGE WHEN CLICKED
  wixLocation.to(`/MemberProfile/${wixUsers.currentUser.id}`); 
}

export function button20_onclick(event) {
	// CHANGE TO MEMBERS FORUM PAGE WHEN CLICKED 
  wixLocation.to(`/MemberProfile/forum/${wixUsers.currentUser.id}`); 
}

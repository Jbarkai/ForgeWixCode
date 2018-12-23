# Wix Code Behind the Website
The code behind the wix site I helped a friend create. With the help from a combination of wix code tutorials and forum answers I was able to modify and create the code needed. In order for this code to work the required data collections need to be created as well as the appropriate buttons and textboxes etc. being created with on click or on change events whenever needed.

## [Site Code](https://github.com/Jbarkai/wixcode/blob/master/SiteCode.js)
The site code connects all the membership buttons and prompts logging in and out.

When a member is not logged in the login/logout button shows the text "LOGIN" and the "MY PROFILE" and "FORUM" buttons are hidden. When a member clicks the LOGIN button they will be prompted to login/signup and in doing so will be checked to see if they are already in the dataset and if not they are added to it with default values for their first and last names. If they are a new member signing up the already made welcome email is sent to them. They will then be logged in, changing the LOGIN button to LOGOUT and showing the MY PROGILE and FORUM buttons which redirect to the respective pages on a click event.

## [Home Page Code](https://github.com/Jbarkai/wixcode/blob/master/HomePageCode.js)
The Home page code connects the search bar to the results page.

When a user types a search request and presses enter their request is saved (to be used in the results page) and they are redirected to the results page.

## [Results Page Code](https://github.com/Jbarkai/wixcode/blob/master/ResultsPageCode.js)
The results page gets the value entered in the search bar on the home page and autfills the search bar on this page with it. It then filters the results with the value in the search bar every time the values change ( with a delay to avoid glitching) by looking within certain fields in the dataset and showing those that contain these values.

## [Find Your Path Page Code](https://github.com/Jbarkai/wixcode/blob/master/FindYourPathPageCode.js)
Similar to the results page, with a search bar that filters the results when the value changes (with a delay) but the results are also filted by all the different dropdown selections, re-filtering everytime these are changed too. Some of the dropdowns are not single values but intervals.

In addition, a few values of the results are saved here, including the URL and name etc. which will be used on the dynamic pages of each result which the user is taken to when clicking this result.

## [Dynamic Trail Page Code](https://github.com/Jbarkai/wixcode/blob/master/DynamicTrailPageCode.js)
This page is the dynamic page for all the results from the Find Your Path page and has various elements connected in the code.

### Save Item Feature
Members have the ability to save items to a list by pressing the heart button. When a user is not logged in, the filled in heart is hidden and the clear heart is shown in its place. On clicking this button a popup message will appear telling the user to log in if they wish to save this item. Clicking on this popup message the user will be prompted to log in and on doing so the page will refresh. The dataset will then be checked to see if they have saved this item in the past. If they have, the filled in heart will be shown, which on clicking will hide and show the clear heart, removing the item from the dataset and therefore their list. If they have not saved the hike before the clear heart will show and on clicking it it will save the item to the dataset, adding it to their list, hiding the clear heart and showing the filled in heart.

### Advertising Randomised Items
On the page are three randomised items displayed with their image, name and a button that links to their respective urls.

A random number is generated between 1 and the number of items. To aviod bugs there are multiple scenarios accounted for:
- If the random number is the same as the index of the current item and is three below the highest item index then the index of the items chosen are three consecutive numbers above this random number.
- If the random number is the same as the index of the current item and is not three below the highest item index then the index of the items chosen are three consecutive numbers below this random number.
- If the random number is not the same as the index of the current item and is two below the highest item index then the index of the items chosen are the random number and two consecutive numbers above this random number.
- If the random number is not the same as the index of the current item and is not three below the highest item index then the index of the items chosen are the random number and two consecutive numbers below this random number.

### Updating Map and Weather HTMLS
The added htmls on the page of the ARCGIS map and Windy weather map are edited for each dynamic itemby the updating the url and src respectively with the respective field in the dataset.

### Elevation Graph Lightbox
The ELEVATION GRAPH button prompts the opening of a lightbox when clicked, storing the current items data.

## [Elevation Graph Lightbox Code](https://github.com/Jbarkai/wixcode/blob/master/ElevationGraphLightboxCode.js)
This code simply gets the data of the item saved in the dynamic page and displays the IMAGE field value.

## [Useful Links Page Code](https://github.com/Jbarkai/wixcode/blob/master/UsefulLinksPageCode.js)
This page has a similar feature to the save item feature in the dynamic trail pages.

There is a button to add a useful link and when clicked it checks if the user is logged in. If they are not a popup message appears telling the user to log in if they wish to submit a useful link. Clicking on this popup message the user will be prompted to log in and on doing so the page will refresh. Once logged in, clicking the SUBMIT A USEFUL LINK button will open a lightbox.


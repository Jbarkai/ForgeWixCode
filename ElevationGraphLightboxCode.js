import wixWindow from 'wix-window';
import wixLocation from "wix-location";
$w.onReady(() => {
	let receivedData = wixWindow.lightbox.getContext(); // will be equal to itemData
	console.log(receivedData);
	$w('#image6').src = receivedData.elevationGraph; // Photo from Collection
});

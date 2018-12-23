// For full API documentation, including code examples, visit http://wix.to/94BuAAs
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
	$w('#input1').placeholder = $w('#dataset2').getCurrentItem().firstName;
	$w('#input2').placeholder = $w('#dataset2').getCurrentItem().surname;
	$w('#input3').placeholder = $w('#dataset2').getCurrentItem().email;

	$w('#input1').value = $w('#dataset2').getCurrentItem().firstName;
	$w('#input2').value = $w('#dataset2').getCurrentItem().surname;
	$w('#input3').value = $w('#dataset2').getCurrentItem().email;

});

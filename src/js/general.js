/*!
 * General Scripts
 * @author Chris Burnell <@iamchrisburnell>
 */


(function() {

    'use strict';

    ////
    /// Fix Reversed Lists
    ////
    var reversedLists = document.querySelectorAll('ol[reversed]'),
        counterResetValue;
    if (reversedLists !== null) {
        for (var i = 0, listLength = reversedLists.length; i < listLength; i++) {
            counterResetValue = reversedLists[i].getElementsByTagName('li').length + 1;
            reversedLists[i].style.counterReset = 'item ' + counterResetValue;
        }
    }

}());

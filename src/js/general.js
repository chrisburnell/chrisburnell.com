/*!
 * General Scripts
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    'use strict';

    ////
    /// Fix Reversed Lists
    ////
    var reversedLists = document.querySelectorAll('ol[reversed]'),
        counterReset;
    if( reversedLists !== null ) {
        reversedLists.forEach( function(list) {
            counterReset = list.getElementsByTagName('li').length + 1;
            list.style.counterReset = 'item ' + counterReset;
        });
    }

}());

/*!
 * "Blur Up" Banners
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    'use strict';

    ////
    /// Initialisation
    ////

    var banner      = document.querySelector('#banner');
    var loadedClass = 'banner--loaded';

    // add a `banner--loaded` class to the banner onload
    window.addEventListener('load', function() {
        banner.className = loadedClass;
    });

}());

$(document).ready( function() {

    // Forces external links to open in a new tab without breaking validation
    $("a[href*='http://']:not([href*='"+location.hostname+"'])").attr("target","_blank");

    // Article Tags - remove the <strong> tags around the 'and'
    $('.article-tags').html( $('.article-tags').html().replace('and','</strong>and<strong>') );

});
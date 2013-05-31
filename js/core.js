$(document).ready( function() {

    // Forces external links to open in a new tab without breaking validation
    $("a[href*='http://']:not([href*='"+location.hostname+"'])").attr("target","_blank");
    $('a').click( function(k,v) {
        //k.preventDefault();
    });

    commentErrorsHighlight();
    articleHeightFix();
    highlightCategory();

    $('.logo').hover( function() {
        $(this).removeClass('loading');
    });

    // Need some JS to add .active class to list of categories underneath articles
    // Needed something else but I forget...

});

// Add active class to categories underneath posts
function highlightCategory() {
    var categoryList = [];
    $('aside.info .tags a').each( function() {
        categoryList.push($(this).text());
    });
    $('.conclusion .tags a').each( function() {
        var i = 0;
        for(i = 0; i < categoryList.length; i++) {
            if( $(this).text() == categoryList[i] )
                $(this).parent().addClass('active');
        }
    });
}

// Highlight comment input elements with mistakes
function commentErrorsHighlight() {
    if ($("p.error:contains('name')").length > 0)
        $('input#name').addClass('error');
    if ($("p.error:contains('email')").length > 0)
        $('input#email').addClass('error');
    if ($("p.error:contains('comments')").length > 0)
        $('textarea#text').addClass('error');
}

// Add a min-height to parent elements of aside elements
function articleHeightFix() {
    $('body:not(.posts) aside:not(.mobile)').each( function() {
        var height = $(this).innerHeight();
        if( $(this).parent().is("article") && !$(this).parent().parent().is("#about") )
            height += 63;
        if ($(this).parent().height() < height)
            $(this).parent().css("min-height",height);
    });
}
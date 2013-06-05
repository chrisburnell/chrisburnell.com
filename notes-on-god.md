# Notes on GATE OV DOOM

1. meta itemprop? wotszis?
2. You should define a language on your HTML tag
    <html lang="en">
3. Linking to [a JS file on another site](http://trentrichardson.com/Impromptu/jquery-impromptu.js) which isn't publicly available. What does the jQuery Impromptu thing do that you need?
4. Inline CSS between &lt;style&gt; tags. This should go in your CSS.
5. Got some Inline JS between &lt;script&gt; tags. This should go in a dedicated JS file.
6. You have a commented out &lt;audio&gt; tag. You can likely remove this as it's a duplicate of one above it.
7. You need a reset stylesheet to put your CSS at a base level across browsers. Use [this one](http:\/\/cdnjs.cloudflare.com/ajax/libs/normalize/2.1.0/normalize.css) like this:
        
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/2.1.0/normalize.css">

8. CSS is a bit haywire but only really in terms of structure/organisation. It looks fairly clean except some older stuff you probably don't need anymore. I've fixed some of the indentation [here](http://uploads.chrisburnell.com/marks-super-fun.css) but there aren't really any issues beyond that.

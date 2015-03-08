---
layout: article
category: article

date: 2014-02-09 02:19:00

title: Let’s Look Back
introduction: I haven’t published a new article in a while now, but I haven’t been twiddling my thumbs. Let’s look at what happened behind-the-scenes in the last eight months since my first article.
tags:
- CSS
- GitHub
- Tutorials

banner: lets-look-back.png
banner_mobile: lets-look-back_mobile.png

shorturl: dxaon
comments: true
---

One of the most important aspects to any codebase, besides the obvious fact that it should *work*, is that it should *work well*. What I mean by that is—it should be built upon an intelligent methodology and architecture that allows for simple maintenance and comprehension. Fortunately, I was very conscious of this when I initially embarked on building my website and was *extremely* militant about how I organised my code. Thorough use of comments and sectioned components helped me to keep my code clean and maintainable. This is a practice I will undoubtedly carry forward to every project I work on—not just in an HTML and CSS sense, but in terms of project management, documentation, etc.

{% include heading.html id="in-comes-sass" title="In comes SASS" %}

Well, not quite. I haven’t found a need myself for the full library of options available in [<dfn title="a CSS extension language">SASS</dfn>](http://sass-lang.com "SASS: Syntactically Awesome Style Sheets"), a CSS extension language, but I have adopted a few of the tools that comprise <dfn title="a superset of CSS3’s syntax">SCSS</dfn>. These tools include the ability *nest selectors*, *assign variables*, and *create mixins to be used and extended elsewhere in the CSS*. These utilities are extremely useful in not just writing CSS but also in reading and understanding it. Because with SCSS we can nest selectors, children selectors simply sit inside their parents, and a clearer relationship is drawn between the two. Furthermore, due to the way that we indent CSS, child selectors will be indented to (roughly) match the DOM structure.

{% include heading.html id="i-dont-want-to-do-anything" title="I don’t want to do anything, anymore!" %}

<aside><p>I also wrote about [State of the Browser 2013](http://browser.londonwebstandards.org "State of the Browser 2013") in [First Ever Article](/articles/first-article-ever/ "First Ever Article").</p></aside>

Ever since I was fortunate enough to attend [State of the Browser in 2013](http://browser.londonwebstandards.org "State of the Browser 2013") and saw talks from [Paul Kinlan](https://twitter.com/paul_kinlan "Paul Kinlan") and [Jake Archibald](https://twitter.com/jaffathecake "Jake Archibald"), I’ve grown to care a great deal more about automation and performance. In the past months I’ve strived to maintain a streamlined site that not only has pristine, carefully-crafted code, but also responds quickly and *loads in under one second*, a personal goal of mine. Because I put such rigid limitations on the code and it being lightning-fast, I wanted to make sure that every line of code served a purpose—trim the fat.

One fantastic utility that helps immensely in trimming the fat, I learned about at State of the Browser: *[Can I Use](http://caniuse.com "Can I Use")*, a repository of compatibility tables for support of web technologies such as HTML5 and CSS3. The kicker is that the tables are updated based on global browser usage statistics, so the tables are always up-to-date on what is supported, what isn’t, what requires a vendor prefix, etc. for all major browsers. The tables are invaluable for quickly checking what options I have for support when developing a new piece of code, but it’s all a bit tedious if I want my code and vendor prefixes to be up-to-date all the time.

--------

Say an old version of Chrome becomes stale and the global usage of that version dips below an arbitrary percentage (which I do not support) such that I no longer need a webkit prefix for a property anymore; I would need to physically check the support tables, manually find out that the prefix fell out, and then crawl and update my entire codebase to remove the unnecessary code. That just isn’t good enough if I want smooth sailing.

<aside><p>`autoprefixer -i` to run *Autoprefixer* from command line</p></aside>

Fortunately there’s a great tool that plugs into *Can I Use*’s API: *[Autoprefixer](https://github.com/ai/autoprefixer "Autoprefixer")*. In short, it "[parses] CSS and add[s] vendor prefixes to rules by Can I Use". That gets rid of the headache of updating vendor prefixes to match my arbitrary set of browser support rules, and I don’t even have to write them in my CSS anymore. *Very* convenient... but not the perfect solution; I still have to manually run this command whenever I want to compile.

--------

<aside><p>`sass` to compile SASS or SCSS,  from command line</p></aside>

Because I also decided to make the switch to SCSS, I was wasting a lot of time in the command line, running the command to compile my SCSS every time I made a change. *Then* I was minifying it because that’s what I serve to users (using [this](https://sublime.wbond.net/packages/Minify "Sublime Minify")). To be fair, I actually used a bash alias to run a chain of commands, but I wanted *true* automation!

It’s only a small amount of time spent each time I wanted to compile my SCSS, but as anyone who writes CSS knows, an awful lot of time is spent tweaking a value, refreshing the browser, tweaking a value, refreshing the browser, and so on. The time spent compiling the SCSS *myself* added up to one big frustration.

All the while, I desperately wanted to take the responsibility and menial tasks off of my hands: crushing images, compressing CSS, [combing my CSS](https://github.com/csscomb/csscomb.js "The Greatest tool for sorting CSS properties in specific order"), and compiling my SCSS for the most part.

{% include heading.html id="a-better-way" title="There must be a better way!" %}

<figure>
    <img src="/images/content/good-news-everyone.jpg" alt="Good news everyone!" role="presentation">
    <figcaption>There is!</figcaption>
</figure>

And it comes in the form of *[gulp](http://gulpjs.com "gulp.js - the streaming build system")*. *gulp* is a “streaming build system” built on *[node.js](http://nodejs.org "node.js")* that automates complex tasks for you—the answer to all my prayers! I initially chose an alternative called *[Grunt](http://gruntjs.com "Grunt: The JavaScript Task Runner")* which does *almost* exactly the same thing, but I prefer the workflow used in *gulp*, which is why I ultimately chose it. I recommend checking it out if you haven’t; you can get started [right here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started "Get started with gulp")!

{% include heading.html id="what-gulp-does-for-me" title="Let’s see what gulp does for me" %}

How does *gulp* work?

Here’s a sample `gulpfile.js` that shows the workflow at play. It should give you a fairly good idea of what’s going on.

{% highlight javascript %}
var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*'
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'watch']);
{% endhighlight %}

What *gulp* does is runs a series of commands and even listens for and responds to changes. In the example above, from the [gulp GitHub repository](https://github.com/gulpjs/gulp "gulp GitHub Repository"), *gulp* is being used to compile multiple coffeescript files, minify them, and concatenate them into a single file as well as compress images. The `watch` task is being used to listen for changes to particular files and run tasks subsequently. My particular `gulpfile.js` is used to compile my SCSS, run *Autoprefixer*, minify the CSS, and refresh my browser. This becomes incredibly useful for front-end developers who are used to a “tweak a value, compile, refresh browser” workflow when `watch` is paired with *[LiveReload](http://livereload.com "LiveReload")* to automatically refresh the browser—the workflow then becomes, essentially, “tweak a value... tweak a value... tweak a value” as saving the file after each tweak would trigger *gulp* `watch` to compile, minify, and refesh for you!

{% include heading.html id="good-old-brass-tacks" title="Good old brass tacks" %}

Here’s an example of what the CSS for my logo looked like prior to these changes:

{% highlight css %}
.logo {
    color: #4f4f4f;
    height: 2em;
    display: inline-block;
    float: left;
    padding-left: 1.923em;
    position: relative;
    font-family: "league-gothic", sans-serif;
    font-size: 3.25em;
    line-height: 2em;
    text-transform: uppercase;
    text-shadow: 0.058em 0.058em 0 rgba(6, 6, 6, 0.05);
    z-index: 1;
    -webkit-transition: none;
            transition: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
    .logo:hover,
    .logo:focus,
    .logo:active {
        text-decoration: none;
    }
    .logo:active {
        -webkit-transform: translate3d(0, .039em, 0);
            -ms-transform: translate3d(0, .039em, 0);
                transform: translate3d(0, .039em, 0);
    }
    .logo:after {
        content: "";
        background: url("../icon.png") no-repeat;
        background-image: url("/images/raven.svg");
        -webkit-background-size: 2.307em 2.307em;
                background-size: 2.307em 2.307em;
        width: 2.307em;
        height: 2.307em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        -webkit-transform: translate3d(0, -0.808em, 0);
            -ms-transform: translate3d(0, -0.808em, 0);
                transform: translate3d(0, -0.808em, 0);
        -webkit-animation: soaring 30s linear alternate infinite;
                animation: soaring 30s linear alternate infinite;
        -webkit-animation-play-state: paused;
                animation-play-state: paused;
    }
    .logo:hover:after,
    .logo:focus:after,
    .logo:active:after {
        -webkit-animation-play-state: running;
                animation-play-state: running;
    }
    .logo span {
        white-space: nowrap;
    }

    @-webkit-keyframes soaring {
        0%, 100% {
            -webkit-transform: translate3d(0, -0.8125em, 0);
                -ms-transform: translate3d(0, -0.8125em, 0);
                    transform: translate3d(0, -0.8125em, 0);
        }
        12.5% {
            -webkit-transform: translate3d(-0.0625em, -0.6875em, 0);
                -ms-transform: translate3d(-0.0625em, -0.6875em, 0);
                    transform: translate3d(-0.0625em, -0.6875em, 0);
        }
        25% {
            -webkit-transform: translate3d(.125em, -0.3125em, 0);
                -ms-transform: translate3d(.125em, -0.3125em, 0);
                    transform: translate3d(.125em, -0.3125em, 0);
        }
        37.5% {
            -webkit-transform: translate3d(.3125em, -0.375em, 0);
                -ms-transform: translate3d(.3125em, -0.375em, 0);
                    transform: translate3d(.3125em, -0.375em, 0);
        }
        50% {
            -webkit-transform: translate3d(.125em, -0.4375em, 0);
                -ms-transform: translate3d(.125em, -0.4375em, 0);
                    transform: translate3d(.125em, -0.4375em, 0);
        }
        62.5% {
            -webkit-transform: translate3d(.0625em, -0.25em, 0);
                -ms-transform: translate3d(.0625em, -0.25em, 0);
                    transform: translate3d(.0625em, -0.25em, 0);
        }
        75% {
            -webkit-transform: translate3d(.1875em, -0.4375em, 0);
                -ms-transform: translate3d(.1875em, -0.4375em, 0);
                    transform: translate3d(.1875em, -0.4375em, 0);
        }
        87.5% {
            -webkit-transform: translate3d(-0.0625em, -0.5625em, 0);
                -ms-transform: translate3d(-0.0625em, -0.5625em, 0);
                    transform: translate3d(-0.0625em, -0.5625em, 0);
        }
    }
    @keyframes soaring {
        0%, 100% {
            -webkit-transform: translate3d(0, -0.8125em, 0);
                -ms-transform: translate3d(0, -0.8125em, 0);
                    transform: translate3d(0, -0.8125em, 0);
        }
        12.5% {
            -webkit-transform: translate3d(-0.0625em, -0.6875em, 0);
                -ms-transform: translate3d(-0.0625em, -0.6875em, 0);
                    transform: translate3d(-0.0625em, -0.6875em, 0);
        }
        25% {
            -webkit-transform: translate3d(.125em, -0.3125em, 0);
                -ms-transform: translate3d(.125em, -0.3125em, 0);
                    transform: translate3d(.125em, -0.3125em, 0);
        }
        37.5% {
            -webkit-transform: translate3d(.3125em, -0.375em, 0);
                -ms-transform: translate3d(.3125em, -0.375em, 0);
                    transform: translate3d(.3125em, -0.375em, 0);
        }
        50% {
            -webkit-transform: translate3d(.125em, -0.4375em, 0);
                -ms-transform: translate3d(.125em, -0.4375em, 0);
                    transform: translate3d(.125em, -0.4375em, 0);
        }
        62.5% {
            -webkit-transform: translate3d(.0625em, -0.25em, 0);
                -ms-transform: translate3d(.0625em, -0.25em, 0);
                    transform: translate3d(.0625em, -0.25em, 0);
        }
        75% {
            -webkit-transform: translate3d(.1875em, -0.4375em, 0);
                -ms-transform: translate3d(.1875em, -0.4375em, 0);
                    transform: translate3d(.1875em, -0.4375em, 0);
        }
        87.5% {
            -webkit-transform: translate3d(-0.0625em, -0.5625em, 0);
                -ms-transform: translate3d(-0.0625em, -0.5625em, 0);
                    transform: translate3d(-0.0625em, -0.5625em, 0);
        }
    }

    /**
     * Located separately in the file:
     */
    @media (max-width: 768px) {
        .logo {
            height: 1.74em;
            display: inline-block;
            float: none;
            line-height: 1.74em;
        }
    }
{% endhighlight %}

Let’s face it, that’s a monumental amount of code to read, let alone scroll through. Although I spent a monumental amount of time organising it well and ensuring it was super-maintainable, there are a lot of repetitions and property values that could be assigned to variables and used elsewhere in the CSS. The advantage of this becomes obvious when you find yourself having to remember bespoke colour values, but we also have a lot of repetitions due to the requirement of vendor prefixes. Although we will obviously need the vendor prefixes again when we deliver CSS to the user on the front-end, because we’re compiling our CSS beforehand, we can get rid of them in our uncompiled stylesheet.

--------

Firstly, let’s remove the vendor prefixes to take advantage of *Autoprefixer* and *Can I Use*.

{% highlight css %}
.logo {
    color: #4f4f4f;
    height: 2em;
    display: inline-block;
    float: left;
    padding-left: 1.923em;
    position: relative;
    font-family: "league-gothic", sans-serif;
    font-size: 3.25em;
    line-height: 2em;
    text-transform: uppercase;
    text-shadow: 0.058em 0.058em 0 rgba(6, 6, 6, 0.05);
    z-index: 1;
    transition: none;
    user-select: none;
}
    .logo:hover,
    .logo:focus,
    .logo:active {
        text-decoration: none;
    }
    .logo:active {
        transform: translate3d(0, .039em, 0);
    }
    .logo:after {
        content: "";
        background: url("../icon.png") no-repeat;
        background-image: url("/images/raven.svg");
        background-size: 2.307em 2.307em;
        width: 2.307em;
        height: 2.307em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transform: translate3d(0, -0.808em, 0);
        animation: soaring 30s linear alternate infinite;
        animation-play-state: paused;
    }
    .logo:hover:after,
    .logo:focus:after,
    .logo:active:after {
        animation-play-state: running;
    }
    .logo span {
        white-space: nowrap;
    }

    @keyframes soaring {
        0%, 100% { transform: translate3d(0, -0.8125em, 0); }
        12.5% { transform: translate3d(-0.0625em, -0.6875em, 0); }
        25% { transform: translate3d(.125em, -0.3125em, 0); }
        37.5% { transform: translate3d(.3125em, -0.375em, 0); }
        50% { transform: translate3d(.125em, -0.4375em, 0); }
        62.5% { transform: translate3d(.0625em, -0.25em, 0); }
        75% { transform: translate3d(.1875em, -0.4375em, 0); }
        87.5% { transform: translate3d(-0.0625em, -0.5625em, 0); }
    }

    /**
     * Located separately in the file:
     */
    @media (max-width: 768px) {
        .logo {
            height: 1.74em;
            display: inline-block;
            float: none;
            line-height: 1.74em;
        }
    }
{% endhighlight %}

Already looking much better! You’ll notice I was even able to exclude the entire repeated `-webkit-keyframes` declarations as *Autoprefixer* will include these for me when *gulp* runs.

--------

Next, let’s turn this CSS into SCSS.

{% highlight scss %}
.logo {
    color: $text-color;
    height: 2em;
    display: inline-block;
    float: left;
    padding-left: 1.923em;
    position: relative;
    font-family: $heading-font-stack;
    font-size: 3.25em;
    line-height: 2em;
    text-transform: uppercase;
    text-shadow: .058em .058em 0 $black-light;
    z-index: 1;
    user-select: none;
    @include transition("none");
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
    }
    &:active {
        @include translate3d("0, .039em, 0");
    }
    &:after {
        content: "";
        background: url("../icon.png") no-repeat;
        background-image: url("/images/raven.svg");
        background-size: 2.307em 2.307em;
        width: 2.307em;
        height: 2.307em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @include animation("soaring 30s linear alternate infinite");
        @include animation-play-state("paused");
        @include translate3d("0, -0.808em, 0");
    }
    /**
     * Only animate when the user hovers the logo.
     */
    &:hover:after,
    &:focus:after,
    &:active:after {
        @include animation-play-state("running");
    }
    @include breakpoint("tablet") {
        height: 1.74em;
        display: inline-block;
        float: none;
        line-height: 1.74em;
    }
    span {
        white-space: nowrap;
    }
}
@keyframes soaring {
    0%,
    100% {  @include translate3d("0, -0.8125em, 0"); }
    12.5% { @include translate3d("-0.0625em, -0.6875em, 0"); }
    25% {   @include translate3d(".125em, -0.3125em, 0"); }
    37.5% { @include translate3d(".3125em, -0.375em, 0"); }
    50% {   @include translate3d(".125em, -0.4375em, 0"); }
    62.5% { @include translate3d(".0625em, -0.25em, 0"); }
    75% {   @include translate3d(".1875em, -0.4375em, 0"); }
    87.5% { @include translate3d("-0.0625em, -0.5625em, 0"); }
}
{% endhighlight %}

<figure>
    <img src="/images/content/welldone.gif" alt="Just look at it... :')" role="presentation">
    <figcaption>Success.</figcaption>
</figure>

{% include heading.html id="a-few-major-changes" title="You’ll notice a few major changes" %}

- the `hover`, `focus`, and `active` states are nested, using an `&` prefix
- the `after` pseudo class is nested, using an `&` prefix
- the `span` child of `.logo` is nested directly inside `.logo`
- the media query is nested inside the `.logo` declaration as `@include breakpoint()`

{% highlight scss %}
.logo {
    ...
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
    }
    &:active {
        @include translate3d("0, .039em, 0");
    }
    &:after {
        ...
    }
    /**
     * Only animate when the user hovers the logo.
     */
    &:hover:after,
    &:focus:after,
    &:active:after {
        @include animation-play-state("running");
    }
    @include breakpoint("tablet") {
        height: 1.74em;
        display: inline-block;
        float: none;
        line-height: 1.74em;
    }
    span {
        white-space: nowrap;
    }
}
{% endhighlight %}

- some declaration values are defined as variables, denoted by a preceding `$`
- these variables are defined in the variables section of the SCSS

{% highlight scss %}
$text-color: #4f4f4f;
$heading-font-stack: "league-gothic", sans-serif;
{% endhighlight %}

- liberal use of `@includes`
- these reference `@mixins` that are defined in the variables section of the SCSS

{% highlight scss %}
@mixin breakpoint($width) {
    @if $width == "tablet" {
        @media (max-width: 768px) { @content ; }
    }
    @else if $width == "mobile" {
        @media (max-width: 500px) { @content ; }
    }
}
@mixin transition($transition: "all .15s ease-in-out") {
    transition: #{$transition};
}
@mixin translate3d($values: "0, 0, 0") {
    transform: translate3d(#{$values});
}
@mixin animation($animation: "fade .3s ease-out") {
    animation: #{$animation};
}
@mixin animation-play-state($value: "paused") {
    animation-play-state: #{$value};
}
{% endhighlight %}

The CSS here a lot more concise now, and the advantages are tremendous as you get over the learning curve, however short it may be for you. If you extrapolate this methodology of components you can imagine how it simplifies development across a codebase and between contributing developers. Because we’ve defined variables and mixins, it’s now a lot easier to change code across the entire site’s codebase at once, for example: breakpoints, colours, transition timings, typefaces, to name a few.

--------

Another thing, which I won’t bother to illustrate here, is the splitting of files. Just like how I talked about building a componential CSS architecture, SASS allows you to concatenate multiple SCSS files into one file in the output `.css` file. I’ve done exactly that with my SCSS files—split them into <dfn title="a SASS file named with a leading underscore to denote it is a part of a whole SASS codebase">partials</dfn>: `\_articles.scss`, `\_asides.scss`, `\_buttons.scss`, etc.—and this helps to create a bird’s-eye-view or holisitic view of the separation of components.

It’s also extremely useful if you build a core set of styles and then extend those styles for bespoke designs in separate files; in this way, you only need to include the core styles on each page, instead of having to pull in all the bespoke CSS and using only a small part of it.

{% include heading.html id="useful-links" title="Useful Links" %}

1. [Sass Guide](http://sass-lang.com/guide "Sass: Sass Basics")
2. [Sass Guide - Variables](http://sass-lang.com/guide#2 "Sass: Sass Variables")
3. [Sass Guide - Nesting](http://sass-lang.com/guide#3 "Sass: Sass Nesting")
4. [Sass Guide - Partials](http://sass-lang.com/guide#4 "Sass: Sass Parials")
5. [Sass Guide - Import](http://sass-lang.com/guide#5 "Sass: Sass Import")
6. [Sass Guide - Mixins](http://sass-lang.com/guide#6 "Sass: Sass Mixins")
7. [My SASS files](https://github.com/chrisburnell/chrisburnell.github.io/tree/master/css "SASS files for chrisburnell.com")
8. [My gulpfile configuration](https://gist.github.com/chrisburnell/87346fa1e8e8538ee7ce "My gulpfile configuration")

And if you want to start using *gulp*, here’s a fantastic guide, <q>[Getting started with gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp "Getting started with gulp")</q>, by [Mark Goodyear](http://markgoodyear.com "Mark Goodyear — Front-end designer and developer").

{% include heading.html id="wrapping-it-up" title="Wrapping it up" %}

I cannot stress how awesome SASS and SCSS are and how they can drastically speed up your workflow. If you’ve never written SASS or SCSS before, try it with variables first. When you’re building a big stylesheet, or group of stylesheets, it can be a pain to have to remember HEX colour values or font stacks. The advantage of SASS is that it allows you to set these values to variables and use them througout the rest of your CSS; furthermore, if you need to manipulate these colours (lighten, darken, opacity, etc.), SASS has the ability to do this for you, leaving you to only remember the variable names.

The power of *Autoprefixer* speaks for itself, really.

And with *gulp* `watching`, the transition from the SCSS above to the minified CSS happens *almost instantly* and the browser refreshes almost as soon as you hit Save.

{% include heading.html id="thats-whats-up" title="So that’s what’s up" %}

To sum up, the site looks <s>pretty much</s> the same, but the codebase behind it is different. I can’t recommend getting into SCSS and *gulp* enough. They changed my workflow for the better and I save a lot of time as a result of it. I feel wrong for saying it, being so loyal to “vanilla” CSS for so long, but writing SCSS just feels more natural, and coupled with *gulp* makes for a seamless and more focussed coding workflow.

You can see the raw, uncompiled SCSS files on GitHub [here](https://github.com/chrisburnell/chrisburnell.github.io/tree/master/css "SCSS files for chrisburnell.com"), and the README file of the repository [here](https://github.com/chrisburnell/chrisburnell.github.io "chrisburnell.com GitHub README").

As always, please let me know if you have any comments, suggestions, or bug-fixes [in the comments below](#comments) or [create an Issue on Github](https://github.com/chrisburnell/chrisburnell.github.io/issues "Create an Issue on Github")!

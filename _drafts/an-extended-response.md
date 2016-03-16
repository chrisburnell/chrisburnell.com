---
layout: article
categories: article

# date: 2016-03-11 18:00:00

title: An Extended Response
lede: If you’ve dabbled in Sass before, you’re likely familiar with <code>@extends</code> and <code>@mixins</code>, but is there any use-case for <code>@extend</code>? Given the benchmark performance of the two, can we still be confident in the cascade when <code>@extending</code> in Sass?
tags:
- css
- sass
- tutorials

shorturl: fqojr
comments: true
---


A couple of weeks ago, CSS Wizard Harry Roberts [wrote about](http://csswizardry.com/2016/02/mixins-better-for-performance/) some performance benchmarking he did with Sass’s `@extends` and `@mixins`, specifically in the context of how the Sass is compiled into CSS in both cases and how that output affects the pipeline of data to the end-user.

<div class="edit">
    <p>N.B. This assumes that you are *gzipping* your assets on the front-end.</p>
</div>

I’ve been using both `@extends` and `@mixins` in my Sass for a number of years, but finding the line I wanted to walk between the two techniques, to find what works for me, took some time. I think it was Harry’s article that prompted me to re-evaluate how I approach the subject.


--------


The gist of Harry’s article is that using `@extend` to repeat styles is not worth the fragile nature of how `@extend` works—delcaring the styles once and sucking in the selectors into a single declaration (somewhere in the compiled CSS output) can spell disaster for the cascade you work so hard to make performant and succinct.

While using `@mixins` means repeated code in the compiled CSS output (remember, **D**on’t **R**epeat **Y**ourself), *gzipping* our CSS will actually make the impact of this repeated code almost negligable; however, it’s important to ensure that any and all static output from your `@mixins` is in the same order in each instance it is used. This is because *gzip* sets repeated strings to a variable and calls the variable wherever the string is repeated. By ensuring the same (or as close to the same) order of properties in your `@mixin` output you set the maximum length string to a variable and reduce the impact of the repeated string in the CSS.

Harry ran some benchmarking tests on these two techniques and determined that `@mixins` were as performant, if not more, than `@extends`. This spurred me on to refactor my Sass and make sure I was using `@extend` properly...

While this may be a contentious topic, I believe there are some use-cases for Sass’ `@extend`, and I will explain how I use it below.


--------


- `%content-elements`
- `%heading-elements`
- `%monospace-elements`
- `%button-elements`
- `%alpha`
- `%beta`
- `%delta`
- `%gamma`
- `%epsilon`
- `%zeta`

**tl;dr** I have created the above series of silent classes to represent a series of selectors and then set the series of selectors to `@extend` the silent class. What this achieves is best explained with an example, so let’s look at how I target all heading elements (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) and how I use that target:

{% highlight scss %}
h1,
h2,
h3,
h4,
h5,
h6 {
    @extend %heading-elements;
}
{% endhighlight %}

If you recall how silent classes and `@extend` works, you can understand how what we’re doing here is simply telling our Sass to do a simple replacement when it is compiled: Wherever `%heading-elements` appears in the Sass, replace it with `h1, h2, h3, h4, h5, h6`. This comes in handy when you want to target heading elements outside the scope of where your heading’s styles are defined.

For example, I use some `Liquid` syntax in my `Jekyll` build to auto-generate jump anchors for content headings, `.heading-anchor`. These `<a>` elements are children of heading elements, and should only appear when the user hovers or focusses the heading parent element:

{% highlight scss %}
.heading-anchor {
    display: none;

    h1:hover &,
    h1:focus &,
    h2:hover &,
    h2:focus &,
    h3:hover &,
    h3:focus &,
    h4:hover &,
    h4:focus &,
    h5:hover &,
    h5:focus &,
    h6:hover &,
    h6:focus & {
        display: inline-block;
    }
}
{% endhighlight %}

That is just *too* long-winded. We can simplify this declaration by referring to our silent class, `%heading-elements`, like so:

{% highlight scss %}
.heading-anchor {
    display: none;

    %heading-elements:hover &,
    %heading-elements:focus & {
        display: inline-block;
    }
}
{% endhighlight %}

The CSS output of the two techniques is the same, but the Sass source files are now much simpler to understand. The advantage here is that we aren’t making any negative impact on the cascade of the compiled CSS because we’re not using `@extend` in such a way that the source order of declarations doesn’t matter—we’re simply using `@extend` to represent a series of selectors.


--------


I wholeheartedly believe in a very simplistic approach to Sass. Simplicity is king when it comes to writing CSS and going overboard on Sass features may give you a false sense of power. The goal of Sass is not to write *less* CSS but to make the CSS that we write *more understandable*; keep that in mind.


--------


**tl;dr** If you find yourself with a lot of commas in your declarations selectors, see if you can substitute some of the selectors with a silent class.



--------


- [Mixins Better for Performance](http://csswizardry.com/2016/02/mixins-better-for-performance/)
- [When to use @extend; when to use a mixin](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)
- [Extending silent classes in Sass](http://csswizardry.com/2014/01/extending-silent-classes-in-sass/)
- [Why You Should Avoid Sass @extend](http://www.sitepoint.com/avoid-sass-extend/)
- [Don’t Over-@extend Yourself in Sass](http://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)
- [Sass Mixins vs Extends: The Data](https://tech.bellycard.com/blog/sass-mixins-vs-extends-the-data/)

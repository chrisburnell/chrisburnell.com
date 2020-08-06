---
date: 2016-03-18T14:15:00+0000
title: An Extended Response
lede: If you've dabbled in Sass before, you're likely familiar with <code>@extend</code> and <code>@mixin</code>, but is there any use-case for <code>@extend</code>? Given the benchmark performance of the two, can we still be confident in the cascade when <code>@extending</code> in Sass?
tags:
  - css
  - scss
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/710837030629023744
further_reading:
  - url: "http://csswizardry.com/2016/02/mixins-better-for-performance"
    title: "Mixins Better for Performance"
  - url: "http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin"
    title: "When to use @extend; when to use a mixin"
  - url: "http://csswizardry.com/2014/01/extending-silent-classes-in-sass"
    title: "Extending silent classes in Sass"
  - url: "http://www.sitepoint.com/avoid-sass-extend"
    title: "Why You Should Avoid Sass @extend"
  - url: "http://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass"
    title: "Don’t Over-@extend Yourself in Sass"
  - url: "https://tech.bellycard.com/blog/sass-mixins-vs-extends-the-data"
    title: "Sass Mixins vs Extends: The Data"
---

A couple of weeks ago, CSS Wizard, Harry Roberts, [wrote about](http://csswizardry.com/2016/02/mixins-better-for-performance/) some performance benchmarking he did with Sass’s `@extend` and `@mixin`, specifically in the context of how the Sass is compiled into CSS in both cases and how that output affects the pipeline of data to the end-user.

<div class="edit">
    <p>N.B. This assumes that you are gzipping your assets on the front-end.</p>
</div>

I’ve been using both `@extend` and `@mixin` in my Sass for a number of years, but finding the balance between the two techniques, to find what works for me, took some time. I think it was Harry’s article that prompted me to re-evaluate how I approach the subject.


--------


The gist of Harry’s article is that using `@extend` to repeat styles is not worth the fragile nature of how `@extend` works—declaring the styles once and pulling the selectors into a single declaration (somewhere in the compiled CSS output) can spell disaster for the cascade you work so hard to make performant and succinct. **You should always feel in complete control of your Sass’ compiled output.**

While using `@mixin` means repeated code in the compiled CSS output (remember: **D**on’t **R**epeat **Y**ourself), *gzipping* our CSS will actually make the impact of this repeated code almost negligible; however, it’s important to ensure that any and all static output from a `@mixin` is in the same order in each instance it is used. This is because *gzip* casts repeated strings to a variable and substitutes in the variable (instead of the full string) wherever the string is repeated in the CSS. By ensuring the same (or as close to the same) order of selectors, properties, values, etc. in the output of a `@mixin`, you set the maximum-possible-length-string of characters to a variable and thereby reduce the size of your *gzipped output CSS*.

<div class="edit">
    <p>If you want a clearer explanation or more information on the above, check out <a rel="external" href="http://csswizardry.com/2016/02/mixins-better-for-performance">Harry Roberts’ article</a>.</p>
</div>

Harry ran some benchmarking tests on both `@extend` and `@mixin`, and determined that `@mixin` were as performant as, if not more than, `@extend`. This spurred me on to refactor my Sass and make sure I was using `@extend` properly…


--------


While this may be a contentious topic, I believe there are some predictable use-cases for Sass’ `@extend`, and the key in these use-cases is *what exactly* is being `@extended`. Typically, developers use `@extend` to apply one or more *properties* to *multiple selectors*, but as we know, this can cause unpredictable CSS output as it’s difficult to remember every selector for which you’ve extended the properties.

The method which is far more predictable in its use of `@extend` does something different. Instead of `@extending` *properties* to *multiple selectors*, `@extend` *multiple selectors* to a *[placeholder selector](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_)* (also called a *silent class*) and reference the *placeholder selector* wherever applying styles to those *multiple selectors*.


--------


- `%content-elements`
- `%heading-elements`
- `%monospace-elements`
- `%button-elements`

I have created the above *placeholder selectors* to represent different groups of *multiple selectors*, and the terse naming makes it easy to understand what they represent (at least I think so). How these are used is best explained with an example, so let’s look at how I target all *heading elements* (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) throughout my Sass:

```scss
h1,
h2,
h3,
h4,
h5,
h6 {
    @extend %heading-elements;
}
```

If you recall how *placeholder selectors* and `@extend` work, you can understand that what we’re doing here is telling our Sass to do a simple replacement during compilation: Wherever `%heading-elements` appears in the Sass, replace it with `h1, h2, h3, h4, h5, h6`. This comes in handy when you want to target heading elements outside the scope of where your heading’s styles are defined.

For example, so that users can easily link to a specific part of the content, attached to most headings is a fragment anchor, `.fragment-anchor`. These anchors are direct children of heading elements, and should only appear when the user interacts with the heading element (by hovering with the mouse or tapping on a touch-device):

```scss
.fragment-anchor {
    display: none;

    h1:hover &,
    h2:hover &,
    h3:hover &,
    h4:hover &,
    h5:hover &,
    h6:hover &,
    h1:focus &,
    h2:focus &,
    h3:focus &,
    h4:focus &,
    h5:focus &,
    h6:focus & {
        display: inline-block;
    }
}
```

This makes sense, but is just too *long-winded*. We can simplify this declaration by referring to our *placeholder selector*, `%heading-elements`, like so:

```scss
.fragment-anchor {
    display: none;

    %heading-elements:hover &,
    %heading-elements:focus & {
        display: inline-block;
    }
}
```

The CSS output of the two techniques is exactly the same, but the Sass source files are now much easier to understand. The advantages here are that we aren’t making any negative impact on the cascade of the compiled CSS because we’re not using `@extend` in such a way that the source order of declarations doesn’t matter—we’re using `@extend` to represent *multiple selectors*. This technique also makes the Sass *much* easier to scan through, and saves us from having to remember *multiple selectors* whilst traversing our Sass partials.

I wholeheartedly believe in a very simplistic approach to Sass. Simplicity is king when it comes to writing CSS, and going overboard on Sass features may give you a false sense of power.

**The purpose of Sass is not to write less CSS but to make the CSS that we write more understandable.**


--------


**tl;dr** If you find yourself referring to the same group of selectors over and over, try `@extending` them to a *placeholder selector* and refer to the *placeholder selector* outside of the scope of the selectors themselves.

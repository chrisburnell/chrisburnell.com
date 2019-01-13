---
date: 2015-05-18 13:07:00

title: Button Interaction Demo

codepen_slug: RPRwoo
comments: codepen
---


{% include content/codepen.html height='300' %}

{% highlight html %}
<button>Hello!</button>
{% endhighlight %}

{% include content/code-toggle-top.html %}

{% highlight scss %}
$black:     #0d0d0d;
$gray:      #1d1d1d;
$brand:     #8cddff;
$brand-alt: #f473ff;

button {
    font-size: 4em;
    background: none;
    color: $brand;
    display: block;
    padding: .125em .25em;
    border: 0;
    position: relative;
    font-weight: 600;
    white-space: nowrap;
    text-decoration: none;
    &:before {
        content: "";
        background-color: $black;
        width: 0;
        height: 100%;
        border-bottom: .125em solid rgba($brand, 0.6);
        border-radius: .0625em;
        position: absolute;
        top: 0;
        left: auto;
        right: 0;
        z-index: -1;
        transition: width .2s ease;
    }
    &:hover,
    &:focus,
    &:active {
        color: $brand-alt;
        outline: none;
        &:before {
            width: 100%;
            border-bottom-color: rgba($brand-alt, 0.6);
            left: 0;
            right: auto;
        }
    }
}
{% endhighlight %}

{% include content/code-toggle-bottom.html %}

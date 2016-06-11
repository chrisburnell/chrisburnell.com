---
layout: post
categories: pen

date: 2016-06-11 01:00:00

title: Message Types
tags:
- codepen

comments: codepen
codepen: true
codepen_slug: rLxjBz
shorturl: h5f19
---


{% include content/codepen.html height='500' %}

{% highlight html %}
<div class="message  message--error">
  <p>Pastrami biltong sirloin alcatra ham hock ball tip short ribs tail chuck. Brisket turkey bacon ham porchetta ball tip. Andouille kielbasa pork loin turkey.</p>
</div>

<div class="message  message--warning">
  <p>Pastrami fatback frankfurter ground round pork belly. Meatloaf landjaeger boudin pork strip steak. Bresaola tail capicola, salami landjaeger jerky pork loin tenderloin bacon filet mignon.</p>
</div>

<div class="message  message--success">
  <p>Pig tri-tip ground round venison bresaola fatback prosciutto porchetta. Bresaola strip steak rump, turkey meatball pork pig t-bone porchetta cupim ham hock pancetta ham.</p>
</div>
{% endhighlight %}

{% include content/code-toggle-top.html %}
{% highlight scss %}
.message {
  background-color: white;
  width: calc(100% - 3em);
  max-width: 24em;
  padding: 1em 1em 1em 1.5em;
  border-left-width: 6px;
  border-left-style: solid;
  border-radius: 3px;
  position: relative;
  line-height: 1.5;

  & + & {
    margin-top: 2em;
  }

  &:before {
    color: white;
    width:  1.5em;
    height: 1.5em;
    position: absolute;
    top: 1em;
    left: -3px;
    border-radius: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
  }

  p {
    margin: 0 0 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.message--error {
  border-left-color: firebrick;

  &:before {
    background-color: firebrick;
    content: "‼";
  }
}

.message--warning {
  border-left-color: darkorange;

  &:before {
    background-color: darkorange;
    content: "!";
  }
}

.message--success {
  border-left-color: darkolivegreen;

  &:before {
    background-color: darkolivegreen;
    content: "✔";
  }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}

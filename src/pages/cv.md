---
title: CV
eleventyComputed:
  description: "{{ author.role | title }}{% if author.employer %} / {{ author.employer.role | title }} at {{ author.employer.title }}{% endif %}"
  tagline: "{{ author.name }}"
ads: false
contentClass: h-resume
monetizaton: false
toc: true
---

<ul class=" [ cluster ] [ center ] ">
    <li><a href="mailto:{{ author.email }}">{{ author.email }}</a></li><li><a href="https://twitter.com/{{ author.twitter }}">@{{ author.twitter }}</a></li><li><a href="https://chrisburnell.com/cv/">chrisburnell.com/cv</a></li><li><a href="https://chrisburnell.com/cv.pdf">Download PDF</a></li>
</ul>

## Summary

Front End Developer with {{ global.now | friendlyDate("yyyy") - site.established }} years of experience, specialising in CSS, design systems, developer evangelism and education, and technical writing and speaking. Lead Developer for projects across multiple industries, including government and higher education sectors, with clients such as [The Electoral Commission](https://www.electoralcommission.org.uk/), [Ministry of Justice](https://www.gov.uk/government/organisations/ministry-of-justice), [University of the Arts London](https://www.arts.ac.uk/), [William Hill](https://www.williamhill.com/), and more. Passionate about developing open source software, organising in-person events like [State of the Browser](https://stateofthebrowser.com), and being actively-involved in the web community.

## Professional Experience

<div class=" [ space-between ] ">
    <h3>{% image './images/content/squiz-logo.svg', '', 'brand-logo' %} <a href="https://squiz.net">Squiz</a> <small>(Northern Hemisphere / UK, Poland, USA)</small></h3>
    <small><strong>February 2018 – present</strong></small>
</div>

<div class=" [ space-between ] ">
    <h4>Lead Developer & Chapter Lead</h4>
    <small><strong>May 2022 – present</strong></small>
</div>

- Lead Developer and primary technical contact for 8 key clients, defining their complete technical implementation and standard of quality, with a focus on higher-education and government websites.
- Formulated learning packages as Chapter Lead to grow the front end knowledge of over 30 developers, which catalysed adoption of best practices and expertise.
- Managed a chapter of two developers, enabling them to pursue and succeed in career development.
- Established a robust design system for projects which *reduced development times by over 50%* and enabled both technical and non-technical stakeholders to understand and participate in dialogue about the complex intersection between design and development.

<div class=" [ space-between ] ">
    <h4>Lead Developer</h4>
    <small><strong>September 2021 – May 2022</strong></small>
</div>

- Implemented modern web standards by redefining best practices, which led to higher code quality and reduced context-switching for developers working across multiple projects.
- Lead Developer for the largest project of 2021, coordinating cross-functional stakeholders and making use of modern CSS for stronger art direction capabilities that improved the project’s reflection of the client’s brand identity.
- Mentored a Junior Developer for 20 hours a week over the course of a 6-week project and was able to deliver the project in *50% of the estimated time* and achieved *perfect Lighthouse and WCAG AA scores*.

<div class=" [ space-between ] ">
    <h4>Front End Developer</h4>
    <small><strong>February 2018 – September 2021</strong></small>
</div>

- Contributed to both the front end and content management implementations for client work and was the key advisor for expertise on front end development, particularly to do with CSS, and was consulted on dozens of projects for this knowledge.
- Volunteered to facilitate the standardisation of the global company boilerplate, authored the project’s documentation, and incorporated new features as a key feedback channel for developers. This boilerplate is used by *over 100 projects globally*.
- Single-handedly developed the first client design system which is now used by more than 10 enterprise-level projects, leading to more coherent codebases and a significant reduction in bugs and turnaround time for ad hoc work.


<div class=" [ space-between ] ">
    <h3><img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/built/city-logo.png"> <a href="https://city.ac.uk">City, University of London</a> <small>(London, UK)</small></h3>
    <small><strong>June 2014 – February 2018</strong></small>
</div>

#### Web Developer

- Primary front end development advisor for both the University’s [Main Website](https://city.ac.uk) and [Bayes Business School](https://www.bayes.city.ac.uk/).
- Collaborated with the Digital Marketing and Design teams to oversee the redesign and development of the University’s websites to reflect its major brand refresh.
- Overhauled the University’s [Clearing Website](https://clearing.city.ac.uk/) to simplify the user journey and automate backend processes required for incoming applications, reducing processing times and dependence on staff. This led to significant cost and time savings for the University, and continues to be used to this day.

<div class=" [ space-between ] ">
    <h3>{% image './images/content/squiz-logo.svg', '', 'brand-logo' %} <a href="https://squiz.net">Squiz</a> <small>(Northern Hemisphere / UK, Poland)</small></h3>
    <small><strong>April 2012 – January 2014</strong></small>
</div>

#### Front End Web Developer / UI Developer

- Built both the front end and content management implementations for client work, specialising particularly in cross-browser compatibility.
- Set up and organised learning initiatives for developers, including *Implementor Scrum*, an opportunity for developers to explore best practices and emerging web technologies in a casual group setting.

## Community Experience

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] ">Technical Writer on <img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/raven.svg"> <a href="https://chrisburnell.com/">chrisburnell.com</a></h3>
    <small><strong>2013 – present</strong></small>
</div>

- Launched a web development blog, which accumulates *over 10,000 unique visitors per month*, and have published over [{{ collections.posts | length | toNearest(100) }} blog posts](https://chrisburnell.com/archive/), including [{{ collections.writingPosts | length }} longform articles](https://chrisburnell.com/writing/), [{{ collections.css | length }} articles about CSS](https://chrisburnell.com/tag/css/), and [{{ collections.code | length }} code demos](https://chrisburnell.com/tag/css/), some of which have been [featured on CodePen](https://codepen.io/collection/hfqlg).
- [Popular Blog Posts](https://chrisburnell.com/popular/)
- [Open Source and Web Projects](https://chrisburnell.com/projects/)

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] ">Conference Organiser for <img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/built/sotb-logo.png"> <a href="https://stateofthebrowser.com" rel="external">State of the Browser</a></h3>
    <small><strong>2017 – present</strong></small>
</div>

- Organised 5 annual, not-for-profit conferences, showcasing over 40 speakers with 150+ in-person attendees each year.
- Liaised with speakers, sponsors, and venues as well as handled the logistics of running an in-person and online conference.
- Sourced event sponsorships to fund the events and enable under-represented groups to attend for free.
- Built and maintained the conference websites, including a complete codebase refresh in 2021, which included extensive work with APIs, to automate many organisational tasks for the conference.

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] ">Open Source Author</h3>
    <small><strong>2019 – present</strong></small>
</div>

- **[Bowhead](https://chrisburnell.com/bowhead/)** <small>([>4,000 downloads](https://www.npmjs.com/package/@chrisburnell/bowhead) · [3 ★](https://github.com/chrisburnell/bowhead))</small><br>A SCSS framework for integrating design tokens into a CSS codebase with support for CSS Variables. This framework has now been a key component in over half a dozen projects deployed during my time at *Squiz*.
- **[eleventy-cache-webmentions](https://chrisburnell.com/eleventy-cache-webmentions/)** <small>([>2,900 downloads](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions) · [13 ★](https://github.com/chrisburnell/eleventy-cache-webmentions))</small><br>A plugin for the popular static site generator, [Eleventy](https://11ty.io/), that allows the caching of Webmentions and makes them available to use throughout one’s website.
- **[Pentatonic](https://chrisburnell.com/pentatonic/)** <small>([>3,100 downloads](https://www.npmjs.com/package/@chrisburnell/pentatonic) · [1 ★](https://github.com/chrisburnell/pentatonic))</small><br>A JavaScript library for turning any array of integers into a fun little melody using the Web Audio API.
- **[spark-line](https://chrisburnell.com/spark-line/)** <small>([>1,900 downloads](https://www.npmjs.com/package/@chrisburnell/spark-line) · [3 ★](https://github.com/chrisburnell/spark-line))</small><br>A custom element Web Component for generating sparkline graphs from a sequence of integers using the Canvas API.

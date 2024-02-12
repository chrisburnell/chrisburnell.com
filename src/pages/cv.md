---
title: Curriculum Vitae
eleventyComputed:
  tagline: '<span class=" [ canada ] ">{{ author.name }}</span>'
  description: "{{ author.role | title }}{% if not author.employer %} and Software Engineer{% else %}, Software Engineer, and {{ author.employer.role | title }} at {{ author.employer.title }}{% endif %}"
contentClass: h-resume
monetizaton: false
toc: true
---

<ul class=" [ cluster ] ">
    <li><!--email_off--><a href="mailto:{{ author.email }}">📧 {{ author.email }}</a><!--/email_off--></li><li><a href="https://chrisburnell.com/cv/">📄 chrisburnell.com/cv</a></li><li><a href="https://chrisburnell.com/cv.pdf">⬇️ Download PDF</a></li>
</ul>

## Summary

Front End Developer and Software Engineer with {{ global.nowISO | friendlyDate("yyyy") - site.established }} years of experience, specialising in CSS, design systems, developer relations and education, and technical writing and speaking.

Work roles involved creating design systems and tools to enable teams to build maintainable and performant websites, with an uncompromising focus on accessibility and user experience. These also included lead roles in building the front end and CMS architecture for small to enterprise clients, chiefly in the higher education and government sectors, as I oversaw the project lifecycle and acted as their primary technical contact.

Passionate about the open web, having published over 50 technical articles, and author of several open-source projects used by thousands of developers worldwide and on production client websites. Actively involved in the web community with many years of experience in organising conferences and meetups, most notably, [State of the Browser](https://stateofthebrowser.com).

<h2 style="break-before: page;">Professional Experience</h2>

<div class=" [ space-between ] ">
    <h3><a href="https://squiz.net"><c-emoji>{% image './images/content/squiz-logo.svg', 'Squiz’s logo', 'brand-logo' %}</c-emoji> Squiz</a></h3>
    <small><strong>February 2018 – December 2023</strong></small>
</div>

<div class=" [ space-between ] ">
    <h4>Software Engineer</h4>
    <small><strong>January 2023 – December 2023</strong></small>
</div>

- Built, maintained, and published a library of React components to enable developers to build accessible and customised client websites quickly that have been fully-tested and are production-ready.
- Responsible for keeping track of web standards and keeping my team up-to-date on how we can leverage stable, new technologies to simplify and enhance the library of components.

<div class=" [ space-between ] ">
    <h4>Lead Developer & Chapter Lead</h4>
    <small><strong>May 2022 – January 2023</strong></small>
</div>

- Lead Developer and primary technical contact for 8 key clients, defining their complete technical implementation and standard of quality, with a focus on higher-education and government websites.
- Formulated learning packages as Chapter Lead to grow the front end knowledge of over 30 developers, which catalysed adoption of best practices and expertise.
- Managed a team of two developers, enabling them to pursue and succeed in career goals and development.
- Established a robust design system for projects which *reduced development times by over 50%* and enabled both technical and non-technical stakeholders to understand and participate in dialogue about the complex intersection between design and development.

<div class=" [ space-between ] ">
    <h4>Lead Developer</h4>
    <small><strong>February 2021 – May 2022</strong></small>
</div>

- Implemented modern web standards by redefining best practices, which led to higher code quality and reduced context-switching for developers working across multiple projects.
- Lead Developer for the UK’s largest project of 2021, coordinating cross-functional stakeholders and making use of modern CSS for stronger art direction capabilities that improved the project’s reflection of the client’s brand identity.
- Mentored a Junior Developer for 20 hours a week over the course of a 6-week project and was able to deliver the project in *50% of the estimated time* and achieved *perfect Lighthouse and WCAG AA scores*.

<div class=" [ space-between ] ">
    <h4>Front End Developer</h4>
    <small><strong>February 2018 – July 2020</strong></small>
</div>

- Contributed to both the front end and content management implementations for client work and was the key advisor for expertise on front end development, particularly to do with CSS, and was consulted on dozens of projects for this knowledge.
- Volunteered to facilitate the standardisation of the global company boilerplate, authored the project’s documentation, and incorporated new features as a key feedback channel for developers. This boilerplate is used by *over 100 projects globally*.
- Single-handedly developed the UK’s first design system which is now used by more than 10 enterprise-level projects, leading to more coherent codebases and a significant reduction in bugs and turnaround time for ad hoc work.

<div class=" [ space-between ] ">
    <h3><a href="https://city.ac.uk"><c-emoji><img src="/images/built/city-logo.png" class="brand-logo" alt="City, University of London’s logo" loading="lazy" decoding="async"></c-emoji> City, University of London</a></h3>
    <small><strong>June 2014 – February 2018</strong></small>
</div>

#### Web Developer

- Primary front end development advisor for both the University’s [Main Website](https://city.ac.uk) and [Bayes Business School](https://www.bayes.city.ac.uk/).
- Collaborated with the Digital Marketing and Design teams to oversee the redesign and development of the University’s websites to reflect its major brand refresh.
- Overhauled the University’s [Clearing Website](https://clearing.city.ac.uk/) to simplify the user journey and automate backend processes required for incoming applications, reducing processing times and dependence on staff. This led to significant cost and time savings for the University, and continues to be used to this day.

<div class=" [ space-between ] ">
    <h3><a href="https://squiz.net"><c-emoji>{% image './images/content/squiz-logo.svg', 'Squiz’s logo', 'brand-logo' %}</c-emoji> Squiz</a></h3>
    <small><strong>April 2012 – January 2014</strong></small>
</div>

#### Front End Web Developer / UI Developer

- Built both the front end and content management implementations for client work, specialising particularly in cross-browser compatibility.
- Set up and organised learning initiatives for developers, including *Implementor Scrum*, an opportunity for developers to explore best practices and emerging web technologies in a casual group setting.

<h2 style="break-before: page;">Community Experience</h2>

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] ">Conference Organiser for <a href="https://stateofthebrowser.com" rel="external"><c-emoji><img src="/images/built/sotb-logo.png" class="brand-logo" alt="State of the Browser’s logo" loading="lazy" decoding="async"></c-emoji> State of the Browser</a></h3>
    <small><strong>May 2018 – February 2024</strong></small>
</div>

- Organised 6 annual, not-for-profit conferences, showcasing over 45 speakers with 150+ in-person attendees each year.
- Liaised with speakers, sponsors, and venues as well as handled the logistics of running an in-person and online conference.
- Sourced sponsorship to fund the events and enable under-represented groups to attend for free.
- Built and maintained the conference websites, including a design refresh in 2018 and codebase refresh in 2021 as well as extensive work with APIs, to automate many organisational tasks for the conference.
- Annual conference websites: [2018](https://2018.stateofthebrowser.com), [2019](https://2019.stateofthebrowser.com), [2021](https://2021.stateofthebrowser.com), [2022](https://2022.stateofthebrowser.com), [2023](https://2022.stateofthebrowser.com), 2024 *(coming soon!)*

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] ">Technical Writer on <a href="https://chrisburnell.com/"><c-emoji><img src="/images/raven.svg" class="brand-logo" alt="{{ site.title }}" loading="lazy" decoding="async"></c-emoji> chrisburnell.com</a></h3>
    <small><strong>2013 – present</strong></small>
</div>

Launched a web development blog and have published over [{{ collections.blog | length | toNearest(5, true) }} blog posts](https://chrisburnell.com/posts/), including [{{ collections.writings | length }} longform articles](https://chrisburnell.com/writing/), [{{ collections.css | length }} articles about CSS](https://chrisburnell.com/tag/css/), and [{{ collections.code | length }} code demos](https://chrisburnell.com/code/), some of which have been [featured on CodePen](https://codepen.io/collection/hfqlg).

<div class=" [ space-between ] ">
    <h3 class=" [ delta ] "><a href="https://chrisburnell.com/projects/">Open Source Author</a></h3>
    <small><strong>2019 – present</strong></small>
</div>

- **[<c-emoji>🗜</c-emoji> clamp() Calculator](https://chrisburnell.com/clamp-calculator/)** <br>Handy little tool for calculating viewport-based clamped values for use in CSS.
- **[<c-emoji>🏄</c-emoji> Browser Feature Watch](https://chrisburnell.com/feature-watch/)** <br>This page serves as an one-stop shop to keep track of feature support across the major, modern browsers, ordered by level of support. Updated automatically daily.
- **[<c-emoji>💬</c-emoji> eleventy-cache-webmentions](https://chrisburnell.com/eleventy-cache-webmentions/)** <small>([>{{ '@chrisburnell/eleventy-cache-webmentions' | npmDownloads('2021-12-05') | toNearest(50, true) | numberStringFormat }} npm downloads](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions) · [{{ 'chrisburnell/eleventy-cache-webmentions' | stargazers }} ★ on GitHub](https://github.com/chrisburnell/eleventy-cache-webmentions))</small><br>A plugin for the popular static site generator, [Eleventy](https://11ty.dev/), that allows the caching of Webmentions and makes them available to use throughout one’s website.
- **[<c-emoji>🐋</c-emoji> Bowhead](https://chrisburnell.com/bowhead/)** <small>([>{{ '@chrisburnell/bowhead' | npmDownloads('2020-08-10') | toNearest(50, true) | numberStringFormat }} npm downloads](https://www.npmjs.com/package/@chrisburnell/bowhead) · [{{ 'chrisburnell/bowhead' | stargazers }} ★ on GitHub](https://github.com/chrisburnell/bowhead))</small><br>A SCSS framework for integrating design tokens into a CSS codebase with support for CSS Variables. This project has been a key component for 6 client websites during my time at Squiz.
- **[<c-emoji>🎹</c-emoji> Pentatonic](https://chrisburnell.com/pentatonic/)** <small>([>{{ '@chrisburnell/pentatonic' | npmDownloads('2020-09-25') | toNearest(50, true) | numberStringFormat }} npm downloads](https://www.npmjs.com/package/@chrisburnell/pentatonic) · [{{ 'chrisburnell/pentatonic' | stargazers }} ★ on GitHub](https://github.com/chrisburnell/pentatonic))</small><br>A JavaScript library for turning any array of integers into a fun little melody using the Web Audio API.
- **[<c-emoji>📈</c-emoji> &lt;spark-line&gt;](https://chrisburnell.com/spark-line/)** <small>([>{{ '@chrisburnell/spark-line' | npmDownloads('2021-10-21') | toNearest(50, true) | numberStringFormat }} npm downloads](https://www.npmjs.com/package/@chrisburnell/spark-line) · [{{ 'chrisburnell/spark-line' | stargazers }} ★ on GitHub](https://github.com/chrisburnell/spark-line))</small><br>A Web Component to turn an array of integers into a fun little chart.

## Testimonials

{% include 'testimonials.njk' %}

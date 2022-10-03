---
title: CV
eleventyComputed:
  description: "{{ author.role | title }}{% if author.employer %} and {{ author.employer.role | title }} at {{ author.employer.title }}{% endif %}"
  tagline: "{{ author.name }}"
ads: false
contentClass: h-resume
monetizaton: false
toc: true
---

<ul class=" [ cluster ] [ center ] " style='--delineator: "\0020·\0020"'>
    <li><a href="mailto:{{ author.email }}">{{ author.email }}</a></li><li><a href="https://twitter.com/{{ author.twitter }}">@{{ author.twitter }}</a></li><li><a href="https://chrisburnell.com/cv/">chrisburnell.com/cv</a></li>
</ul>

## Summary

Front End Developer with {{ global.now | friendlyDate("yyyy") - site.established }} years of experience, specialising in CSS, design systems, progressive enhancement/graceful degradation, developer evangelism and education, technical writing and speaking, web performance, and keeping on the pulse of emerging web technologies.

Lead Developer for projects across multiple industries, including government and higher education sectors, with clients such as [The Electoral Commission](https://www.electoralcommission.org.uk/), [Ministry of Justice](https://www.gov.uk/government/organisations/ministry-of-justice), [University of the Arts London](https://www.arts.ac.uk/), [William Hill](https://www.williamhill.com/), and more.

Passionate about organising in-person events for developers and designers such as *State of the Browser*, being actively involved in the web community, and developing open source projects that help developers explore exciting ways to utilise modern web technologies that are actively used by hundreds of developers globally every month.

## Professional Experience

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3>{% image './images/content/squiz-logo.svg', '', 'brand-logo' %} <a href="https://squiz.net">Squiz</a></h3>
    <small><strong>February 2018 – present</strong></small>
</div>

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h4>Lead Developer & Chapter Lead</h4>
    <small><strong>May 2022 – present</strong></small>
</div>

- Primary technical contact for 8 clients, with a specialised understanding of higher-education and government websites.
- Set the standard of quality and defined the complete technical implementation for critical project work as both Lead Developer for primary clients and as key advisor for many others.
- Formulated learning packages to grow the front end expertise of over 30 developers across the Northern Hemisphere regions (UK, Poland, USA), spearheading adoption of best practices and catalysing rapid growth in developer expertise and knowledge of web development.
- Managed a chapter/team of two developers, propelling their career progression and enabling them to pursue and succeed in personal specialties.
- Established a robust design system for projects which *reduced development times by over 50%*, vastly exceeding client expectations, reducing mental overhead and jargon, which enabled both technical and non-technical stakeholders to understand and participate in dialogue about the complex intersection between design and development.

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h4>Lead Developer</h4>
    <small><strong>September 2021 – May 2022</strong></small>
</div>

- Defined and implemented best practices and modern web standards, and updated existing codebases in order to meet the higher standards and reduce context-switching for developers working across multiple projects.
- Lead Developer for the UK’s largest project of 2021, achieving massive success with the client through coordinating internal stakeholders across development, design, and UX to better represent with their brand identity and make use of art direction capabilities made possible by modern CSS.
- Mentored a Junior Developer for 20 hours a week over the course of a 6-week project and was not only able to deliver the project in *50% of the estimated time* but also achieved *perfect Lighthouse and WCAG AA scores*.

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h4>Front End Developer</h4>
    <small><strong>February 2018 – September 2021</strong></small>
</div>

- Contributed to both the front end and content management implementations for client work and was the key advisor for expertise on front end development, particularly to do with CSS, and was consulted on dozens of projects for this knowledge.
- Volunteered to facilitate the standardisation of the global company boilerplate, documented its usage, and, as the key channel for developers in the Northern Hemisphere to provide feedback, evaluated and incorporated new features. The new standardised boilerplate is now used by over 100 projects globally.
- Single-handedly developed the first design system for the Northern Hemisphere which has since been used by more than 10 enterprise-level projects. This newly-introduced concept lead to more coherent codebases between client projects, resulting in a significant reduction in bugs, support tickets, onboarding time for new developers, and turnaround time for ad hoc work.


<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3><img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/built/city-logo.png"> <a href="https://city.ac.uk">City, University of London</a></h3>
    <small><strong>June 2014 – February 2018</strong></small>
</div>

#### Web Developer

- Lead the maintenance and development for both the University’s [Main Website](https://city.ac.uk) and [Bayes Business School](https://www.bayes.city.ac.uk/) as the primary advisor for front end development.
- Collaborated with the Digital Marketing and Design teams to innovate, share ideas and goals, and modernise the University’s websites and online presence.
- Oversaw the redesign and development of the University’s suite of websites to reflect the University’s major brand refresh.
- Overhauled the University’s [Clearing Website](https://clearing.city.ac.uk/) to reduce processing times and dependence on staff by simplifying the user journey for applying students and by automating many of the processes required for incoming applications. This lead to significant cost and time savings for the University, and continues to be used to this day.

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3>{% image './images/content/squiz-logo.svg', '', 'brand-logo' %} <a href="https://squiz.net">Squiz</a></h3>
    <small><strong>April 2012 – January 2014</strong></small>
</div>

#### Front End Web Developer / UI Developer

- Part of a team responsible with building both the front end and content management implementations for client work, specialising particularly in cross-browser compatability.
- Set up and organised learning initiatives for developers in the form of **Implementor Scrum**, an opportunity for developers to explore best practices and emerging web technologies in a casual group setting, and regularly presented to colleagues in **Lunch and Learn** sessions to educate on emerging web technologies and highlight clever use of current methods of development.

## Community Experience

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3 class=" [ delta ] ">Technical Writer on <img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/raven.svg"> <a href="https://chrisburnell.com/">chrisburnell.com</a></h3>
    <small><strong>2013 – present</strong></small>
</div>

- A blog about web development, publishing over [{{ collections.posts | length | toNearest(100) }} blog posts](https://chrisburnell.com/archive/) garnering *over 50,000 page views per month*.
- Notable content includes [{{ collections.writingPosts | length }} longform articles](https://chrisburnell.com/writing/), [{{ collections.css | length }} articles about CSS](https://chrisburnell.com/tag/css/), and [{{ collections.code | length }} code demos](https://chrisburnell.com/tag/css/), some of which have been [featured on CodePen](https://codepen.io/collection/hfqlg)
- [Popular Blog Posts](https://chrisburnell.com/popular/)
- [Open Source and Development Projects](https://chrisburnell.com/projects/)

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3 class=" [ delta ] ">Conference Organiser for <img class="brand-logo" alt="" loading="lazy" decoding="async" src="/images/built/sotb-logo.png"> <a href="https://stateofthebrowser.com" rel="external">State of the Browser</a></h3>
    <small><strong>2017 – present</strong></small>
</div>

- Organised 5 annual, not-for-profit conferences, showcasing over 40 speakers with 150+ in-person attendees each year: [2017](https://2017.stateofthebrowser.com/), [2018](https://2018.stateofthebrowser.com/), [2019](https://2019.stateofthebrowser.com/), [2021](https://2021.stateofthebrowser.com/), [2022](https://2022.stateofthebrowser.com/).
- Curated panels of speakers from the industry’s top experts and thought leaders through networking and ongoing involvement in the web community.
- Sourced lucrative and repeated partnerships to fund the events and enable under-represented groups to attend for free.
- Liaised with speakers, sponsors, and venues as well as handled the logistics of running a popular in-person and online conference.
- Built and maintained the conference websites, including a complete codebase refresh in 2021 which included extensive work with APIs to automate many organisational aspects of the conference.

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <h3 class=" [ delta ] ">Open Source Author</h3>
</div>

Author of numerous open source projects for web developers and designers, some being utilised for client projects to this day and grossing over 1,000 downloads per month, including:

- **[Bowhead](https://chrisburnell.com/bowhead/)** <small>([>4,000 downloads](https://www.npmjs.com/package/@chrisburnell/bowhead) · [3 ★](https://github.com/chrisburnell/bowhead))</small><br>A SCSS framework for integrating design tokens into a CSS codebase with support for CSS Variables. This framework has now been a key component in over half a dozen projects deployed during my time at *Squiz*.
- **[eleventy-cache-webmentions](https://chrisburnell.com/eleventy-cache-webmentions/)** <small>([>2,900 downloads](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions) · [13 ★](https://github.com/chrisburnell/eleventy-cache-webmentions))</small><br>A plugin for the popular static site generator, [Eleventy](https://11ty.io/), that allows the caching of Webmentions and makes them available to use throughout one’s website.
- **[Pentatonic](https://chrisburnell.com/pentatonic/)** <small>([>3,100 downloads](https://www.npmjs.com/package/@chrisburnell/pentatonic) · [1 ★](https://github.com/chrisburnell/pentatonic))</small><br>A JavaScript library for turning any array of integers into a fun little melody using the Web Audio API.
- **[spark-line](https://chrisburnell.com/spark-line/)** <small>([>1,900 downloads](https://www.npmjs.com/package/@chrisburnell/spark-line) · [3 ★](https://github.com/chrisburnell/spark-line))</small><br>A custom element Web Component for generating sparkline graphs from a sequence of integers using the Canvas API.

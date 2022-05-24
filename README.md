<img src="images/raven.svg" width="200" height="200" alt="">

# chrisburnell.com

The source code for [chrisburnell.com](https://chrisburnell.com/)

[![Deploy](https://github.com/chrisburnell/chrisburnell.com/workflows/Deploy/badge.svg)](https://github.com/chrisburnell/chrisburnell.com/actions?query=workflow%3A%22Deploy%22)

## Table of Contents

- [Description](#description)
  - [Cool stuff I like about my website](#cool-stuff-i-like-about-my-website)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [Build Process](#build-process)
- [Network](#network)
- [License](#license)

## Description

My website doubles as a blog and as a playground for me to perfect the code that
comprises the site and to experiment with new methodologies and technologies.
You may find that things change quite drastically or strangely over time; this
is because I am always trying to learn new things and encorporate them into my
site or this Github repository. If you have any questions or suggestions, please
don’t hesitate to get in touch via [Mastodon](https://social.chrisburnell.com/@chris),
[Twitter](https://twitter.com/iamchrisburnell), or [email me](mailto:me@chrisburnell.com).

While the code for my website is open source, it is not intended to be used as a template for your own website. By all means, copy and share what you like, but make sure it’s part of something you can call your own. 🙂

### Cool stuff I like about my website

- Robust design tokens system
- Unified colour palette for content + CSS + image editing software
- RSS feed generation
- Calendar feed generation
- Converts local images and serves optimised formats
- Caches avatars from microformats2, Mastodon, and Twitter and serves optimised formats
- Organised system of local and cached external data
- Extremely flexible content creation through use of a lot of data-mapping and automation through Eleventy features
- Pulls down latest Webmentions against pages and posts and builds "hot" and "popular" collections
- Pulls down data about people from my personal API to enrich data about other authors mentioned in replies, reviews, RSVPs, etc.
- Pulls down data about projects on GitHub and NPM
- GitHub Actions rebuilds intermittently to allow fresh data to update necessary regions of the website

## Code of Conduct

Please see the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Contributing

Please see the [Contributing Guide](CONTRIBUTING.md), [Commit Template](COMMIT_TEMPLATE.md), [Issue Template](ISSUE_TEMPLATE.md), and [Pull Request Template](PULL_REQUEST_TEMPLATE.md).

## Build Process

- [Eleventy](https://11ty.dev)
- [SCSS](http://sass-lang.com)
- [Autoprefixer](https://github.com/ai/autoprefixer)
- [PostCSS](http://postcss.org/)

## Network

SSL and Wildcard DNS are supported by [CloudFlare](https://www.cloudflare.com/) 🙏

## License

The contents of this repository, unless otherwise specified, are licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE).

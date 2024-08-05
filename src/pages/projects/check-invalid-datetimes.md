---
title: check-invalid-datetimes
emoji: 📅
github: chrisburnell/check-invalid-datetimes
branch: main
dev: true
npm: "@chrisburnell/check-invalid-datetimes"
license: MIT
tags:
  - javascript
  - package
---

{% include 'package.njk' %}

<p class=" [ center  inline-center ] "><strong>This project is a work-in-progress.</strong></p>

Adapted from the [check-html-links package](https://www.npmjs.com/package/check-html-links).

## Installation

{% include 'installation.njk' %}

## Usage

### General

```bash
npx @chrisburnell/check-invalid-datetimes _site
```

### Specific file types

```bash
npx @chrisburnell/check-invalid-datetimes --directory=_site --file-types=html,json
```

### Quiet mode

```bash
npx @chrisburnell/check-invalid-datetimes --directory=_site --quiet
```

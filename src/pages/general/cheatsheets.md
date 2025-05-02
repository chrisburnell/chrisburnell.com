---
title: Cheatsheets
description: TODO
---

Back when I started getting my chops in web development, I used to print these programming language cheatsheets made by a guy named Dave Child. Although the original site they were hosted on [doesn’t exist anymore](https://aloneonahill.com/blog/what-happened-to-ilovejackdaniels-dot-com), I’m happy to see that all those cheatsheets that really helped me familiarise myself with HTML elements and different CSS properties is [still alive and kicking](https://cheatography.com/programming/)!

In the spirit of the inspiration and efficiency Dave Child passed onto me through his cheatsheets in the late 2000s, I thought it could be fun to create some cheatsheets of my own, aimed not only at people who are just now getting their feet wet but also as a reminder to myself of the important fundamentals that can be distilled from 15 years of dedicated and nonstop learning about web development.

From [Harry Roberts on Bluesky](https://bsky.app/profile/csswizardry.com/post/3lik3a7ahcc2p):

```bash
# Add changes hunk by hunk
git add -p <path>
# See what you're about to commit
git diff --cached
# Add these changes to the last commit
git commit --amend --no-edit
# Show all non-whitespace changes
git diff -w
# Show word-level changes rather than whole lines
git diff --word-diff
# Show character-level changes rather than whole lines
git diff --word-diff-regex=.
# Might need refactoring?
git log --pretty=format: --since="1 year ago" --name-only | sort | uniq -c | sort -rg | head -50
```

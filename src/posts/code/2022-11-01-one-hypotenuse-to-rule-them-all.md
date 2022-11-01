---
date: 2022-11-01T15:27:00+0000
title: One Hypotenuse to rule them all
description: Here’s a fun little demo of some math I found interesting.
---

If a right triangle has two sides with lengths equalling <var>√2 / 2</var>, what is the length of its hypotenuse?

<figure>
    <div class="triangle">?</div>
</figure>

We’ll build a function to calculate the length of the hypotenuse given the length of the triangle’s other two sides.

For this, we’ll use a bit of algebra you’re probably quite familiar with:

<figure>
    <p>Pythagorean Theorum</p>
    <p><samp class="delta">a² + b² = c²</samp></p>
</figure>

Where <var>c</var> represents the hypotenuse, and <var>a</var> and <var>b</var> the other two sides.

Let’s put everything together and calculate this with some JavaScript:

```js
const side = Math.sqrt(2) / 2

// We’re looking for `c` in the equation:
// a² + b² = c²
const calculateHypotenuse = (a, b) => {
	// Start with getting the square of the sides,
	// `a` and `b`
	const a2 = Math.pow(a, 2)
	const b2 = Math.pow(b, 2)

	// Then, to isolate `c`, take the square root of
	// both sides of the equation
	return Math.sqrt(a2 + b2)
}

const hypotenuse = calculateHypotenuse(side, side)
```

Which gives us…

<figure>
    <div class="triangle">1</div>
</figure>

Interesting! 🤔

<style>
.triangle {
    background-image:
        linear-gradient(
            to bottom right,
            hsla(var(--hsl-dove) / var(--opacity-beta)),
            transparent
        ),
        linear-gradient(
            to bottom right,
            transparent 49.9%,
            hsl(var(--hsl-alto)) 50%
        );
    background-repeat: no-repeat;
    background-size:
        15% 15%,
        100% 100%;
    background-position:
        bottom right,
        top left;
    width:  10rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline-end: 1.25rem;
    padding-block-end:  1.25rem;
    margin-right: 3.75rem;
    margin-bottom: 2rem;
    font-weight: 600;
    position: relative;
}

.triangle::before,
.triangle::after {
    content: "√2 / 2";
    position: absolute;
    white-space: nowrap;
}

.triangle::before {
    left: calc(100% + 0.5rem);
    top: 50%;
    transform: translateY(-50%);
}

.triangle::after {
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
}
</style>

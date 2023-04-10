---
date: 2022-11-01T15:27:00+0000
title: One Hypotenuse to rule them all
description: Here’s a fun little demo of some math I found interesting.
syndicate_to:
  - https://codepen.io/chrisburnell/pen/poKgaoR
---

If a right triangle has two side-lengths both equal to <var>√2 / 2</var>, what is the length of its hypotenuse?

<figure aria-hidden="true">
    <div class="right-triangle">
        <div class="hypotenuse  gamma"><var>?</var></div>
        <div class="opposite">√2 / 2</div>
        <div class="adjacent">√2 / 2</div>
    </div>
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

Which gives us… <var>1</var>

<figure aria-hidden="true">
    <div class="right-triangle">
        <div class="hypotenuse  gamma"><var>1</var></div>
        <div class="opposite">√2 / 2</div>
        <div class="adjacent">√2 / 2</div>
    </div>
</figure>

Interesting! 🤔

{% css %}
@layer overrides {
    .right-triangle {
        background-image:
            linear-gradient(
                to bottom right,
                transparent 49.9%,
                hsl(var(--hsl-raven)) 50%
            );
        inline-size: 10rem;
        block-size:  10rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline-end: 1.25rem;
        padding-block-end:  1.25rem;
        margin-inline-end: 3.75rem;
        margin-block-end: 2rem;
        position: relative;
        font-weight: var(--font-weight-semibold);
    }

    .right-triangle::before,
    .hypotenuse,
    .opposite,
    .adjacent {
        position: absolute;
        white-space: nowrap;
    }

    .right-triangle::before {
        content: "";
        inline-size: 15%;
        block-size:  15%;
        border-width: var(--size-border-thin) 0 0 var(--size-border-thin);
        border-style: dashed;
        border-color: hsl(var(--hsl-snowy));
        inset-inline-end: 0;
        inset-block-end: 0;
    }

    .hypotenuse {
        text-align: right;
        inset-block-end: 50%;
        inset-inline-end: 50%;
    }

    .opposite {
        inset-inline-start: calc(100% + 0.5rem);
        inset-block-start: 50%;
        transform: translateY(-50%);
    }

    .adjacent {
        inset-block-start: calc(100% + 0.5rem);
        inset-inline-start: 50%;
        transform: translateX(-50%);
    }
}
{% endcss %}

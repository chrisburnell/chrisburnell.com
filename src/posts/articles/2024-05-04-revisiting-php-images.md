---
date: 2024-05-04T21:02:10+0800
title: Revisiting PHP-Generated Images
description: Generating images using PHP was a bit like magic to me back in 2007. In this post, I’m going to revisit the technique to create an image that shows dynamically-updating information about my website content.
tags:
  - weblogpomo
  - weblogpomo2024
  - php
post_includes:
  - weblogpomo2024.njk
---

<div class=" [ box ] [ line-length ] " style="margin-block-end: var(--size-large);">
    <p>Jump to the code: <a href="#build">Building a PHP image</a></p>
</div>

<h2 id="history">A short history</h2>

In my teenage years, forums were *all the jam*. It’s a bit of a shame that their popularity has waned since social media entered the scene because forums foster slower and more thoughtful conversations, in *my* opinion, at least. I was a member of many forums dedicated to many topics, including Nintendo games, The Legend of Zelda, Star Wars, and pixel-art. I made some of my first online friends through these forums.

<aside><p>Despite their not being as popular nowadays, forums aren’t dead! I’m a member of some wonderful forums that I’m happy to say are not just alive and kicking but buzzing with activity and growing. The <a href="https://discourse.32bit.cafe" rel="external noopener">32-Bit Café forum</a>, in particular, is full of great people, and I visit so often that it’s one of the very few tabs that are pinned in my browser!</p></aside>

Back in 2007, around the beginning of my journey into web development, I co-founded a small community of folks passionate about video games and creating media about them, and I was in charge of our website that hosted all of our community’s content, a completely-bespoke and hand-written mish-mash of HTML, CSS, MySQL databases, and PHP.

Because me and the other founders/admins wanted an easy way for our community members to keep abreast of the latest content, the top-right of the website featured an area that listed and linked to the most-recently published videos, podcasts, and songs being made by us and our members.

Now, it’s worth mentioning that a not-insignificant part of forum life back then (and even to this day) was having a cool signature, a section underneath each member’s posts where one could put fun little quips, quotes, and even images. Many forums had <q>graphics shops</q> where requests could be made of talented individuals to create avatars, banners, signature images, etc. for members who asked nicely.

--------

As a means of promoting what was going on in our video game media community, me and the other founders often had linked images going out to our website. I even went to the effort of putting a bit of text alongside the image in my signature that stated what content had been recently published on our website. Across multiple forums, this was a pretty time-consuming task that I went through whenever something new was published.

Well, I got pretty tired of manually editing my forum signatures, and that’s when I discovered that it was possible to create images with PHP code! Instead of manually editing my signatures, I could create a PHP image hosted on our website that linked up with the database of published work and automatically pulled in fresh content.

So that’s exactly what I did! Using my website’s content as an example, I’m going to walk through how to generate a PNG image using PHP.

<h2 id="build">Building a PHP image</h2>

<figure style="--flow-space: var(--size-large);">
    <img src="https://api.chrisburnell.com/dynamic-banner.php" alt="a small banner showing statistical information about content on chrisburnell.com" width="300" height="80" loading="lazy" decoding="async" style="image-rendering: pixelated;">
</figure>

Before we start, it’s important to know that we’ll be working with a coordinate system as we build our image, where `0, 0` is at the top-left, so `X` increases to the right and `Y` increases downwards.

Now let’s write some code.

First, we need to dictate the dimensions of the image using the [`imagecreatetruecolor`](https://www.php.net/manual/en/function.imagecreatetruecolor.php) function, and we’ll enable transparency in case we put anything in our image that isn’t completely opaque with the [`imagealphablending`](https://www.php.net/manual/en/function.imagealphablending.php) function.

```php
$width = 300;
$height = 80;
$spacing = 6;

$image = imagecreatetruecolor($width, $height);
imagealphablending($image, true);
```

We’ll come back to the `$spacing` variable later.

If we wanted to set a solid colour as the background of our image, we could use the [`imagecolorallocate`](https://www.php.net/manual/en/function.imagecolorallocate.php) function, passing in a reference to our `$image` and represent our desired colour using RGB components. The [`imagefill`](https://www.php.net/manual/en/function.imagefill.php) function fills our image with our desired colour, starting from the given coordinates (`0, 0` in this case).

```php
$backgroundColor = imagecolorallocate($image, 6, 6, 6);

imagefill($image, 0, 0, $backgroundColor);
```

However, in my case, I want to apply a static image for the background. For that, we can use the [`imagecreatefrompng`](https://www.php.net/manual/en/function.imagecreatefrompng.php) function to reference the static image file. We’ll use the [`imagecopy`](https://www.php.net/manual/en/function.imagecopy.php) function to copy the static image into our PHP image.

With this function, we need to specify the destination coordinates, the coordinates of the static image to place at that destination, and the dimensions of the image. This allows us copy in only a part of a static image and stretch/shrink it if desired.

In this case, the static image I’m setting as the background has the same dimensions as my PHP image, and I want to place the top-left of my static image in the top-left of my PHP image.

```php
$backgroundImage = imagecreatefrompng('./static-image.png');

$destinationX = 0;
$destinationY = 0;
$sourceX = 0;
$sourceY = 0;

imagecopy($image, $backgroundImage, $destinationX, $destinationY, $sourceX, $sourceY, $width, $height);
```

For the purpose of pulling in fresh data, I’ve created [a small JSON file](/dynamic-data.json) that my website generates whenever it builds, so I’ll grab the data from that file using the [`file_get_contents`](https://www.php.net/manual/en/function.file-get-contents.php) function and decode the JSON into usable data using the [`json_decode`](https://www.php.net/manual/en/function.json-decode.php) function.

```php
$json = file_get_contents('./generated-data.json');
$data = json_decode($json);
```

The next step is to prepare to print out some text, so let’s set the text colour using the `imagecolorallocate` function again, set up a reference to a TTF font file, and decide on a font size to use.

```php
$textColor = imagecolorallocate($image, 249, 249, 249);
$fontFile = './my-font.ttf';
$fontSize = 11;
```

Wow we’re ready to start using the data and print out some text on top of the image using the [`imagettftext`](https://www.php.net/manual/en/function.imagettftext.php) function. Like with the background image above, we need to pass in some destination coordinates, and we can also print the text at an angle.

One <q>gotcha</q> here is that the `Y` coordinate of our text represents the text’s **baseline**, so we need to take into account the height of the text when assigning it’s `Y` coordinate.

In order to make things align nicely, we can use the [`imagettfbbox()`](https://www.php.net/manual/en/function.imagettfbbox.php) function to figure out how much space the text has taken up. This function returns an array with eight values, representing the coordinates of the bottom-left, bottom-right, top-right, and top-left corners of the bounding box of our text.

In my case, I want the text to be printed horizontally and slightly-offset from the edge, so I’ll make the angle, `X`, and `Y` values explicit.

```php
$angle = 0;

$latestBlogText = 'Latest Post Date: ' . $data->latest_post_date;

$latestBlogSpace = imagettfbbox($fontSize, $angle, $fontFile, $latestBlogText);

$x = $spacing;
$y = $spacing + $latestBlogSpace[1];

imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $fontFile, $latestBlogText);
```

We can use the `Y` value of the above text to figure out what the `Y` value for our next line of text should be, repeating these steps for each line of text in our image.

```php
$blogCountText = 'No. Blog Posts: ' . $data->blog_count;

$blogCountSpace = imagettfbbox($fontSize, $angle, $fontFile, $blogCountText);

$y = $y + $spacing + $blogCountSpace[1];

imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $fontFile, $blogCountText);
```

The last step is to set the [`header`](https://www.php.net/manual/en/functions.header.php) of our PHP file so it can be interpreted as a PNG image when requested in the browser and output the image we’ve created with the [`imagepng`](https://www.php.net/manual/en/function.imagepng.php) function.

We’ll also use the ['imagedestroy'](https://www.php.net/manual/en/function.imagedestroy.php) function to free up any memory used by referencing and creating the two images we’ve dealt with in our code. *Note: this function is not required in PHP 8.0.0 and above.*

```php
header('Content-type: image/png');
imagepng($image);

imagedestroy($image);
imagedestroy($backgroundImage);
```

--------

And that’s it! We can now reference our PHP image in our front end code and treat it like a PNG image.

```html
<img src="dynamic-image.php" alt="..." width="300" height="80">
```

<figure>
    <img src="https://api.chrisburnell.com/dynamic-banner.php" alt="a small banner showing statistical information about content on chrisburnell.com" width="300" height="80" loading="lazy" decoding="async" style="image-rendering: pixelated;">
</figure>

Keep in mind that the server serving the PHP image *does* have to do some computational work in order to output the PNG, and there are some caching considerations that have to be made if the data being presented in the image should be fresh.

<c-details>
    <summary>The full code</summary>

```php
<?php
// Set up some variables for later
$width = 300;
$height = 80;
$spacing = 6;
$angle = 0;
$x = $spacing;

// Create the image at our specified dimensions
$image = imagecreatetruecolor($width, $height);

// Enable transparency
imagealphablending($image, true);

// Set a solid colour as the background
$backgroundColor = imagecolorallocate($image, 6, 6, 6);
imagefill($image, 0, 0, $backgroundColor);

// Set a static image as the background
$backgroundImage = imagecreatefrompng('./static-image.png');
$destinationX = 0;
$destinationY = 0;
$sourceX = 0;
$sourceY = 0;
imagecopy($image, $backgroundImage, $destinationX, $destinationY, $sourceX, $sourceY, $width, $height);

// Grab data from a JSON file
$json = file_get_contents('./generated-data.json');
$data = json_decode($json);

// Prepare to print out some text
$textColor = imagecolorallocate($image, 249, 249, 249);
$fontFile = './my-font.ttf';
$fontSize = 11;

// Latest Post Date text
$latestBlogText = 'Latest Post Date: ' . $data->latest_post_date;
$latestBlogSpace = imagettfbbox($fontSize, $angle, $fontFile, $latestBlogText);
$x = $spacing;
$y = $spacing + $latestBlogSpace[1];
imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $fontFile, $latestBlogText);

// Blog Count text
$blogCountText = 'No. Blog Posts: ' . $data->blog_count;
$blogCountSpace = imagettfbbox($fontSize, $angle, $fontFile, $blogCountText);
$y = $y + $spacing + $blogCountSpace[1];
imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $fontFile, $blogCountText);

// Projects Count text
$projectsCountText = 'No. Projects: ' . $data->projects_count;
$projectsCountSpace = imagettfbbox($fontSize, $angle, $fontFile, $projectsCountText);
$y = $y + $spacing + $projectsCountSpace[1];
imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $fontFile, $projectsCountText);

header('Content-type: image/png');
imagepng($image);

imagedestroy($image);
imagedestroy($backgroundImage);
```

</c-details>

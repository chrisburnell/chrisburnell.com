---
permalink: "/webaction.html"
title: webaction handler
description: Move along!
theme: null
---

<script>
    (function() {
        if (window.parent !== window) {
            window.parent.postMessage(JSON.stringify({
            reply: "https://quill.p3k.io/new?reply={url}",
            repost: "https://quill.p3k.io/repost?url={url}",
            like: "https://quill.p3k.io/favorite?url={url}"
            }), '*');
        }
    }());
</script>

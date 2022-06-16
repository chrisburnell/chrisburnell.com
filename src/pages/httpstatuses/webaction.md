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
      // The endpoint you use to write replies
      reply: 'https://corvus.chrisburnell.com/?in_reply_to={url}'
    }), '*');
  }
}());
</script>

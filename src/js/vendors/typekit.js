(function(d) {
    var typekitTimeout = 5000;
    if( window.sessionStorage ) {
        if( sessionStorage.getItem('useTypekit') === 'false' ) {
            typekitTimeout = 0;
        }
    }
    var config = {
        kitId: 'bbn1puz',
        scriptTimeout: typekitTimeout
    },
    h = d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+"wf-inactive";if(window.sessionStorage){sessionStorage.setItem("useTypekit","false")}},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+="wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

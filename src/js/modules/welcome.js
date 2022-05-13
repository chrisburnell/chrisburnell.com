const welcome = () => {
	console.log(`%cRAVEN                                %cchrisburnell.com`, "color: #507791", "color: inherit")
	console.log(`%c  OUSRAV                             %c------------------------`, "color: #507791", "color: inherit")
	console.log(`%c    ENOUSRA                          %cOS: ${navigator.oscpu}`, "color: #507791", "color: inherit")
	console.log(`%c      VENOUSRA                       %cLanguage: ${navigator.language}`, "color: #507791", "color: inherit")
	console.log(`%c       VENOUSR                       %cOnline: ${navigator.onLine === true ? "True" : "False"}`, "color: #507791", "color: inherit")
	console.log(`%c       AVENOUSR               A      %cService Worker: ${navigator?.serviceWorker?.controller?.state || "pending"}`, "color: #507791", "color: inherit")
	console.log(`%c        VENOUSR             A VE`, "color: #507791")
	console.log(`%c        NOUSRAVE         NO USRA V`, "color: #507791")
	console.log(`%c         ENOUSRAV     ENOUSRAVENOU`, "color: #507791")
	console.log(`%c          SRAVENOUSRAVENOUSRAVENOU`, "color: #507791")
	console.log(`%c           SRAVENOUSRAVENOUSRAVENO`, "color: #507791")
	console.log(`%cUSR      AVENOUSRAVENOUSRAVENOUSRA`, "color: #507791")
	console.log(`%c VENOUSRAVENOUSRAVENOUSRAVEN`, "color: #507791")
	console.log(`%c  OUSRAVENOUSRAVENOUSRAVEN`, "color: #507791")
	console.log(`%c   OUSRAVENOUSRAVENOUSRAV`, "color: #507791")
	console.log(`%c     ENOUSRAVENOUSRAVEN%cO%cUS`, "color: #507791", "color: #eb2d37", "color: #507791")
	console.log(`%c            RAVEN     OUS`, "color: #507791")
	console.log(`%c          RAVEN        OU`, "color: #507791")
	console.log(`%c         SR AV`, "color: #507791")
	console.log(`%c            EN`, "color: #507791")
	console.log(`Checking out the source code, %ceh%c?`, "color: #eb2d37", "color: inherit")
	console.log(`Get in touch with me if you want to know more!`)
	return
}

export default welcome

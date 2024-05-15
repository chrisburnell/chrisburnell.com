const blogroll = [
	{
		title: "Jeremy Keith",
		url: "https://adactio.com",
		rss: [
			{
				title: "Jeremy Keith: Articles",
				shorttitle: "Articles",
				url: "https://adactio.com/articles/rss",
			},
			{
				title: "Jeremy Keith: Journal",
				shorttitle: "Journal",
				url: "https://adactio.com/journal/rss",
			},
		],
		mastodon: "adactio@mastodon.social",
	},
	{
		title: "Aaron Parecki",
		url: "https://aaronparecki.com",
		rss: "https://aaronparecki.com/feed.xml",
		mastodon: "aaronpk@aaronparecki.com",
		twitter: "aaronpk",
	},
	{
		title: "Calum Ryan",
		url: "https://calumryan.com",
		rss: "https://calumryan.com/feeds/rss",
		mastodon: "calumryan@toot.cafe",
		twitter: "calum_ryan",
	},
	{
		title: "Max Böck",
		url: "https://mxb.dev",
		rss: "https://mxb.dev/feed.xml",
		mastodon: "mxbck@front-end.social",
	},
	{
		title: "Ruth John",
		url: "https://rumyra.com",
		rss: "https://blog.rumyra.com/feed.xml",
		mastodon: "rumyra@front-end.social",
	},
	{
		title: "Ire Aderinokun",
		url: "https://bitsofco.de",
		rss: [
			{
				title: "Bits of Code",
				url: "https://bitsofco.de/feed/feed.xml",
			},
		],
		mastodon: "ire@front-end.social",
	},
	{
		title: "Dave Letorey",
		url: "https://letorey.co.uk",
		rss: "https://letorey.co.uk/feed.xml",
		mastodon: "dletorey@front-end.social",
		twitter: "dletorey",
	},
	{
		title: "Andy Bell",
		url: ["https://andy-bell.co.uk", "https://piccalil.li"],
		rss: "https://andy-bell.co.uk/feed.xml",
		mastodon: "belldotbz@mastodon.social",
		twitter: ["hankchizljaw", "belldotbz", "piccalilli_"],
	},
	{
		title: "Heydon Pickering",
		url: "https://heydonworks.com",
		rss: "https://heydonworks.com/feed.xml",
		mastodon: "heydon@front-end.social",
	},
	{
		title: "Michelle Barker",
		url: ["https://css-irl.info", "https://michellebarker.co.uk"],
		rss: [
			{
				title: "CSS { IRL }",
				url: "https://css-irl.info/rss.xml",
			},
		],
		mastodon: "michelle@front-end.social",
		twitter: "MicheBarks",
	},
	{
		title: "Zach Leatherman",
		url: "https://zachleat.com",
		rss: "https://zachleat.com/web/feed",
		mastodon: "zachleat@zachleat.com",
	},
	{
		title: "Alistair Shepherd",
		url: "https://alistairshepherd.uk",
		rss: "https://alistairshepherd.uk/feed.xml",
		mastodon: "accudio@mastodon.scot",
	},
	{
		title: "Ben Myers",
		url: "https://benmyers.dev",
		rss: "https://benmyers.dev/feed.xml",
		mastodon: "ben@a11y.info",
	},
	{
		title: "Remy Sharp",
		url: "https://remysharp.com",
		rss: "https://remysharp.com/feed.xml",
		mastodon: "rem@front-end.social",
	},
	{
		title: "Ana Rodrigues",
		url: "https://ohhelloana.blog",
		rss: "https://ohhelloana.blog/feed.xml",
		mastodon: "ohhelloana@mastodon.social",
		twitter: "ohhelloana",
	},
	{
		title: "Ru Singh",
		url: "https://rusingh.com",
		rss: "https://rusingh.com/feed/",
		mastodon: "ru@fosstodon.org",
	},
	{
		title: "Jacky Alciné",
		url: ["https://jacky.wtf", "https://v2.jacky.wtf"],
		rss: "https://granary.io/url?input=html&output=atom&url=https://jacky.wtf/channel/all",
		mastodon: "jalcine@playvicious.social",
		twitter: "jackyalcine",
	},
	{
		title: "Vincent Pickering",
		url: "https://vincentp.me",
		rss: "https://vincentp.me/feeds/articles.xml",
	},
	{
		title: "Stu Robson",
		url: "https://alwaystwisted.com",
		rss: "https://alwaystwisted.com/rss.php",
		mastodon: "sturobson@front-end.social",
	},
	{
		title: "Chris Coyier",
		url: "https://chriscoyier.net",
		rss: "https://chriscoyier.net/feed/",
		mastodon: "chriscoyier@front-end.social",
	},
	{
		title: "Dave Rupert",
		url: "https://daverupert.com",
		rss: "https://daverupert.com/atom.xml",
		mastodon: "davatron5000@mastodon.social",
	},
	{
		title: "Brad Frost",
		url: "https://bradfrost.com",
		rss: "https://feeds.feedburner.com/brad-frosts-blog",
		mastodon: "brad_frost@mastodon.social",
	},
	{
		title: "Jonathan Snook",
		url: "https://snook.ca",
		rss: "https://snook.ca/jonathan/index.rdf",
		mastodon: "justsnook@mastodon.social",
	},
	{
		title: "Harry Roberts",
		url: "https://csswizardry.com",
		rss: "https://feeds.feedburner.com/csswizardry",
		mastodon: "csswizardry@webperf.social",
		twitter: "csswizardry",
	},
	{
		title: "Neil Mather",
		url: "https://doubleloop.net",
		rss: "https://doubleloop.net/feed/",
		twitter: "loopdouble",
	},
	{
		title: "Jeremy Cherfas",
		url: "https://jeremycherfas.net",
		rss: "https://jeremycherfas.net/blog.rss",
		mastodon: "etp@indieweb.social",
	},
	{
		title: "Keith J. Grant",
		url: "https://keithjgrant.com",
		rss: "https://keithjgrant.com/posts/index.xml",
		mastodon: "keithjgrant@front-end.social",
	},
	{
		title: "Christian Heilmann",
		url: "https://christianheilmann.com",
		rss: "https://christianheilmann.com/feed/",
		mastodon: "codepo8@toot.cafe",
	},
	{
		title: "Robin Rendle",
		url: "https://robinrendle.com",
		rss: "https://robinrendle.com/feed.xml",
		mastodon: "fonts@sfba.social",
	},
	{
		title: "Rachel Andrew",
		url: "https://rachelandrew.co.uk",
		rss: "https://rachelandrew.co.uk/feed/",
		mastodon: "rachelandrew@front-end.social",
	},
	{
		title: "Eric Meyer",
		url: "http://meyerweb.com",
		rss: "http://meyerweb.com/eric/thoughts/rss2/full",
		mastodon: "meyerweb@mastodon.social",
	},
	{
		title: "Ethan Marcotte",
		url: "https://ethanmarcotte.com",
		rss: "https://ethanmarcotte.com/wrote/feed.xml",
		mastodon: "beep@follow.ethanmarcotte.com",
	},
	{
		title: "Adrian Roselli",
		url: "https://adrianroselli.com",
		rss: "https://adrianroselli.com/feed/",
		mastodon: "aardrian@toot.cafe",
	},
	{
		title: "Jeffrey Zeldman",
		url: "https://zeldman.com",
		rss: "https://zeldman.com/feed/",
		mastodon: "zeldman@front-end.social",
	},
	{
		title: "Cassie Evans",
		url: "https://cassie.codes",
		rss: "https://cassie.codes/feed.xml",
	},
	{
		title: "Bruce Lawson",
		url: "https://brucelawson.co.uk",
		rss: "https://brucelawson.co.uk/feed/",
		mastodon: "brucelawson@vivaldi.net",
	},
	{
		title: "Lynn Fisher",
		url: "https://lynnandtonic.com",
		rss: "https://lynnandtonic.com/feed.xml",
		mastodon: "lynnandtonic@front-end.social",
	},
	{
		title: "Léonie Watson",
		url: "https://tink.uk",
		rss: "https://tink.uk/feed.xml",
		mastodon: "tink@front-end.social",
	},
	{
		title: "Ada Rose Cannon",
		url: "https://ada.is",
		rss: "https://ada.is/feed",
		mastodon: "ada@mastodon.social",
	},
	{
		title: "Sally Lait",
		url: "https://sallylait.com",
		rss: "https://sallylait.com/blog/index.xml",
		mastodon: "sally@mastodon.social",
	},
	{
		title: "Sara Soueidan",
		url: "https://www.sarasoueidan.com",
		rss: "https://www.sarasoueidan.com/blog/index.xml",
		mastodon: "sarasoueidan@front-end.social",
	},
	{
		title: "Kitty Giraudel",
		url: "https://kittygiraudel.com",
		rss: "https://kittygiraudel.com/rss/index.xml",
	},
	{
		title: "Laura Kalbag",
		url: "https://laurakalbag.com",
		rss: "https://laurakalbag.com/index.xml",
		mastodon: "laura@mastodon.laurakalbag.com",
	},
	{
		title: "Jake Archibald",
		url: "https://jakearchibald.com",
		rss: "https://jakearchibald.com/posts.rss",
		mastodon: "jaffathecake@mastodon.social",
	},
	{
		title: "Wouter Groeneveld",
		url: ["https://brainbaking.com", "https://jefklakscodex.com"],
		rss: [
			{
				title: "Brain Baking",
				url: "https://brainbaking.com/index.xml",
			},
			{
				title: "Jefklak's Codex",
				url: "https://jefklakscodex.com/index.xml",
			},
		],
		mastodon: "jefklak@dosgame.club",
	},
	{
		title: "Hidde de Vries",
		url: "https://hidde.blog",
		rss: "https://hidde.blog/feed/",
		mastodon: "hdv@front-end.social",
	},
	{
		title: "Sophie Koonin",
		url: "https://localghost.dev",
		rss: "https://localghost.dev/feed.xml",
		mastodon: "sophie@social.lol",
	},
	{
		title: "Ahmad Shadeed",
		url: "https://ishadeed.com",
		rss: "https://ishadeed.com/feed.xml",
		mastodon: "shadeed9@front-end.social",
	},
	{
		title: "Ginestra Ferraro",
		url: "https://www.thatsmood.com",
		rss: "https://www.thatsmood.com/feed.xml",
		mastodon: "ginez_17@mastodon.social",
	},
	{
		title: "Bruce Delo",
		url: "https://flyknifecomics.com",
		rss: "https://flyknifecomics.com/feed.xml",
		twitter: "flyknifecomics",
	},
	{
		title: "Cory Dransfeldt",
		url: "https://coryd.dev",
		rss: "https://feedpress.me/coryd",
		mastodon: "cory@social.lol",
	},
	{
		title: "Yoav Weiss",
		url: "https://blog.yoav.ws",
		rss: "https://blog.yoav.ws/feed/feed.xml",
		mastodon: "yoav@mastodon.social",
	},
	{
		title: "Luke Harris",
		url: "https://www.lkhrs.com",
		rss: "https://www.lkhrs.com/blog/index.xml",
	},
	{
		title: "Miriam Eric Suzanne",
		url: "https://www.miriamsuzanne.com",
		rss: "https://www.miriamsuzanne.com/feed.xml",
		mastodon: "mia@front-end.social",
	},
	{
		title: "Sia Karamalegos",
		url: "https://sia.codes",
		rss: "https://sia.codes/feed/feed.xml",
		mastodon: "sia@front-end.social",
	},
	{
		title: "Trys Mudford",
		url: "https://trysmudford.com",
		rss: "https://trysmudford.com/blog/index.xml",
		mastodon: "trys@mastodon.social",
	},
	{
		title: "Sindre Sorhus",
		url: "https://sindresorhus.com",
		rss: "https://sindresorhus.com/rss.xml",
		mastodon: "sindresorhus@mastodon.social",
	},
	{
		title: "Charlotte Dann",
		url: "https://charlottedann.com",
		rss: "https://charlottedann.com/rss.xml",
		mastodon: "charlottedann@mastodon.social",
	},
	{
		title: "Web Platform News",
		url: "https://webplatform.news",
		rss: "https://webplatform.news/feed.xml",
	},
	{
		title: "Trent Walton",
		url: "https://trentwalton.com",
		rss: "https://trentwalton.com/feed.xml",
		mastodon: "trentwalton@mastodon.social",
	},
	{
		title: "Nicolas Hoizey",
		url: "https://nicolas-hoizey.com",
		rss: [
			{
				title: "Nicolas Hoizey: Articles",
				shorttitle: "Articles",
				url: "https://nicolas-hoizey.com/feeds/articles.xml",
			},
			{
				title: "Nicolas Hoizey: Notes",
				shorttitle: "Notes",
				url: "https://nicolas-hoizey.com/feeds/notes.xml",
			},
		],
		mastodon: "nhoizey@mamot.fr",
	},
	{
		title: "Sara Joy",
		url: "https://sarajoy.dev",
		rss: "https://sarajoy.dev/rss.xml",
		mastodon: "sarajw@front-end.social",
	},
	{
		title: "Phil Nash",
		url: "https://philna.sh",
		rss: "https://philna.sh/feed.xml",
		mastodon: "philnash@mastodon.social",
	},
	{
		title: "Andy Davies",
		url: "https://andydavies.me",
		rss: "http://feeds.feedburner.com/andydavies",
		mastodon: "andydavies@hachyderm.io",
	},
	{
		title: "Eric Bailey",
		url: "https://ericwbailey.website",
		rss: "https://ericwbailey.website/feed/feed.xml",
		mastodon: "eric@social.ericwbailey.website",
	},
	{
		title: "Manuel Matuzović",
		url: "https://www.matuzo.at",
		rss: "https://www.matuzo.at/feed.xml",
		mastodon: "matuzo@front-end.social",
	},
	{
		title: "Amy Hupe",
		url: "https://amyhupe.co.uk",
		rss: "https://amyhupe.co.uk/atom.xml",
		mastodon: "amy_hupe@social.design.systems",
	},
	{
		title: "Seren Davies",
		url: "https://www.serendavies.me",
		rss: "https://www.serendavies.me/feed.xml",
		mastodon: "ninjanails@front-end.social",
	},
	{
		title: "Stephanie Eckles",
		url: "https://moderncss.dev",
		rss: "https://moderncss.dev/feed/",
		mastodon: "5t3ph@front-end.social",
	},
	{
		title: "Surma",
		url: "https://surma.dev",
		rss: "https://surma.dev/index.xml",
		mastodon: "surma@mastodon.social",
	},
	{
		title: "Phil Hawksworth",
		url: "https://www.hawksworx.com",
		rss: "https://www.hawksworx.com/feed.xml",
		mastodon: "philhawksworth@indieweb.social",
	},
	{
		title: "Pelle Wessman",
		url: "https://voxpelli.com",
		rss: "https://voxpelli.com/all.xml",
		mastodon: "voxpelli@mastodon.social",
	},
	{
		title: "Paul Robert Lloyd",
		url: "https://paulrobertlloyd.com",
		rss: "https://paulrobertlloyd.com/feed.xml",
		mastodon: "paulrobertlloyd@mastodon.social",
	},
	{
		title: "Alex Russell",
		url: "https://infrequently.org",
		rss: "https://infrequently.org/feed/",
		mastodon: "slightlyoff@toot.cafe",
	},
	{
		title: "Jason Lengstorf",
		url: "https://jason.energy",
		rss: "https://jason.energy/feed.xml",
		mastodon: "jlengstorf@hachyderm.io",
	},
	{
		title: "Evan Sheehan",
		url: "https://darthmall.net",
		rss: "https://darthmall.net/feed.xml",
		mastodon: "darth_mall@notacult.social",
	},
	{
		title: "Lea Verou",
		url: "https://lea.verou.me",
		rss: "https://lea.verou.me/feed.xml",
		mastodon: "leaverou@front-end.social",
	},
	{
		title: "Kilian Valkhof",
		url: "https://kilianvalkhof.com",
		rss: "https://kilianvalkhof.com/feed",
		mastodon: "kilian@mastodon.social",
	},
	{
		title: "James",
		url: "https://jamesg.blog",
		rss: "https://granary.io/url?input=html&output=rss&url=https://jamesg.blog",
		mastodon: "capjamesg@indieweb.social",
	},
	{
		title: "David Darnes",
		url: "https://darn.es",
		rss: "https://darn.es/rss.xml",
		mastodon: "daviddarnes@mastodon.design",
	},
	{
		title: "Henrique Dias",
		url: "https://hacdias.com",
		rss: "https://hacdias.com/feed.xml",
		mastodon: "hacdias@fosstodon.org",
	},
	{
		title: "Pablo Morales",
		url: "https://lifeofpablo.com",
		rss: "https://lifeofpablo.com/feed/folder:blog/page:feed.xml",
		mastodon: "pablo@lifeofpablo.com",
	},
	{
		title: "Mark Sutherland",
		url: "https://marksuth.dev",
		rss: "https://marksuth.dev/feed/posts.xml",
		mastodon: "marksuth@mastodon.social",
	},
	{
		title: "fLaMEd",
		url: "https://flamedfury.com",
		rss: "https://flamedfury.com/feed.xml",
		mastodon: "flamed@social.lol",
	},
	{
		title: "Juan Fernandes",
		url: "https://www.juanfernandes.uk",
		rss: "https://www.juanfernandes.uk/rss/feed.xml",
		mastodon: "juanfernandes@hachyderm.io",
	},
	{
		title: "11ty Rocks!",
		url: "https://11ty.rocks",
		rss: "https://11ty.rocks/feed",
	},
	{
		title: "Clearleft",
		url: ["https://clearleft.com", "https://podcast.clearleft.com"],
		rss: [
			{
				title: "Clearleft",
				url: "https://clearleft.com/thinking/rss",
			},
			{
				title: "Clearleft Podcast",
				url: "https://podcast.clearleft.com/podcast.xml",
			},
		],
		mastodon: "clearleft@mastodon.social",
	},
	{
		title: "Eleventy",
		url: "https://11ty.dev",
		rss: [
			{
				title: "Eleventy Blog",
				url: "https://11ty.dev/blog/feed.xml",
			},
		],
		mastodon: "eleventy@fosstodon.org",
	},
	{
		title: "Set Studio",
		url: "https://set.studio",
		rss: "https://set.studio/feed/",
		mastodon: "setstudio@mastodon.design",
	},
	{
		title: "Alwyn Soh",
		url: "https://sohwatt.com",
		rss: "https://sohwatt.com/rss/",
		mastodon: "alwynispat@mastodon.sg",
	},
	{
		title: "Chen Hui Jing",
		url: "https://chenhuijing.com",
		rss: "https://chenhuijing.com/feed.xml",
		mastodon: "huijing@tech.lgbt",
	},
	{
		title: "Dan Mall",
		url: "https://danmall.com",
		rss: "https://danmall.com/feed.xml",
	},
	{
		title: "Erik Kroes",
		url: "https://www.erikkroes.nl",
		rss: "https://www.erikkroes.nl/feed.xml",
		mastodon: "erikkroes@mastodon.social",
	},
	{
		title: "Lene Saile",
		url: "https://www.lenesaile.com",
		rss: "https://www.lenesaile.com/en/feed.xml",
		mastodon: "lene@front-end.social",
	},
	{
		title: "Noah Leibman",
		url: "https://noahliebman.net",
		rss: "https://noahliebman.net/feed/index.xml",
		mastodon: "noleli@mastodon.social",
	},
	{
		title: "Robb Knight",
		url: "https://rknight.me",
		rss: "https://rknight.me/subscribe/posts/rss.xml",
		mastodon: "robb@social.lol",
	},
	{
		title: "Ryan Mulligan",
		url: "https://ryanmulligan.dev",
		rss: "https://ryanmulligan.dev/feed.xml",
		mastodon: "hexagoncircle@fosstodon.org",
	},
	{
		title: "Blake Watson",
		url: "https://blakewatson.com",
		rss: "https://blakewatson.com/feed/",
		mastodon: "bw@social.lol",
	},
	{
		title: "Xandra",
		url: "https://xandra.cc",
		rss: [
			{
				title: "the museum of alexandra",
				url: "https://neocities.org/site/xandra.rss",
			},
		],
		mastodon: "xandra@tilde.zone",
	},
	{
		title: "ShopTalk",
		url: "https://shoptalkshow.com",
		rss: "https://shoptalkshow.com/feed/podcast/",
		mastodon: "shoptalkshow@front-end.social",
	},
	{
		title: "Josh Comeau",
		url: "https://joshwcomeau.com",
		rss: "https://joshwcomeau.com/feed.xml",
	},
	{
		title: "Matthew Howell",
		url: "https://www.matthewhowell.net",
		rss: "https://www.matthewhowell.net/atom.xml",
		mastodon: "matthewhowell@indieweb.social",
	},
	{
		title: "Thomas Michael Semmler",
		url: "https://helloyes.dev",
		rss: "https://helloyes.dev/feeds/blog/feed.xml",
		mastodon: "nachtfunke@indieweb.social",
	},
	{
		title: "CodePen",
		url: "https://codepen.io",
		rss: [
			{
				title: "CodePen Spark",
				url: "https://codepen.io/spark/feed/",
			},
		],
		mastodon: "codepen@fosstodon.org",
	},
	{
		title: "Juhis Hamatti",
		url: "https://hamatti.org",
		rss: "https://hamatti.org/feed/feed.xml",
		mastodon: "hamatti@mastodon.world",
	},
	{
		title: "yequari",
		url: "https://yequari.com",
		rss: "https://yequari.com/blog/index.xml",
		mastodon: "yequari@retro.pizza",
	},
	{
		title: "The Frugal Gamer",
		url: "https://www.thefrugalgamer.net",
		rss: "https://www.thefrugalgamer.net/rss.xml",
		mastodon: "frugalgamer@snug.moe",
	},
	{
		title: "Lars-Christian Simonsen",
		url: "https://lars-christian.com",
		rss: "https://lars-christian.com/feed/",
		mastodon: "lars@mastodon.social",
	},
	{
		title: "starbreaker",
		url: "https://starbreaker.org",
		rss: "https://starbreaker.org/feeds/recent.xml",
	},
	{
		title: "Lou Plummer",
		url: "https://amerpie.lol",
		rss: "https://amerpie.lol/feed.xml",
		mastodon: "amerpie@social.lol",
	},
	{
		title: "Ric Wood",
		url: "https://grislyeye.com",
		rss: "https://grislyeye.com/rss.xml",
		mastodon: "grislyeye@indieweb.social",
	},
	{
		title: "Mayank",
		url: "https://www.mayank.co",
		rss: "https://www.mayank.co/blog/rss.xml",
		mastodon: "hi_mayank@hachyderm.io",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title)
})

export default blogroll

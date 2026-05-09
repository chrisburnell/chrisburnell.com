const navigation = [
	{
		title: "Home",
		url: "/",
		icon: `<img width="20" height="20" src="/images/raven.svg" alt="chrisburnell.com logo of a blue raven" role="presentation">`,
		footer: true,
	},
	{
		title: "Search",
		url: "/search/",
		icon: `<svg width="20" height="20" aria-hidden="true" focusable="false"><use href="#svg--search"></use></svg>`,
		footer: true,
	},
	{
		title: `<span class=" [ canada ] ">About</span>`,
		url: "/about/",
		rel: "me",
		header: true,
	},
	{
		title: "Explore",
		url: "/explore/",
		icon: `<i class="fas fa-binoculars"></i>`,
		header: true,
		footer: true,
	},
	{
		title: "Posts",
		url: "/posts/",
		icon: `<i class="fas fa-newspaper"></i>`,
		header: true,
		footer: true,
	},
	{
		title: "Projects",
		url: "/projects/",
		icon: `<i class="fas fa-server"></i>`,
		header: true,
		footer: true,
	},
	{
		title: "Style Guide",
		url: "/styleguide/",
		icon: `<i class="fas fa-palette"></i>`,
		footer: true,
	},
	{
		title: `<span class=" [ canada ] ">CV</span>`,
		url: "/cv/",
		icon: `<i class="fas fa-address-book"></i>`,
		footer: true,
	},
	{
		title: "Privacy Policy",
		url: "/privacy/",
		icon: `<i class="fas fa-user-lock"></i>`,
		footer: true,
	},
];

export default navigation;

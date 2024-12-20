import { metadata } from "chrisburnell";

export * from "chrisburnell/src/metadata.js";

export const firstname = "Chris";
export const lastname = "Burnell";
export const shortname = "chrisburnell";
export const role = "Front End Developer";
export const nationality = "Canadian";
export const email = "me@chrisburnell.com";
export const avatar = "/images/avatar@4x.jpeg";
export const description = `I’m <span class=" [ canada ] ">${metadata.name}</span> <button id="name" class=" [ anchor  small ] [ js-name-button  no-feed ] " title="Hear my name read aloud" tabindex="-1">/<span title="'k' in 'kind'">k</span><span title="'r' in 'rye'">r</span><span title="'i' in 'rabbit'">ɪ</span><span title="'s' in 'sigh'">s</span> <span title="'b' in 'buy'">b</span><span title="/ɜːr/: 'ur' in 'fur'">ɜːr</span><span title="/ˈ/: primary stress follows">ˈ</span><span title="'n' in 'nigh'">n</span><span title="/ɛ/: 'e' in 'dress'">ɛ</span><span title="'l' in 'lie'">l</span>/</button> (${metadata.pronouns}), a <span class="p-job-title">${role}</span> / Software Engineer living in <a href="https://www.openstreetmap.org/#map=13/44.6463/-63.6162" class=" [ canada ] [ p-locality ] ">Halifax, Canada</a>. I’m often found <a href="/projects/">rabbit hole deep-diving</a>. This is where I think, write, and share my passion for front end development and the web.`;
export const pgp_styled = metadata.pgp.replace(
	/(.{4})/g,
	`<span style="margin-inline-end: 1ex;">$1</span>`,
);

export const _employer = {
	title: "",
	role: "",
	url: "",
};

export default Object.assign({}, metadata, {
	firstname,
	lastname,
	shortname,
	role,
	nationality,
	email,
	avatar,
	description,
	pgp_styled,
	_employer,
});

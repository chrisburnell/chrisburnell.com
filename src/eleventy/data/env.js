import dotenv from "dotenv";
dotenv.config({ quiet: true });

export default {
	GENERATE_OG_IMAGES: process.env.GENERATE_OG_IMAGES,
};

import dotenv from "dotenv";
dotenv.config({ quiet: true });

export default {
	DEV_MODE: process.env.DEV_MODE,
	GENERATE_OG_IMAGES: process.env.GENERATE_OG_IMAGES,
};

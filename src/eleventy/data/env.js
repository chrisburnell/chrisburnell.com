import dotenv from "dotenv"
dotenv.config()

export default {
	DIRECTORY_OUTPUT: process.env.DIRECTORY_OUTPUT,
	GENERATE_OG_IMAGES: process.env.GENERATE_OG_IMAGES,
	PREGENERATE_IMAGES: process.env.PREGENERATE_IMAGES,
}

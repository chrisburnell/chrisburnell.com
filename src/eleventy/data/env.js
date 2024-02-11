import dotenv from "dotenv"
dotenv.config()

export default {
	DIRECTORY_OUTPUT: process.env.DIRECTORY_OUTPUT,
	PREGENERATE_IMAGES: process.env.PREGENERATE_IMAGES,
}

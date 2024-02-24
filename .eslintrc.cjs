module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"no-process-env": 0,
	}
}

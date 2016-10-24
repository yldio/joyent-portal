.PHONY: test
test:
	# npm run test

.PHONY: install
install:
	yarn

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

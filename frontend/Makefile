.PHONY: test
test:
	npm run test

.PHONY: install
install:
	npm install --quiet --no-spin

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

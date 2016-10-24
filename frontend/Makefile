include ../tools/node-install.mk

.PHONY: test
test:
	npm run test

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

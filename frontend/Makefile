.PHONY: install
install:
	yarn install --prefer-offline

.PHONY: install-production
install-production: compile clean
	yarn install --production --pure-lockfile --prefer-offline

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: test
test:
	npm run test

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

.PHONY: start
start:
	npm run production

.PHONY: lint
lint:
	@$(shell npm bin)/eslint src

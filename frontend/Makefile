.PHONY: install
install:
	yarn install --prefer-offline

.PHONY: install-production
install-production: compile clean
	yarn install --production --pure-lockfile --prefer-offline

.PHONY: clean
clean:
	@rm -rf node_modules

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc

.PHONY: test
test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(TEST_ARGS)

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

.PHONY: start
start:
	yarn run production

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint .

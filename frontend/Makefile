NAME := $(lastword $(subst /, ,$(CURDIR)))

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc

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
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(TEST_ARGS)

XUNIT_DIR := ${CIRCLE_TEST_REPORTS}/tap-xunit
XUNIT_ARGS := -t | $(bindir)/tap-xunit >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME).xml
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(XUNIT_ARGS)

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

.PHONY: start
start:
	yarn run production

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint .

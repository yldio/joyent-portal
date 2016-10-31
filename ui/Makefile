NAME := $(lastword $(subst /, ,$(CURDIR)))
PORT=8080

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc
SERVE := $(bindir)/http-server

.PHONY: test
test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(TEST_ARGS)

XUNIT_DIR := ${CIRCLE_TEST_REPORTS}/tap-xunit
XUNIT_ARGS := -t | $(bindir)/tap-xunit >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME).xml
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(XUNIT_ARGS)

.PHONY: install-embed-markdown-loader
install-embed-markdown-loader:
	cd webpack/embed-markdown-loader
	yarn install --prefer-offline

.PHONY: install
install: install-embed-markdown-loader
	yarn install --prefer-offline

.PHONY: start
start:
	$(bindir)/webpack-dev-server --config webpack/index.js
	
.PHONY: install-production
install-production: compile clean
	yarn install --pure-lockfile --prefer-offline

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint .

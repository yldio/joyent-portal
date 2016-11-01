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
XUNIT := $(bindir)/tap-xunit
XUNIT_OUTPUT := >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME)
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js -t | $(XUNIT) $(XUNIT_OUTPUT).xml

.PHONY: install-embed-markdown-loader
install-embed-markdown-loader:
	cd webpack/embed-markdown-loader && yarn install --prefer-offline

.PHONY: install
install: install-embed-markdown-loader
	yarn install --prefer-offline

.PHONY: start
start:
	$(bindir)/webpack-dev-server --config webpack/index.js --host 0.0.0.0

.PHONY: install-production
install-production: install

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

.PHONY: build
build:
	docker build -t quay.io/yldio/joyent-dashboard-$(NAME) .

.PHONY: push
push:
	docker push quay.io/yldio/joyent-dashboard-$(NAME)

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf webpack/embed-markdown-loader/node_modules

.PHONY: lint
lint:
	$(bindir)/eslint .

.PHONY: lint-ci
lint-ci:
	mkdir -p $(XUNIT_DIR)
	-$(bindir)/eslint . --format tap | $(XUNIT) $(XUNIT_OUTPUT)-lint.xml

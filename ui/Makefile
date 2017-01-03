NAME := $(lastword $(subst /, ,$(CURDIR)))
PORT=8080

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc
SERVE := $(bindir)/http-server

.PHONY: test
test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=test $(NYC) $(AVA) test/*.js $(TEST_ARGS)

XUNIT_DIR := ${CIRCLE_TEST_REPORTS}/tap-xunit
XUNIT := $(bindir)/tap-xunit
XUNIT_OUTPUT := >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME)
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	BABEL_DISABLE_CACHE=1 NODE_ENV=test $(NYC) $(AVA) test/*.js -t | $(XUNIT) $(XUNIT_OUTPUT).xml

.PHONY: install-embed-markdown-loader
install-embed-markdown-loader:
	cd docs/webpack/embed-markdown-loader && yarn install --prefer-offline

.PHONY: install-docs
install-docs:
	cd docs && yarn install --prefer-offline

.PHONY: install
install: install-embed-markdown-loader
	yarn install --prefer-offline

.PHONY: start
start:
	# $(bindir)/st -p $(PORT) -H 0.0.0.0 -d static --no-dot -i index.html
	$(bindir)/start-storybook -p 8080

.PHONY: install-production
install-production: compile clean
	yarn install --production --pure-lockfile --prefer-offline

.PHONY: compile
compile: install
	$(bindir)/babel src --out-dir dist --source-maps inline

.PHONY: build
build:
	docker build -t quay.io/yldio/joyent-dashboard-$(NAME) .

.PHONY: push
push: publish
	docker push quay.io/yldio/joyent-dashboard-$(NAME)

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf webpack/embed-markdown-loader/node_modules

.PHONY: lint
lint:
	$(bindir)/eslint .
#	-$(bindir)/stylelint './src/components/**/*.js'

.PHONY: lint-ci
lint-ci:
	mkdir -p $(XUNIT_DIR)
	-$(bindir)/eslint . --format tap | $(XUNIT) $(XUNIT_OUTPUT)-lint.xml

.PHONY: publish
publish:
	docker build --build-arg NPM_TOKEN=${NPM_TOKEN} --build-arg CIRCLE_BUILD_NUM=${CIRCLE_BUILD_NUM} -f Dockerfile.build .

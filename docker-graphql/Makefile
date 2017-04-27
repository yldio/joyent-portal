NAME := $(lastword $(subst /, ,$(CURDIR)))

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc

.PHONY: install
install:
	yarn install --prefer-offline

.PHONY: install-production
install-production:
	yarn install --production --pure-lockfile --prefer-offline

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: test
test:
	$(AVA) $(TEST_ARGS)

XUNIT_DIR := ${CIRCLE_TEST_REPORTS}/tap-xunit
XUNIT := $(bindir)/tap-xunit
XUNIT_OUTPUT := >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME)
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	$(NYC) $(AVA) -t | $(XUNIT) $(XUNIT_OUTPUT).xml

.PHONY: start
start:
	yarn run start

.PHONY: build
build:
	docker build -t quay.io/yldio/joyent-dashboard-$(NAME):$(CIRCLE_BRANCH) .

.PHONY: push
push:
	docker push quay.io/yldio/joyent-dashboard-$(NAME)

.PHONY: lint
lint:
	$(bindir)/eslint .

.PHONY: lint-ci
lint-ci:
	mkdir -p $(XUNIT_DIR)
	-$(bindir)/eslint . --format tap | $(XUNIT) $(XUNIT_OUTPUT)-lint.xml

.PHONY: licence-check
licence-check:
	../node_modules/.bin/license-to-fail ../licence.js

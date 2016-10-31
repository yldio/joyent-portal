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
XUNIT_ARGS := -t | $(bindir)/tap-xunit >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME).xml
.PHONY: test-ci
test-ci:
	mkdir -p $(XUNIT_DIR)
	$(NYC) $(AVA) $(XUNIT_ARGS)

.PHONY: start
start:
	yarn run start

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint src

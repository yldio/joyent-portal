bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc

.PHONY: test
test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(TEST_ARGS)

.PHONY: install
install:
	yarn install --prefer-offline

.PHONY: install-production
install-production:
	yarn install --production --pure-lockfile --prefer-offline

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint .

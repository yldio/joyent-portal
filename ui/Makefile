PORT=8080
bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc
ST := $(bindir)/st

.PHONY: test
test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/*.js $(TEST_ARGS)

.PHONY: install-embed-markdown-loader
install-embed-markdown-loader:
	cd webpack/embed-markdown-loader
	yarn install --prefer-offline

.PHONY: install
install: install-embed-markdown-loader
	yarn install --prefer-offline

.PHONY: start
start:
	$(ST) -p $(PORT) -d src/ --no-dot -a 7200000
	
.PHONY: install-production
install-production: install-embed-markdown-loader
	yarn install --pure-lockfile --prefer-offline

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint .

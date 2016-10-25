.PHONY: test
test:
	yarn run test

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
	@$(shell npm bin)/eslint src

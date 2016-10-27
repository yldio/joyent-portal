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
	$(shell yarn bin)/ava $(TEST_ARGS)

.PHONY: start
start:
	yarn run start

.PHONY: lint
lint:
	@$(shell yarn bin)/eslint src

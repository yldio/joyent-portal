.PHONY: check
check:
	@./bin/setup.sh

.PHONY: test-cloudapi-graphql
test-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql test

.PHONY: test
test: test-cloudapi-graphql

.PHONY: install-cloudapi-graphql
install-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql install

.PHONY: install
install: install-cloudapi-graphql

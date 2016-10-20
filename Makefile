.PHONY: check
check:
	@./bin/setup.sh

.PHONY: test-cloudapi-graphql
test-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql test

.PHONY: test-frontend
test-frontend:
	$(MAKE) -C frontend test

.PHONY: test
test: test-cloudapi-graphql test-frontend

.PHONY: install-cloudapi-graphql
install-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql install

.PHONY: install-frontend
install-frontend:
	$(MAKE) -C frontend install

.PHONY: install
install: install-cloudapi-graphql install-frontend

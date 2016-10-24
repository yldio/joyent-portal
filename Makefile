.PHONY: check
check:
	@./bin/setup

.PHONY: test-cloudapi-graphql
test-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql test

.PHONY: test-frontend
test-frontend:
	$(MAKE) -C frontend test

.PHONY: test-ui
test-ui:
	$(MAKE) -C ui test

.PHONY: test
test: test-cloudapi-graphql test-frontend test-ui

.PHONY: install-cloudapi-graphql
install-cloudapi-graphql:
	$(MAKE) -C cloudapi-graphql install

.PHONY: install-frontend
install-frontend:
	$(MAKE) -C frontend install

.PHONY: install-ui
install-ui:
	$(MAKE) -C ui install

.PHONY: install-backend
install-backend:
	$(MAKE) -C backend install

.PHONY: install
install: install-cloudapi-graphql install-frontend install-backend install-ui

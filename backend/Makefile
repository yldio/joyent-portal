include ../tools/node-install.mk

FRONTEND = "../frontend"

.PHONY: install
install:
	yarn install

.PHONY: install-production
install-production:
	yarn install --production --pure-lockfile

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: test
test:
	@echo "No tests for backend"

.PHONY: app-install
app-install:
	$(MAKE) -C $(FRONTEND) copy

install: app-install

.PHONY: start
start:
	npm run start

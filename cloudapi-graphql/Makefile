include ../tools/node-install.mk

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
	./node_modules/.bin/ava

.PHONY: start
start:
	npm run start

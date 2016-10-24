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
	./node_modules/.bin/ava

.PHONY: start
start:
	npm run start

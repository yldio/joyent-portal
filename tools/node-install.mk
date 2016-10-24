.PHONY: install
install:
	yarn install

.PHONY: install-production
install-production:
	yarn install --production --pure-lockfile

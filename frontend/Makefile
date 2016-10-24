include ../tools/node-install.mk

BACKEND = "../backend/static"

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
	npm run test

.PHONY: compile
compile: install
	NODE_ENV=production ./node_modules/.bin/webpack --config webpack/index.js

# I'm not sure this is the best idea, let's see how this works out for us
# and then go with something better once we find pain points
.PHONY: copy
copy: compile
	@cp -r static/* $(BACKEND)

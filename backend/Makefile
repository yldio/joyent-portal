.PHONY: test
test:
	./node_modules/.bin/ava

.PHONY: install
install:
	yarn
	$(MAKE) compile-frontent

# I'm not sure this is the best idea, let's see how this works out for us
# and then go with something better once we find pain points
.PHONY: compile-frontent
compile-frontent:
	$(MAKE) -C ../frontend compile
	cp -r ../frontend/static/* ./static

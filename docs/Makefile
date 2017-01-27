NAME := $(lastword $(subst /, ,$(CURDIR)))
# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = PrototypeJoyentPortal
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: build
build:
	docker build -t quay.io/yldio/joyent-dashboard-$(NAME) .

.PHONY: push
push:
	docker push quay.io/yldio/joyent-dashboard-$(NAME)
	
.PHONY: test
test:

.PHONY: test-ci
test-ci:

.PHONY: install
install: 

.PHONY: start
start:

.PHONY: install-production
install-production: 

.PHONY: clean
clean:

.PHONY: lint
lint:

.PHONY: lint-ci
lint-ci:

.PHONY: licence-check
lint-ci:

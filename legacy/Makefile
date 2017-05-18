.PHONY: check
check:
	@yarn install --prefer-offline
	-@./bin/setup

.PHONE: licence
licence:
	./node_modules/.bin/license-to-fail ./licence.js
	make licence-check

SUBDIRS := $(dir $(wildcard */Makefile))
TARGETS := install clean test test-ci lint lint-ci licence-check# whatever else, but must not contain '/'

# foo/.all bar/.all foo/.clean bar/.clean
SUBDIRS_TARGETS := \
	$(foreach t,$(TARGETS),$(addsuffix $t,$(SUBDIRS)))

.PHONY: $(TARGETS) $(SUBDIRS_TARGETS)

# static pattern rule, expands into:
# all clean: %: foo/.% bar/.%
$(TARGETS): %: $(addsuffix %,$(SUBDIRS))
	@echo 'Done "$*" target'

# here, for foo/.all:
#   $(@D) is foo
#   $(@F) is .all, with leading period
#   $(@F:.%=%) is just all
$(SUBDIRS_TARGETS):
	$(MAKE) --no-print-directory -C $(@D) $(@F:.%=%)

DIFF := $(lastword $(subst /, ,${CIRCLE_COMPARE_URL}))
CHANGED_FILES := $(subst /, , $(dir $(shell git diff --name-only $(DIFF))))
CHANGES := $(patsubst %, %/, $(sort $(filter $(subst /, ,$(SUBDIRS)), $(CHANGED_FILES))))
.PHONY: diff
diff:
	echo $(CHANGES)

BUILDS := build push

# foo/.all bar/.all foo/.clean bar/.clean
BUILDS_TARGETS := \
	$(foreach t,$(BUILDS),$(addsuffix $t,$(CHANGES)))

.PHONY: $(BUILDS) $(BUILDS_TARGETS)

# static pattern rule, expands into:
# all clean: %: foo/.% bar/.%
$(BUILDS): %: $(addsuffix %,$(CHANGES))
	@echo 'Done "$*" target'

# here, for foo/.all:
#   $(@D) is foo
#   $(@F) is .all, with leading period
#   $(@F:.%=%) is just all
$(BUILDS_TARGETS):
	$(MAKE) --no-print-directory -C $(@D) $(@F:.%=%)

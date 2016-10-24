.PHONY: check
check:
	@./bin/setup

SUBDIRS := $(shell find -maxdepth 2 -mindepth 2 -name 'Makefile' -printf '%h/.\n')
TARGETS := clean install test # whatever else, but must not contain '/'

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
	$(MAKE) -C $(@D) $(@F:.%=%)

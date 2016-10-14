SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail
.PHONY: check

check:
	@./bin/setup.sh

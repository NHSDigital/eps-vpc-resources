.PHONY: install build test publish release clean lint compile

install: install-node install-python install-hooks

install-python:
	poetry install

install-node:
	npm ci

install-hooks: install-python
	poetry run pre-commit install --install-hooks --overwrite

compile-node:
	npx tsc --build tsconfig.build.json

compile: compile-node

lint-node: compile-node
	npm run lint --workspace packages/cdk


lint: lint-node

test:
	@$(MAKE) compile

clean:
	rm -rf packages/cdk/coverage
	rm -rf packages/cdk/lib
	rm -rf cdk.out

deep-clean: clean
	rm -rf .venv
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +


cdk-synth:
	CDK_APP_NAME=VpcResourcesApp \
	CDK_CONFIG_versionNumber=undefined \
	CDK_CONFIG_commitId=undefined \
	CDK_CONFIG_isPullRequest=false \
	CDK_CONFIG_environment=dev \
	CDK_CONFIG_LOG_RETENTION_IN_DAYS=30 \
	CDK_CONFIG_FORWARD_CSOC_LOGS=false \
	npm run cdk-synth --workspace packages/cdk/

%:
	@$(MAKE) -f /usr/local/share/eps/Mk/common.mk $@

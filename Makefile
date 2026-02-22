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

test: compile
	npm run test --workspace packages/cdk

clean:
	rm -rf packages/cdk/coverage
	rm -rf packages/cdk/lib
	rm -rf cdk.out

deep-clean: clean
	rm -rf .venv
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +


cdk-deploy:
	REQUIRE_APPROVAL="$${REQUIRE_APPROVAL:-any-change}" && \
	VERSION_NUMBER="$${VERSION_NUMBER:-undefined}" && \
	COMMIT_ID="$${COMMIT_ID:-undefined}" && \
		npx cdk deploy \
		--app "npx ts-node --prefer-ts-exts packages/cdk/bin/VpcResourcesApp.ts" \
		--all \
		--ci true \
		--require-approval $${REQUIRE_APPROVAL} \
		--context accountId=$$ACCOUNT_ID \
		--context VERSION_NUMBER=$$VERSION_NUMBER \
		--context COMMIT_ID=$$COMMIT_ID \
		--context stackName=$$stack_name \
		--context logRetentionInDays=30

cdk-synth:
	npx cdk synth \
		--quiet \
		--app "npx ts-node --prefer-ts-exts packages/cdk/bin/VpcResourcesApp.ts" \
		--context accountId=undefined \
		--context commitId=undefined \
		--context logRetentionInDays=30 \
		--context stackName=vpc-resources \
		--context versionNumber=undefined \
		--context commitId=undefined
cdk-diff:
	npx cdk diff \
		--app "npx ts-node --prefer-ts-exts packages/cdk/bin/VpcResourcesApp.ts" \
		--context serviceName=$$service_name \
		--context accountId=$$ACCOUNT_ID \
		--context VERSION_NUMBER=$$VERSION_NUMBER \
		--context COMMIT_ID=$$COMMIT_ID \
		--context logRetentionInDays=$$LOG_RETENTION_IN_DAYS \
		--context stackName=$$stack_name

cdk-watch:
	REQUIRE_APPROVAL="$${REQUIRE_APPROVAL:-any-change}" && \
	VERSION_NUMBER="$${VERSION_NUMBER:-undefined}" && \
	COMMIT_ID="$${COMMIT_ID:-undefined}" && \
		npx cdk deploy \
		--app "npx ts-node --prefer-ts-exts packages/cdk/bin/VpcResourcesApp.ts" \
		--watch \
		--all \
		--ci true \
		--require-approval $${REQUIRE_APPROVAL} \
		--context accountId=$$ACCOUNT_ID \
		--context stackName=$$stack_name \
		--context VERSION_NUMBER=$$VERSION_NUMBER \
		--context COMMIT_ID=$$COMMIT_ID \
		--context logRetentionInDays=$$LOG_RETENTION_IN_DAYS

%:
	@$(MAKE) -f /usr/local/share/eps/Mk/common.mk $@

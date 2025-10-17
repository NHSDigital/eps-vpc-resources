#!/usr/bin/env bash
set -e

# script used to set context key values in cdk.json pre deployment from environment variables

# helper function to set string values
fix_string_key() {
    KEY_NAME=$1
    KEY_VALUE=$2
    if [ -z "${KEY_VALUE}" ]; then
        echo "${KEY_NAME} value is unset or set to the empty string"
        exit 1
    fi
    echo "Setting ${KEY_NAME}"
    jq \
        --arg key_value "${KEY_VALUE}" \
        --arg key_name "${KEY_NAME}" \
        '.context += {($key_name): $key_value}' .build/cdk.json > .build/cdk.new.json
    mv .build/cdk.new.json .build/cdk.json
}

# helper function to set boolean and number values (without quotes)
fix_boolean_number_key() {
    KEY_NAME=$1
    KEY_VALUE=$2
    if [ -z "${KEY_VALUE}" ]; then
        echo "${KEY_NAME} value is unset or set to the empty string"
        exit 1
    fi
    echo "Setting ${KEY_NAME}"
    jq \
        --argjson key_value "${KEY_VALUE}" \
        --arg key_name "${KEY_NAME}" \
        '.context += {($key_name): $key_value}' .build/cdk.json > .build/cdk.new.json
    mv .build/cdk.new.json .build/cdk.json
}

CFN_DRIFT_DETECTION_GROUP="vpc-resources"
if [[ "$STACK_NAME" =~ -pr-[0-9]+$ ]]; then
  CFN_DRIFT_DETECTION_GROUP="vpc-resources-pull-request"
fi

# go through all the key values we need to set
fix_string_key accountId "${ACCOUNT_ID}"
fix_string_key stackName "vpc-resources"
fix_string_key versionNumber "${VERSION_NUMBER}"
fix_string_key commitId "${COMMIT_ID}"
fix_string_key cfnDriftDetectionGroup "${CFN_DRIFT_DETECTION_GROUP}"
fix_boolean_number_key logRetentionInDays "${LOG_RETENTION_IN_DAYS}"
fix_boolean_number_key forwardCsocLogs "${FORWARD_CSOC_LOGS}"

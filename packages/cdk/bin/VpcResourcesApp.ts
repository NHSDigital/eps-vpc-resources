import {createApp, getBooleanConfigFromEnvVar, getNumberConfigFromEnvVar} from "@nhsdigital/eps-cdk-constructs"
import {VpcResourcesStack} from "../stacks/VpcResourcesStack"

async function main() {
  const {app, props} = createApp({
    productName: "Account Resources",
    appName: "AccountResourcesApp",
    repoName: "electronic-prescription-service-account-resources",
    driftDetectionGroup: "account-resources"
  })

  const availabilityZones = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]
  const logRetentionInDays = getNumberConfigFromEnvVar("LOG_RETENTION_IN_DAYS")
  const forwardCsocLogs = getBooleanConfigFromEnvVar("FORWARD_CSOC_LOGS")

  new VpcResourcesStack(app, "VpcResourcesStack", {
    ...props,
    stackName: "vpc-resources",
    availabilityZones: availabilityZones,
    logRetentionInDays: logRetentionInDays,
    forwardCsocLogs: forwardCsocLogs
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

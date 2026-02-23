import {createApp, getBooleanConfigFromEnvVar, getNumberConfigFromEnvVar} from "@nhsdigital/eps-cdk-constructs"
import {VpcResourcesStack} from "../stacks/VpcResourcesStack"
import {addCfnGuardMetadata} from "./utils/appUtils"

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

  const VpcResources = new VpcResourcesStack(app, "VpcResourcesStack", {
    ...props,
    stackName: "vpc-resources",
    availabilityZones: availabilityZones,
    logRetentionInDays: logRetentionInDays,
    forwardCsocLogs: forwardCsocLogs
  })
  // run a synth to add custom resource lambdas and roles
  app.synth()

  addCfnGuardMetadata(VpcResources, "Custom::VpcRestrictDefaultSGCustomResourceProvider", "Handler")
  addCfnGuardMetadata(VpcResources, "AWS679f53fac002430cb0da5b7982bd2287", "Resource")

  // finally run synth again with force to include the added metadata
  app.synth({
    force: true
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

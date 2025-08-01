import {App, Aspects, Tags} from "aws-cdk-lib"
import {AwsSolutionsChecks} from "cdk-nag"

import {VpcResourcesStack} from "../stacks/VpcResourcesStack"
import {addCfnGuardMetadata} from "./utils/appUtils"

const app = new App()
/* Required Context:
  - logRetentionInDays
*/

const accountId = app.node.tryGetContext("accountId")
const stackName = app.node.tryGetContext("stackName")
const version = app.node.tryGetContext("versionNumber")
const commit = app.node.tryGetContext("commitId")
const cfnDriftDetectionGroup = app.node.tryGetContext("cfnDriftDetectionGroup")

/* when getAz's is called behind the scenes it only returns the first 2 when the stack is account/region agnostic.
  Allow AZ's to be passed as context otherwise explicitly use the 3 in eu-west-2. */
const availabilityZones = app.node.tryGetContext("AVAILABILITY_ZONES") || ["eu-west-2a", "eu-west-2b", "eu-west-2c"]

// add cdk-nag to everything
Aspects.of(app).add(new AwsSolutionsChecks({verbose: true}))

Tags.of(app).add("accountId", accountId)
Tags.of(app).add("stackName", stackName)
Tags.of(app).add("version", version)
Tags.of(app).add("commit", commit)
Tags.of(app).add("cdkApp", "VpcResourcesApp")
Tags.of(app).add("repo", "eps-vpc-resources")
Tags.of(app).add("cfnDriftDetectionGroup", cfnDriftDetectionGroup)

const VpcResources = new VpcResourcesStack(app, "VpcResourcesStack", {
  env: {
    region: "eu-west-2"
  },
  stackName: "vpc-resources",
  version: version,
  availabilityZones: availabilityZones
})

// run a synth to add custom resource lambdas and roles
app.synth()

addCfnGuardMetadata(VpcResources, "Custom::VpcRestrictDefaultSGCustomResourceProvider", "Handler")
addCfnGuardMetadata(VpcResources, "AWS679f53fac002430cb0da5b7982bd2287", "Resource")

// finally run synth again with force to include the added metadata
app.synth({
  force: true
})

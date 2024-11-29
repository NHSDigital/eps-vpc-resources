import {App, Aspects, Tags} from "aws-cdk-lib"
import {AwsSolutionsChecks} from "cdk-nag"

import {VpcResourcesStack} from "../stacks/VpcResourcesStack"
import {addCfnGuardMetadata} from "./utils/appUtils"

const app = new App()
/* Required Context:
  - logRetentionInDays
*/

const version = app.node.tryGetContext("VERSION_NUMBER")
const commit = app.node.tryGetContext("COMMIT_ID")

// add cdk-nag to everything
Aspects.of(app).add(new AwsSolutionsChecks({verbose: true}))

Tags.of(app).add("version", version)
Tags.of(app).add("commit", commit)
Tags.of(app).add("cdkApp", "VpcResourcesApp")

const VpcResources = new VpcResourcesStack(app, "VpcResourcesStack", {
  env: {
    region: "eu-west-2"
  },
  stackName: "vpc-resources",
  version: version
})

// run a synth to add custom resource lambdas and roles
app.synth()

addCfnGuardMetadata(VpcResources, "Custom::VpcRestrictDefaultSGCustomResourceProvider", "Handler")

// finally run synth again with force to include the added metadata
app.synth({
  force: true
})

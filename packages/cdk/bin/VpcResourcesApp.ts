import {App, Aspects, Tags} from "aws-cdk-lib"
import {AwsSolutionsChecks} from "cdk-nag"

import {VpcResourcesStack} from "../stacks/VpcResourcesStack"

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

new VpcResourcesStack(app, "VpcResourcesStack", {
  env: {
    region: "eu-west-2"
  },
  stackName: "vpc-resources",
  version: version
})

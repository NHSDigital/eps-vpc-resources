
import {Stack} from "aws-cdk-lib"
import {NagPackSuppression, NagSuppressions} from "cdk-nag"

export const nagSuppressions = (stack: Stack) => {
  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/ECRDockerEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/AWS679f53fac002430cb0da5b7982bd2287/ServiceRole/Resource",
    [
      {
        id: "AwsSolutions-IAM4",
        reason: "Suppress error for using AWS managed policy. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/AWS679f53fac002430cb0da5b7982bd2287/Resource",
    [
      {
        id: "AwsSolutions-L1",
        reason: "Suppress error for using not using latest runtime. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/ECREndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/SecretManagerEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/CloudWatchEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/CloudWatchLogsEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/CloudWatchEventsEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/SSMEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/S3Endpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/LambdaEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

}

const safeAddNagSuppression = (stack: Stack, path: string, suppressions: Array<NagPackSuppression>) => {
  try {
    NagSuppressions.addResourceSuppressionsByPath(stack, path, suppressions)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(err){
    console.log(`Could not find path ${path}`)
  }
}

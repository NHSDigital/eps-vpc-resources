
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

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/apiGatewayEndpoint-tags/CustomResourcePolicy/Resource",
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/ECRDockerEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/ECREndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/SecretManagerEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/CloudWatchEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/CloudWatchLogsEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/CloudWatchEventsEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/SSMEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/LambdaEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
      }
    ]
  )

  safeAddNagSuppression(
    stack,
    "/VpcResourcesStack/vpc/apiGatewayEndpoint/SecurityGroup/Resource",
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for lack of CDK validation of supplied open CIDR being that of VPC. This is fine here. \
        See https://github.com/cdklabs/cdk-nag/issues/817"
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

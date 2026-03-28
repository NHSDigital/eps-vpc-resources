
import {Stack} from "aws-cdk-lib"
import {safeAddNagSuppression, safeAddNagSuppressionGroup} from "@nhsdigital/eps-cdk-constructs"

export const nagSuppressions = (stack: Stack) => {
  safeAddNagSuppressionGroup(
    stack,
    [
      "/VpcResourcesStack/ECRDockerEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/ECREndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/SecretManagerEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/CloudWatchEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/CloudWatchLogsEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/CloudWatchEventsEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/SSMEndpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/S3Endpoint-tags/CustomResourcePolicy/Resource",
      "/VpcResourcesStack/LambdaEndpoint-tags/CustomResourcePolicy/Resource"
    ],
    [
      {
        id: "AwsSolutions-IAM5",
        reason: "Suppress error for wildcard permissions. This is fine here"
      },
      {
        id: "EpsNagPack-EPS10",
        reason: "Suppress error for inline policy. This is fine here"
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

  safeAddNagSuppressionGroup(
    stack,
    [
      "/VpcResourcesStack/vpc/LambdaEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/SSMEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/CloudWatchEventsEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/CloudWatchLogsEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/CloudWatchEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/SecretManagerEndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/ECREndpoint/SecurityGroup/Resource",
      "/VpcResourcesStack/vpc/ECRDockerEndpoint/SecurityGroup/Resource"

    ],
    [
      {
        id: "AwsSolutions-EC23",
        reason: "Suppress error for warnings as it gets values from intrinsic functions"
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

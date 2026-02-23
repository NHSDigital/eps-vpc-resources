
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

}

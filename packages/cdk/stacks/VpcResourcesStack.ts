import {
  App,
  CfnOutput,
  CfnResource,
  Fn,
  RemovalPolicy,
  Stack,
  StackProps
} from "aws-cdk-lib"
import {
  CfnSubnet,
  FlowLogDestination,
  IpAddresses,
  Vpc
} from "aws-cdk-lib/aws-ec2"
import {Role, ServicePrincipal} from "aws-cdk-lib/aws-iam"
import {Key} from "aws-cdk-lib/aws-kms"
import {LogGroup} from "aws-cdk-lib/aws-logs"

export interface VpcResourcesStackProps extends StackProps{
  readonly version: string
}

/**
 * EPS VPC Resources

 */

export class VpcResourcesStack extends Stack {
  public constructor(scope: App, id: string, props: VpcResourcesStackProps){
    super(scope, id, props)

    // Context
    /* context values passed as --context cli arguments are passed as strings so coerce them to expected types*/
    const logRetentionInDays: number = Number(this.node.tryGetContext("logRetentionInDays"))

    // Imports
    const cloudwatchKmsKey = Key.fromKeyArn(
      this, "cloudwatchKmsKey", Fn.importValue("account-resources:CloudwatchLogsKmsKeyArn"))

    // Resources
    const flowLogsRole = new Role(this, "VpcFlowLogsRole", {
      assumedBy: new ServicePrincipal("vpc-flow-logs.amazonaws.com")
    })

    const flowLogsLogGroup = new LogGroup(this, "VpcFlowLogsLogGroup", {
      logGroupName: `/aws/vpc/${props.stackName}-vpc-flow-logs`,
      retention: logRetentionInDays,
      encryptionKey: cloudwatchKmsKey,
      removalPolicy: RemovalPolicy.DESTROY
    })

    const vpc = new Vpc(this, "vpc", {
      ipAddresses: IpAddresses.cidr("10.190.0.0/16"),
      enableDnsSupport: true,
      enableDnsHostnames: true,
      maxAzs: 3,
      flowLogs: {
        "FlowLogCloudwatch": {
          destination: FlowLogDestination.toCloudWatchLogs(flowLogsLogGroup, flowLogsRole)
        }
      }
    })

    // Add cfn-guard suppressions
    for (const subnet of vpc.publicSubnets) {
      const cfnSubnet = subnet.node.defaultChild as CfnSubnet
      cfnSubnet.cfnOptions.metadata = {
        guard:
        {
          SuppressedRules:[
            "SUBNET_AUTO_ASSIGN_PUBLIC_IP_DISABLED"
          ]
        }
      }

      const cfnSubnetAsChild = vpc.node.tryFindChild(subnet.node.id) as CfnResource
      const cfnDefaultRoute = cfnSubnetAsChild.node.tryFindChild("DefaultRoute") as CfnResource
      cfnDefaultRoute.cfnOptions.metadata = {
        guard:
        {
          SuppressedRules:[
            "NO_UNRESTRICTED_ROUTE_TO_IGW"
          ]
        }
      }
    }

    //Outputs

    //Exports
    new CfnOutput(this, "VpcID", {
      value: vpc.vpcId,
      exportName: `${props.stackName}:VpcId`
    })

    let publicSubnetIds = []
    for (const [i, subnet] of vpc.publicSubnets.entries()){
      const subnetIdentifier = String.fromCharCode("A".charCodeAt(0) + i)
      new CfnOutput(this, `PublicSubnet${subnetIdentifier}`, {
        value: subnet.subnetId,
        exportName: `${props.stackName}:PublicSubnet${subnetIdentifier}`
      })
      publicSubnetIds.push(subnet.subnetId)
    }

    let privateSubnetIds = []
    for (const [i, subnet] of vpc.publicSubnets.entries()){
      const subnetIdentifier = String.fromCharCode("A".charCodeAt(0) + i)
      new CfnOutput(this, `PrivateSubnet${subnetIdentifier}`, {
        value: subnet.subnetId,
        exportName: `${props.stackName}:PrivateSubnet${subnetIdentifier}`
      })
      privateSubnetIds.push(subnet.subnetId)
    }

    new CfnOutput(this, "PublicSubnets", {
      value: publicSubnetIds.join(","),
      exportName: `${props.stackName}:PublicSubnets`
    })

    new CfnOutput(this, "PrivateSubnets", {
      value: privateSubnetIds.join(","),
      exportName: `${props.stackName}:PrivateSubnets`
    })

  }
}

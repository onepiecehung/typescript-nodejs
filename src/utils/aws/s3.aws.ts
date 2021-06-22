import AWS from "aws-sdk";

import { AWS_C } from "@config/aws.config";

AWS.config.update({
    region: AWS_C.REGION,
    signatureVersion: "v4",
    accessKeyId: AWS_C.ACCESS_KEY,
    secretAccessKey: AWS_C.SECRET_KEY,
});

const options = {
    signatureVersion: "v4",
    region: AWS_C.REGION, // same as your bucket
    endpoint: new AWS.Endpoint(AWS_C.ACCELERATED_ENDPOINT),
    useAccelerateEndpoint: true,
};

const client = new AWS.S3(options);

class AWSc {
    public Bucket: string;
    public Key: string;
    public Expires: number;
    public ACL: string;
    public params: any;

    constructor(userId?: string, type: string = "avatar") {
        this.Bucket = AWS_C.BUCKET;
        this.Key = AWS_C.KEY || "avatar.png";
        this.Expires = parseInt(`${AWS_C.EXPIRED_TIME}`);
        this.ACL = AWS_C.ACL;
        this.params = {
            Bucket: this.Bucket,
            Key: `${type}/${userId}.png`,
            Expires: this.Expires, // 10 mins
            // ACL: this.ACL,
        };
    }

    public async generatePresignedUrl() {
        return new Promise((resolve, reject) => {
            client.getSignedUrl("putObject", this.params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    public uploadToS3 = async (
        fileData: Buffer,
        fileName: string,
        contentType: any
    ) => {
        // setting up s3 upload parameters
        const params = {
            Bucket: AWS_C.BUCKET,
            Key: fileName, // file name you want to save as
            Body: fileData,
            // ACL: "public-read",
            ContentType: contentType,
        };
        // Uploading files to the bucket
        const data = await client.upload(params).promise();
        return data.Location;
    };

    public removeFileS3 = async (key: string) => {
        // setting up s3 upload parameters
        const params = {
            Bucket: AWS_C.BUCKET,
            Key: key, // file name you want to save as
            // ACL: "public-read",
        };
        client.deleteObject(params, (err, data) => {
            if (err) return false;
            // an error occurred
            else return true; // successful response
        });
        return true;
    };

    public deleteFilesS3 = async (Bucket: string, objectKeys: object[]) => {
        try {
            const params: any = {
                Bucket,
                Delete: {
                    Objects: objectKeys,
                    Quiet: false,
                },
            };

            return new Promise((resolve, reject) => {
                client.deleteObjects(params, (err, data) => {
                    if (err) return reject(err);
                    return resolve(data);
                });
            });
        } catch (error) {
            throw new Error("remove files from S3 error");
        }
    };
}

export default AWSc;

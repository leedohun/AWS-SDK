//DaARA variable
const ACCESS_KEY_ID     = "****************"
const SECRET_ACCESS_KEY = "********************************"
const REGION            = "**-*********-*"

const BUCKET_NAME       = "***********"
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
//AWS config, S3
const AWS = require('aws-sdk') //AWS-SDK 모듈 사용
AWS.config.update({region:REGION});
const s3 = new AWS.S3({ // S3 Bucket authenticate
  accessKeyId     : ACCESS_KEY_ID,
  secretAccessKey : SECRET_ACCESS_KEY,
  region          : REGION
});
const config = new AWS.Config({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION
})
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
//S3 Bucket Get Oject
async function getOjectFromS3() {
  try {
    const data = await s3.listObjects({ Bucket : BUCKET_NAME }).promise();
    return data
  } catch (err) {
    console.log("Error", err);
    return;
  }
}
getOjectFromS3()

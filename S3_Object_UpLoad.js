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
//Local 캡처 본 S3에 업로드
  var file = "file_path";
 
  const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
 
    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME, // S3 Bucket Name
      Key: 'S3 Bucket에 올라가는 이름', // File name you want to save as in S3
      Body: fileContent // file info
    };
 
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
      if (err) {
        throw err;
      }
    });
  };
  uploadFile(file);
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------

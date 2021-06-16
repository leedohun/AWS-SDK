//DaARA variable
const ACCESS_KEY_ID     = "****************"
const SECRET_ACCESS_KEY = "********************************"
const REGION            = "**-*********-*"

const BUCKET_NAME       = "***********"

const photo_source      = 'source Bucket image Name'
const photo_target      = 'target Bucket image Name'
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
const params = { // Bucket 안에 있는 두 개의 이미지 
  SourceImage: {
    S3Object: {
      Bucket: BUCKET_NAME,
      Name: photo_source
    },
  },
  TargetImage: {
    S3Object: {
      Bucket: BUCKET_NAME,
      Name: photo_target
    },
  },
  SimilarityThreshold: 95
}
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
client.compareFaces(params, function(err, response) { //Bucket에서 선택된 두 개의 이미지를 비교 분석
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    response.FaceMatches.forEach(data => {
      let position   = data.Face.BoundingBox
      let similarity = data.Similarity
      console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
    }) // for response.faceDetails
  } // if
});
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
const params_2 = { // Bucket 안에 있는 이미지 감정 분석
  Image: {
    S3Object: {
      Bucket: BUCKET_NAME,
      Name: photo_source
    },
  },
  Attributes: ['ALL']
}

client.detectFaces(params_2, function(err, response) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } 
  else {
    response.FaceDetails.forEach(data => {
      let low  = data.AgeRange.Low
      let high = data.AgeRange.High
      console.log(`The detected face is between: ${low} and ${high} years old`)
      console.log("All other attributes:")
      console.log(`  Age.Range.Low:          ${data.AgeRange.Low}`)
      console.log(`  Age.Range.High:         ${data.AgeRange.High}`)
      console.log(`  Smile.Value:            ${data.Smile.Value}`)
      console.log(`  Smile.Confidence:       ${data.Smile.Confidence}`)
      console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
      console.log(`  Emotions[0].Confidence: ${data.Emotions[0].Confidence}`)
      console.log("------------")
      console.log("")
    }) // for response.faceDetails
  } // if
});



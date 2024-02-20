const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports.getFeed = async (req, res) => {
  try {
    const params = {
      Bucket: 'serverless',
      Key: 'serverless-state.json'
    };
    console.log(s3.config)
    const data = await s3.getObject(params).promise();
    const jobs = JSON.parse(data.Body.toString());
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

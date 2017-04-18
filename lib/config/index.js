'use strict';

/* EXPORTS CONFIG OBJECT */
module.exports = {
  port: process.env.PORT || 5080,
  wkhtmltopdf_path: (process.env.NODE_ENV === 'production' ? './bin/wkhtmltopdf-linux-amd64' : 'wkhtmltopdf'),
  AWS: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    S3: {
      bucket: process.env.AWS_S3_BUCKET,
      url: process.env.AWS_S3_BUCKET ? `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/` : null
    }
  },
  google: {
    key: process.env.GOOGLE_API_KEY
  },
  vimeo: {
    key: process.env.VIMEO_API_KEY
  },
  path: './temp/',
  resumePath: 'resume/',
  originURL: process.env.ORIGIN_URL,
  options: {
    cleanAfter: (process.env.NODE_ENV !== 'development')
    // cleanAfter: true
  }
};

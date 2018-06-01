const application = {
    TIME_ZONE: 'Asia/Colombo',
    TIME_FORMAT: 'DD-MM-YYYY hh:mm',
    SESSION_KEY: '234324b2iu34i23b4i23bi32b4'
  };

const BODYPARSER = {
    JSON: {
      limit: '50mb'
    },
    URLENCODED: {
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    }
  };
  
export {
    application,
    BODYPARSER
}
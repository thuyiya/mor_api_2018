import { APP } from '../../config';

export default (router) => {
  router.route('/').get(function (req, res) {
    res.status(200).json({ code: 2000, message: APP.name + ' api version' + APP.version });
  });

  router.route('/register').get(function(req, res){
    res.send("Hello Resgister!")
  });


  return router;
};

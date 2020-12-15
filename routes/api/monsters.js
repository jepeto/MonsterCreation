const router = require('express').Router();
const fs = require('fs');
var mexp = require('math-expression-evaluator');

router.post('/create', (req, res) => {
  const { body: { level } } = req;
  // console.log(level);

  fs.readFile('assets/monster-types.json', (err, data) => {
    if (err) throw err;
    let response = [];
    let mTypes = JSON.parse(data);
    var mNames = Object.keys(mTypes);
    for (var i = 0; i < mNames.length; i++) {
      let monster = mTypes[mNames[i]];
      let mStats = Object.keys(monster);
      mStats.forEach(stat => {
        let sStat = String(monster[stat])
        monster[stat] = mexp.eval(sStat.replace('L', level));
        let perc = (5 + Math.random() * 10) / 100
        monster[stat] += Math.round((perc * monster[stat]))
      });
      monster.name = mNames[i];
      response.push(monster);
    }
    // console.log(mTypes.dragon);
    // res.json(mTypes)
    res.json(response)
  });
});


//GET current route (required, only authenticated users have access)
router.get('/results', (req, res, next) => {

});

module.exports = router;
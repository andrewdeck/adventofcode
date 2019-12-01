const Sequelize = require('sequelize');
const vasync = require('vasync');

const sequelize = new Sequelize('sqlite::memory:');

vasync.pipeline({
  arg: {},
  funcs: [
    function createTable(arg, fin) {
      sequelize.query(`CREATE TABLE lorem (info TEXT)`).asCallback(fin);
    },
    function createRows(arg, fin) {
      let query = `INSERT INTO lorem (info)
      VALUES('1'),
            ('2'),
            ('3'),
            ('4'),
            ('5'),
            ('6'),
            ('7'),
            ('8'),
            ('9')
      `;
      sequelize.query(query).asCallback(fin);
    },
    function getRows(arg, fin) {
      sequelize.query(`SELECT rowid AS id, info FROM lorem`).asCallback((err, rows) => {
        if(err) fin(err);
        else {
          console.log(rows[0]);
          fin();
        }
      });
    }
  ]
}, exit);




function exit(err) {
  if(err) console.error(err);
  process.exit(err?1:0);
}
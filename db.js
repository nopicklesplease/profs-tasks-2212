const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/profs_tasks_db');
const { UUID, UUIDV4, STRING } = Sequelize;

const Task = conn.define('task', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false

  }
});


module.exports = {
  conn,
  Task
};

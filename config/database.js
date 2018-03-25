module.exports = {
  database: "mongodb://localhost:27017/deployment-backend", //dev
	secret: process.env.SECRET || "yoursecret",
	SALT_WORK_FACTOR: 10
};

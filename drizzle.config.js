/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-app_owner:vZQh0nB6XgJs@ep-sparkling-thunder-a5nulhb1.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
  
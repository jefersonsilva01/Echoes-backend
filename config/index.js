require("dotenv").config();
const MongoStore = require("connect-mongo");
const session = require("express-session");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

const allowedOrigins = [
  "https://echoes-frontend-ten.vercel.app",
  "http://echoes-frontend-ten.vercel.app",
  "https://echoes-frontend-git-main-jeferson-silvas-projects-069690ac.vercel.app",
  "http://echoes-frontend-git-main-jeferson-silvas-projects-069690ac.vercel.app",
  "http://localhost:3000"
]

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  // app.use(cors());

  app.use(
    cors({
      credentials: true,
      // origin: [FRONTEND_URL]
      // origin: allowedOrigins
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/echoes",
      }),
      cookie: {
        secure: true,
        // secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  app.use(logger('dev'));
  app.use(cookieParser());
};
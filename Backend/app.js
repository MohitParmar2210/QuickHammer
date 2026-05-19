// import dotenv from "dotenv";
// dotenv.config({ path: "./config/config.env" });
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// //import { connection } from "./databse/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// //import userRoutes  from "./routes/user.js";
// import userRouter from "./router/userRoutes.js";
// import auctionItemRouter from "./router/auctionItemRoutes.js";
// //import auctionItemRouter from "./router/auctionItemRoutes.js";
// import bidRouter from "./router/bidRoutes.js";
// import commissionRouter from "./router/commissionRouter.js";
// import superAdminRouter from "./router/superAdminRoutes.js";
// import { endedAuctionCron } from "./automation/endedAuctionCron.js";
// import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

// const app=express();
// // config({
// //       path:"./.env"
// // })
// app.use(
//       cors({
//         origin: [process.env.FRONTEND_URL],
//         methods: ["POST", "GET", "PUT", "DELETE"],
//         credentials: true,
//       })
//     );
 
    

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//       fileUpload({
//             useTempFiles:true,
//             tempFileDir:"/tmp",

//       })
// );
// app.use("/api/v1/user",userRouter);
// app.use("/api/v1/auctionitem",auctionItemRouter);
// app.use("/api/v1/bid", bidRouter);
// app.use("/api/v1/commission", commissionRouter);
// app.use("/api/v1/superadmin", superAdminRouter);

// endedAuctionCron();
// verifyCommissionCron();
// //connection();
// app.use(errorMiddleware)
// export default app;
 






import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { errorMiddleware } from "./middlewares/error.js";

import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import superAdminRouter from "./router/superAdminRoutes.js";

import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();

/* ---------------- CORS FIX (IMPORTANT PART) ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-hammer-three.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Blocked by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// preflight request fix
app.options("*", cors());

/* ---------------- MIDDLEWARES ---------------- */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

/* ---------------- ROUTES ---------------- */

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

/* ---------------- CRONS ---------------- */

endedAuctionCron();
verifyCommissionCron();

/* ---------------- ERROR HANDLER ---------------- */

app.use(errorMiddleware);

export default app;
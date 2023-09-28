import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import commentRouter from './routes/comments.js';
import likeRouter from './routes/likes.js';
import authRouter from './routes/auth.js';
import relationshipRouter from './routes/relationship.js';
import multer from 'multer';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/auth", authRouter);
app.use("/api/relationships", relationshipRouter);

app.listen(8000, () => {
    console.log("Server running on port:8000...");
});
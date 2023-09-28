import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [userId], (err, data) => {
        if (err) res.status(500).json(err);
        res.status(200).json(data);
    });
};

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated...");

    jwt.verify(token, 'jwtKey', (err, userInfo) => {
        if (err) return res.status(403).json("Not valid token...");
        
        const q = "UPDATE users SET `name` = ?, `city` = ?, `website` = ?, `coverPic` = ?, `profilePic` = ? WHERE id = ?"
        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id
        ], (err, data) => {
            if (err) res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("User Profile has been updated...");
            return res.status(403).json("You can update only your post...");
        });
    });
};
import express from 'express';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authRoute = express.Router();
dotenv.config();

const passwordSecretKey: string = process.env.PASS_SECRET_KEY as string;
const jwtSecretKey: string = process.env.JWT_SECRET_KEY as string;

// register
authRoute.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      passwordSecretKey
    ).toString()
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
authRoute.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      passwordSecretKey
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== req.body.password) {
      res.status(401).json({ message: 'Wrong password' });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      jwtSecretKey,
      { expiresIn: '3d' }
    );
    const { password, ...others } = user.toObject();
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default authRoute;

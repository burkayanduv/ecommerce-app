import express from 'express';
import dotenv from 'dotenv';
import User from '../models/User';
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../middlewares';

const userRoute = express.Router();
dotenv.config();

const passwordSecretKey: string = process.env.PASS_SECRET_KEY as string;

// update
userRoute.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      passwordSecretKey
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete
userRoute.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all users
userRoute.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().limit(5).sort({ _id: -1 })
      : await User.find();
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user.toObject();
      return others;
    });
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user stats
userRoute.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear
          }
        }
      },
      {
        $project: {
          month: {
            $month: '$createdAt'
          }
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user
userRoute.get('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user.toObject();
    res.status(200).json(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default userRoute;

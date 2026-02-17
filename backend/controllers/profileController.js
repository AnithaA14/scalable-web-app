import User from '../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, user: user.toProfile() });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updateData = {};
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
    res.json({ success: true, user: user.toProfile() });
  } catch (error) {
    next(error);
  }
};

export const getPublicProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    const { _id, firstName, lastName, bio, createdAt } = user;
    res.json({ success: true, user: { _id, firstName, lastName, bio, createdAt } });
  } catch (error) {
    next(error);
  }
};
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/userModel.js";
import { uploadFile } from "../utils/cloudinary.js";

const createUser = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json(new ApiResponse(400, {}, "Please provide name"));
    }
    const avatarFile = req.file
    if (!avatarFile) {
        res.status(400).json(new ApiResponse(400, {}, "Please provide an avatar"))
    }
    
    // upload images
    const avatarURL = await uploadFile(avatarFile)
    if (!avatarURL) {
        res.status(500).json(new ApiResponse(500, {}, "Something went wrong while uploading avatar"))
    }

    const createdUser = await User.create({ name, avatar: avatarURL });

    const user = await User.findById(createdUser._id)

    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

const listUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

const topUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 }).limit(10);
    res.status(200).json(new ApiResponse(200, users, "Top users fetched successfully"));
});

export {
    createUser,
    listUsers,
    topUsers
}
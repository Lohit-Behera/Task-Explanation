import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Point } from "../models/pointModel.js";
import { User } from "../models/userModel.js";

const addPoints = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    console.log(randomPoints);
    
    if (!userId) {
        return res.status(400).json(new ApiResponse(400, {}, "Please provide userId"));
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const createdPoint = await Point.create({ user: userId, points: randomPoints });

    const point = await Point.findById(createdPoint._id)
    if (!point) {
        return res.status(404).json(new ApiResponse(404, {}, "Point not found"));
    }

    user.totalPoints += point.points;
    await user.save( { validateBeforeSave: false });
    res.status(201).json(new ApiResponse(201, {}, "Point created successfully"));
});

export { addPoints };
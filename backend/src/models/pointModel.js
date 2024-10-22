import mongoose, { Schema } from "mongoose";

const pointSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        points: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export const Point = mongoose.model("Point", pointSchema)
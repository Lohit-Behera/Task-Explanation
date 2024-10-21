import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        totalPoints: {
            type: Number,
            required: true,
            default: 0
        },
        avatar: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);
userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema)
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Tour",
        },
        username: {
            type: String,
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            default: 5,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
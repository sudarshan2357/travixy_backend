import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
    const { username, reviewText, rating } = req.body;
    const tourId = req.params.tourId;

    // Check if rating is provided
    if (rating == null) {
        return res.status(400).json({
            success: false,
            message: "Rating is required",
        });
    }

    const newReview = new Review({ username, reviewText, rating });

    try {
        const savedReview = await newReview.save();

        // After creating a new review, update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id },
        });

        res.status(201).json({
            success: true,
            message: "Review Submitted",
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed! Try again",
        });
    }
};


import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: {
        type: String,
        enum: ["up", "down"],
        default: "up"
    },
    lastChecked: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default mongoose.models.Server || mongoose.model("Server", serverSchema);
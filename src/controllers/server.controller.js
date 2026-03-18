import Server from "../models/server.model.js";

export const addServer = async (req, res) => {
    try {
        const { name, url } = req.body;

        const server = await Server.create({
            name,
            url,
            createdBy: req.user._id
        });
        res.json({ message: "Server added successfully", server });

    } catch (error) {
        res.status(500).json({ message: "Failed to add server", error: error.message });
    }
}

// get all servers for the logged-in user

export const getServers = async (req, res) => {
    try {
        const servers = await Server.find({ createdBy: req.user._id });
        res.json(servers);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch servers", error: error.message });
    }
}

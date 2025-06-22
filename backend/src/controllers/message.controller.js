import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, video, audio, file, filename } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl, videoUrl, audioUrl, fileUrl;

    // Upload image if present
    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image, {
    //     resource_type: "image",
    //   });
    //   imageUrl = uploadResponse.secure_url;
    // }
    if (image) {
  try {
    if (!image.startsWith("data:image/")) {
      throw new Error("Invalid image base64 format.");
    }
    const uploadResponse = await cloudinary.uploader.upload(image, {
      resource_type: "image",
    });
    imageUrl = uploadResponse.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    return res.status(400).json({ error: "Image upload failed: " + err.message });
  }
}


    // Upload video if present
    if (video) {
      const uploadResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
      });
      videoUrl = uploadResponse.secure_url;
    }

    // Upload audio if present
    if (audio) {
      const uploadResponse = await cloudinary.uploader.upload(audio, {
        resource_type: "video", // Cloudinary uses 'video' type for audio as well
      });
      audioUrl = uploadResponse.secure_url;
    }

    // Upload file if present
    if (file) {
      try {
        console.log("Uploading file:", filename);
        const safeFileName = filename?.replace(/[^a-zA-Z0-9-_]/g, "_");
        const upload = await cloudinary.uploader.upload(file, {
          resource_type: "raw",
          public_id: safeFileName,
        });
        fileUrl = upload.secure_url;
        console.log("File uploaded to:", fileUrl);
      } catch (err) {
        console.error("File upload error:", err.message);
        return res.status(400).json({ error: "File upload failed: " + err.message });
      }
    }


    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
      audio: audioUrl,
      file: fileUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

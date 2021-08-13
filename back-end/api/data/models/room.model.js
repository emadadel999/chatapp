const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  senderName: { type: Schema.Types.String, ref: "User", required: true },
  isSent: { type: Boolean },
  sentDate: { type: Date },
  isDelivered: { type: Boolean },
  deliveredDate: { type: Date },
  isRead: { type: Boolean },
  readDate: { type: Date },
});

const roomSchema = new Schema({
  roomName: String,
  roomType: String,
  messages: [messageSchema],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

model("Room", roomSchema);

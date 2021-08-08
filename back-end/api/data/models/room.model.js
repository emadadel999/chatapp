const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recieverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sentDate: { type: Date },
  deliveredDate: { type: Date },
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

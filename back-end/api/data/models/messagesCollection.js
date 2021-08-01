const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recieverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //roomId
  sentDate: { type: Date },
  deliveredDate: { type: Date },
  readDate: { type: Date },
});

model("Message", messageSchema);

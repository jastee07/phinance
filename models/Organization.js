const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  budgets: [
    {
      title: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      revenue: {
        type: Boolean,
        default: false
      },
      transactions: [
        {
          title: {
            type: String,
            required: true
          },
          amount: {
            type: Number,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          },
          description: {
            type: String,
            required: false
          }
        }
      ]
    }
  ]
});

module.exports = Organization = mongoose.model(
  "organizations",
  OrganizationSchema
);

const mongoose = require('mongoose');

const mongoose = require('mongoose');

// Define the schema for auction items
const auctionItemSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',                                    // Reference to the User model for the seller
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reservePrice: {
        type: Number,
        required: true,
        min: 0              // Ensure reserve price is non-negative
    },
    auctionStartDate: {
        type: Date,
        required: true
    },
    auctionEndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.auctionStartDate; // Validate end date is after start date
            },
            message: 'Auction end date must be after start date'
        }
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    visibilityDuration: {
        value: {
            type: Number,
            required: true,
            min: 1                                      // Minimum value for duration
        },
        unit: {
            type: String,
            required: true,
            enum: ['minutes', 'hours', 'days']          // Allowed units for visibility duration
        }
    },
});

// Create a model for auction items using the schema
const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);
module.exports = AuctionItem;

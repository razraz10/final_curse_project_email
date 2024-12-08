const mongoose = require('mongoose')

const massageSchema = new mongoose.Schema({
    from: {
        type: String,
        require: true
    },
    fromIsActive:{
        type:Boolean,
        default:true
    },
    to: {
        type: [String],
        require: true
    },
    title: {
        type: String,
        require: true
    },
    massageBody: {
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    status: [
        {
            to: String,
            isRead: {
                type: Boolean,
                default: false
            }
        }
    ],
    isActive: [
        {
            to: String,
            active: {
                type: Boolean,
                default: true
            }
        }
    ]
})

massageSchema.pre('save', function (next) {
    const message = this;

    // Populate status and isActive arrays based on the to array
    message.to.forEach((recipient) => {
        message.status.push({ to: recipient });
        message.isActive.push({ to: recipient });
    });

    next();
});

const massageModel = mongoose.model('massage', massageSchema)
module.exports = massageModel

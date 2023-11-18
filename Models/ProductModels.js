const mongoose  = require('mongoose')
const express = require('express')
const app = express()
const UserSchema = mongoose.Schema(
    {
            FirstName:{
                type: String,
                required: true
            },
            LastName:{
                type: String,
                required: true
            },
            Email:{
                type: String,
                required: true
            },
            Password:{
                type: String,
                required: true
            },
    },
    {
        timestamps: true
    }
)

const userDetails=  mongoose.model('userDetails', UserSchema)
module.exports = userDetails


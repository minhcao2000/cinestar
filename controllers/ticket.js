const { json } = require("express")
const Ticket = require("../models/ticket")
const Seat = require("../models/seat")

module.exports.addTicket = async (req, res, next) => {
    try {
        const { User_ID, Seat_IDs } = req.body;
        console.log(Seat_IDs)

        const ticket = await Ticket.create({
            User_ID, Seat_IDs
        })

        Seat_IDs.map(async (s, i) => await Seat.findOneAndUpdate({ _id: s }, { State: "True" }))


        return res.json({
            status: true,
            ticket
        })

    } catch (err) {
        next(err);
    }
}

module.exports.getAllTickets = async (req, res, next) => {
    try {
        const { User_ID } = req.body
        const tickets = await Ticket.find({ User_ID }).populate({
            path: "Seat_IDs", populate: {
                path: 'Show_ref',
                populate: {
                    path: "Movie"
                }
            }
        })
        
        return res.json({
            status: true,
            tickets
        })

    } catch (err) {
        next(err);
    }
}
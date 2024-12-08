const massages = [
    {
        title: "Greetings",
        from: "jfohn.doe@example.com",
        to: ["jane.smith@gmail.com", "robert.johnson@example.com"],
        massageBody: "Message 1: This is a sample message from jfohn.doe@example.com.",
        createdDate: new Date("2022-01-01")
    },
    {
        title: "Weekend Plans",
        from: "jane.smith@gmail.com",
        to: ["robert.johnson@example.com", "emily.davis@gmail.com"],
        massageBody: "Message 2: This is a sample message from jane.smith@gmail.com.",
        createdDate: new Date("2022-02-15")
    },
    {
        title: "Check-In",
        from: "robert.johnson@example.com",
        to: ["emily.davis@gmail.com", "michael.clark@example.com"],
        massageBody: "Message 3: This is a sample message from robert.johnson@example.com.",
        createdDate: new Date("2022-03-10")
    },
    {
        title: "Afternoon Chat",
        from: "emily.davis@gmail.com",
        to: ["michael.clark@example.com", "samantha.baker@gmail.com"],
        massageBody: "Message 4: This is a sample message from emily.davis@gmail.com.",
        createdDate: new Date("2022-04-20")
    },
    {
        title: "Positive Vibes",
        from: "michael.clark@example.com",
        to: ["samantha.baker@gmail.com", "david.harris@example.com"],
        massageBody: "Message 5: This is a sample message from michael.clark@example.com.",
        createdDate: new Date("2022-05-05")
        
    },
    {
        title: "Greetings",
        from: "samantha.baker@gmail.com",
        to: ["david.harris@example.com", "isabel.young@gmail.com"],
        massageBody: "Message 6: This is a sample message from samantha.baker@gmail.com.",
        createdDate: new Date("2022-06-15")
    },
    {
        title: "Quick Update",
        from: "david.harris@example.com",
        to: ["isabel.young@gmail.com", "alex.miller@gmail.com"],
        massageBody: "Message 7: This is a sample message from david.harris@example.com.",
        createdDate: new Date("2022-07-01")
    },
    {
        title: "Hello Friends",
        from: "isabel.young@gmail.com",
        to: ["alex.miller@gmail.com", "daniel.garcia@example.com"],
        massageBody: "Message 8: This is a sample message from isabel.young@gmail.com.",
        createdDate: new Date("2022-08-10")
    },
    {
        title: "Any News?",
        from: "alex.miller@gmail.com",
        to: ["daniel.garcia@example.com", "sophia.perez@gmail.com"],
        massageBody: "Message 9: This is a sample message from alex.miller@gmail.com.",
        createdDate: new Date("2022-09-20")
    },
    {
        title: "Wishing You Well",
        from: "daniel.garcia@example.com",
        to: ["sophia.perez@gmail.com", "ethan.taylor@example.com"],
        massageBody: "Message 10: This is a sample message from daniel.garcia@example.com.",
        createdDate: new Date("2022-10-05")
      
    },
    // Additional messages
    // Add your new messages here
];



// require('dotenv').config();
// const db = require('./db')
// db.connect()
// const massageModel = require('./massage.model');

// async function create(data) {
//     return massageModel.create(data)
// }
// const go = async ()=>{
//     let res = await create(massages)
//     console.log(res);
//     if (res) console.log("Add data to DB - success");
//   }
//   go()
// module.exports = massages

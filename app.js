const fs  = require("fs")

const moment = require("moment")
const sequelize = require("./database/sql_database")
const BlankSim = require("./database/sql_models").BlankSim

const input_file = `${__dirname}/input_dir/input_file.lst`
const processed_file = `${__dirname}/processed_dir/${moment().format("YYYYMMDDHHmmss")}-input_file.lst`


sequelize.sync({

}).then(() =>{
    console.log("Mysql DB successfully connected")
    fs.readFile(input_file,{encoding:'utf-8'},async (err, data) => {
        if (err) throw err
        const dataArray = data.trim().split("\n");
        let counter=0
        for (const row of dataArray) {
            let tempArray =row.split(",")
            let [iccid, imsi,authkeys,Opc] = tempArray
            try {
                await BlankSim.create({
                    iccid,
                    imsi,
                    Opc,
                    authkeys
                })
                counter++
            } catch (ex) {
                console.log("Db insertion failed for:",imsi, iccid)
                console.log(ex)
            }


        }

        console.log("=========================================")
        console.log(`Total sims successfully loaded => ${counter}`)
        console.log("=========================================")

        fs.rename(input_file,processed_file,err1 => {
            if (err1) console.log("Error in moving file",err1)

        })
    })

}).catch(error =>{
    console.log("Unable to connect to Mysql DB")
    console.log(error)

})

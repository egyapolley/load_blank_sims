const Sequelize = require("sequelize");

const sequelize = require("./sql_database");


const BlankSim = sequelize.define("blank_sim", {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },

    msisdn: {
        type:Sequelize.STRING,
        allowNull: true,

    },

    status: {
        type:Sequelize.STRING,
        allowNull: true,
        defaultValue: "AVAILABLE"

    },



    iccid: {
        type:Sequelize.STRING,
        unique:true,
        allowNull: false,

    },

    authkeys: {
        type:Sequelize.STRING,
        unique:true,
        allowNull: false,

    },

    Opc: {
        type:Sequelize.STRING,
        allowNull: true,
    },

    imsi: {
        type:Sequelize.STRING,
        unique:true,
        allowNull: false,

    },


});


module.exports = {BlankSim}


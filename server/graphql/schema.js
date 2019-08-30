const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Vehicle {
    id: ID,
    registrationNumber: String,
    reportingTime: Date,
    inTime: Date,
    outTime: Date,
    vehicleType: String,
    loadedWeight: Int,
    unloadedWeight: Int,
    entryCondition: Int,
    driverCondition: Int,
    comments: String,
    loadedCondition: Int,
    unloadedCondition: Int,
    wheelsSecured: Int,
    safetyJacket: Int,
    safetyHelmet: Int,
    safetyInstructions: Int,
    numberPlateImg: String,
    frontImg: String,
    backImg: String,
    rightImg: String,
    leftImg: String,
    driverName: String
    driverPhone: Int,
    driverLicense: String
  }
  type Query {
  	vehicles: [Vehicle]
  }
`

module.exports = typeDefs

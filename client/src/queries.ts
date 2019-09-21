import { gql } from 'apollo-boost'

export const GET_VEHICLES = gql`
  query Vehicles {
    vehicles {
      backImg
      comments
      driverCondition
      driverLicense
      driverName
      driverPhone
      entryCondition
      frontImg
      id
      inTime
      leftImg
      loadedCondition
      loadedWeight
      numberPlateImg
      outTime
      registrationNumber
      reportingTime
      rightImg
      safetyHelmet
      safetyInstructions
      safetyJacket
      unloadedCondition
      unloadedWeight
      vehicleType
      wheelsSecured
    }
  }
`

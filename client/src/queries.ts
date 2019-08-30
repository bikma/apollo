import { gql } from 'apollo-boost'

export const GET_VEHICLES = gql`
  query Vehicles {
    vehicles {
			id
			registrationNumber
			reportingTime
			inTime
			outTime
			vehicleType
			loadedWeight
			unloadedWeight
			entryCondition
			driverCondition
			comments
			loadedCondition
			unloadedCondition
			wheelsSecured
			safetyJacket
			safetyHelmet
			safetyInstructions
			numberPlateImg
			frontImg
			backImg
			rightImg
			leftImg
			driverName
			driverPhone
			driverLicense
    }
  }
`
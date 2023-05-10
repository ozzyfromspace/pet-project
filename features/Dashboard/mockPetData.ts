import { PetProfile } from "./Dashboard"

const profile = {
  name: "Oliver",
  dob: new Date("04/15/2016").toISOString(),
  sex: "MALE",
  species: "chihuahua",
} satisfies PetProfile

const mockPetData = {
  profile,
}

export default mockPetData

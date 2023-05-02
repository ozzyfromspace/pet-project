import DarkModeToggle from "../../components/DarkModeToggle"

const AuthHeader = () => {
  return (
    <header className="flex justify-between py-2">
      <h1 className="w-fit scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
        PetProject
      </h1>
      <DarkModeToggle />
    </header>
  )
}

export default AuthHeader

import DarkModeToggle from "../../components/DarkModeToggle"

const AuthHeader = () => {
  return (
    <header className="my-8 flex w-full justify-between pb-2">
      <h1 className="w-fit scroll-m-20 text-2xl font-normal tracking-tight transition-colors">
        PetProject
      </h1>
      <DarkModeToggle />
    </header>
  )
}

export default AuthHeader

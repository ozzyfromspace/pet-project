import DarkModeToggle from "../../components/DarkModeToggle"

const AuthHeader = () => {
  return (
    <header className="mx-auto my-2 flex w-full max-w-7xl justify-between px-4 pb-2">
      <h1 className="w-fit scroll-m-20 text-2xl font-normal tracking-tight transition-colors">
        PetProject
      </h1>
      <DarkModeToggle />
    </header>
  )
}

export default AuthHeader

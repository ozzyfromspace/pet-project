import { forwardRef, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { PetProfile } from "./Dashboard"

type DashboardProfileProps = {
  profile: PetProfile
}

const DashboardProfile = (props: DashboardProfileProps) => {
  const { profile } = props

  const { register } = useForm({
    defaultValues: profile,
  })

  return (
    <form>
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <Label htmlFor="name" className="flex items-center justify-end">
          Full Name
        </Label>
        <DashboardProfileInput {...register("name")} />
        <Label htmlFor="username" className="flex items-center justify-end">
          Birthdate
        </Label>
        <DateInput timestamp={profile.dob} />
        <Label htmlFor="username" className="flex items-center justify-end">
          Gender
        </Label>
        <GenderSelect />
        <Label htmlFor="username" className="flex items-center justify-end">
          Species
        </Label>
        <DashboardProfileInput {...register("species")} />
      </div>
    </form>
  )
}

export default DashboardProfile

type DateInputProps = {
  timestamp: string
}

function DateInput(props: DateInputProps) {
  const { timestamp } = props
  const [date, setDate] = useState<Date | undefined>(() =>
    timestamp ? new Date(timestamp) : undefined
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full max-w-sm justify-start text-left font-normal",
            date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function GenderSelect() {
  return (
    <Select>
      <SelectTrigger
        className={buttonVariants({
          variant: "outline",
          className:
            "flex max-w-sm cursor-pointer justify-between text-sm font-normal text-muted-foreground transition-colors duration-200 hover:text-gray-800 focus-visible:cursor-text focus-visible:text-gray-800 dark:hover:text-gray-50 dark:focus-visible:text-gray-50",
        })}
      >
        <SelectValue placeholder="Select a gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="apple">Male</SelectItem>
          <SelectItem value="banana">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const DashboardProfileInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        id="name"
        defaultValue="Pedro Duarte"
        className={buttonVariants({
          variant: "outline",
          className:
            "max-w-sm cursor-pointer text-sm font-normal text-muted-foreground transition-colors duration-200 hover:text-gray-800 focus-visible:cursor-text focus-visible:text-gray-800 dark:hover:text-gray-50 dark:focus-visible:text-gray-50",
        })}
        {...props}
      />
    )
  }
)

DashboardProfileInput.displayName = "DashboardProfileInput"

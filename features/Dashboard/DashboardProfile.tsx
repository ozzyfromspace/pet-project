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
        <Label htmlFor="fullname" className="flex items-center justify-end">
          Full Name
        </Label>
        <DashboardProfileInput id="fullname" {...register("fullname")} />
        <Label htmlFor="birthdate" className="flex items-center justify-end">
          Birthdate
        </Label>
        <DateInput id="birthdate" timestamp={profile.birthdate} />
        <Label htmlFor="gender" className="flex items-center justify-end">
          Gender
        </Label>
        <GenderSelect id="gender" />
        <Label htmlFor="species" className="flex items-center justify-end">
          Species
        </Label>
        <DashboardProfileInput {...register("species")} id="species" />
      </div>
    </form>
  )
}

export default DashboardProfile

type DateInputProps = {
  timestamp: string
  id?: string
}

function DateInput(props: DateInputProps) {
  const { timestamp, id } = props
  const [date, setDate] = useState<Date | undefined>(() =>
    timestamp ? new Date(timestamp) : undefined
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
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

type GenderSelectProps = {
  id?: string
}

function GenderSelect(props: GenderSelectProps) {
  const { id } = props

  return (
    <Select>
      <SelectTrigger
        id={id}
        aria-label="Select a gender"
        className={buttonVariants({
          variant: "outline",
          className:
            "flex cursor-pointer justify-between text-sm font-normal text-muted-foreground transition-colors duration-200 hover:text-gray-800 focus-visible:cursor-text focus-visible:text-gray-800 dark:hover:text-gray-50 dark:focus-visible:text-gray-50",
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
        className={buttonVariants({
          variant: "outline",
          className:
            "cursor-pointer text-sm font-normal text-muted-foreground transition-colors duration-200 hover:text-gray-800 focus-visible:cursor-text focus-visible:text-gray-800 dark:hover:text-gray-50 dark:focus-visible:text-gray-50",
        })}
        {...props}
      />
    )
  }
)

DashboardProfileInput.displayName = "DashboardProfileInput"

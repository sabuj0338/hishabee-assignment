/// <reference types="vite/client" />

type Population = {
  indicator: Indicator
  country: Country
  countryiso3code: string
  date: string
  value: number
  unit: string
  obs_status: string
  decimal: number
}

type Indicator = {
  id: string
  value: string
}

type Country = {
  id: string
  value: string
}
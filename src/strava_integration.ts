// Enable skipping dotenv for Github Actions
if (process.env.DOTENV !== 'false') { require('dotenv').config() }

const stravaToken = process.env.STRAVA_TOKEN
const stravaClientID = process.env.STRAVA_CLIENT_ID

const periods = []
const clubId = 278109 // No longer super relevant
const countedSportTypes = [
  // 'EBikeRide',
  // 'EMountainBikeRide',
  'GravelRide',
  'MountainBikeRide',
  'Ride',
  'VirtualRide',
  'Velomobile',
  'Wheelchair',
  'Handcycle'
]

// Useful things from the strava API docs:
// resource_state: indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
// moving_time: The activity's moving time, in seconds (if )
// start_date_local: The activity's start date, in "Local" format
// distance: The activity's distance, in meters
// total_elevation_gain: The activity's total elevation gain, in meters
// sport_type: instance of SportType

export async function makeGetRequest (endpoint: string, args: object = {}): Promise<object> {
  if (endpoint === 'club') { endpoint = `clubs/${clubId}` }

  const response = await fetch(`https://www.strava.com/api/v3/${endpoint}`, {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${stravaToken}`
    }
  })
  // .catch((e) => {
  //     if (e.response && e.response.headers) {
  //       limits = rateLimiting.updateRateLimits(e.response.headers)
  //     }

  //     return Promise.reject(e)
  //   })
  const jsonData = await response.json()
  return jsonData
}

export async function getUserList () {
  const endpoint = `clubs/${clubId}/members`
  const args = { per_page: 200 }
  const result = await makeGetRequest(endpoint, args)
  return result
}

// function userTotalsForPeriod(stravaId, period): Totals {

// }

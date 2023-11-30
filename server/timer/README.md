## Authorization

### Login

`[POST] http://localhost:3000/auth/login`

Method returns access token, that should be placed in Authorization header for further requests.
Access token expires in 7 days.
Place username and password in request body as follows:

`{"username": "test", "password": "1234"}`
!!! Content-type: application/json

Example response: 

`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTVlMTRhZDNiMzk2ODE3MjQ5Y2Q1MzEiLCJ1c2VybmFtZSI6Im5hc3R5YSIsImlhdCI6MTcwMTMzOTk2NCwiZXhwIjoxNzAxOTQ0NzY0fQ.fjfHUG0kLoTK5x6qOskwUAlfB-3VJsSvFLeUZFLVRVk"
}`

### Sign up

`[POST] http://localhost:3000/auth/signup`

!!! Content-type: application/json

Request body and response are the same as in login request.


## Timers 

To request timers you must have access token in Authorization header in format 'Bearer [your token]'.
Example of header:

`
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTVlMTRhZDNiMzk2ODE3MjQ5Y2Q1MzEiLCJ1c2VybmFtZSI6Im5hc3R5YSIsImlhdCI6MTcwMDY2NzE3NywiZXhwIjoxNzAxMjcxOTc3fQ.1ZAe6gwtZy-PjE-zac8wQIyn2ecMFD6hj80P5XyHyHg'
`

### All timers

`[GET] http://localhost:3000/timers`

Returns all timers data (1-minute = s, 5-minute = m, 25-minute = l). Arrays contain dates in number format.

Example response:

`
{
    "s": [
        1701342077936
    ],
    "m": [
        1701350193266,
        1701351148634
    ],
    "l": [
        1701351148634
    ]
}
`

### Timer data by type

`[GET] http://localhost:3000/timers/[timer_type]`

timer_type = s | m | l

Returns an array of dates for selected timer.

Example response: 
`
[
    1701342077936
]
`

### Add date for a timer

`[POST] http://localhost:3000/timers/[timer_type]`

You can add date for a selected type of timer. Place date in request body as follows:

`{"date": 1701351148634}`
!!! Content-type: application/json

Returns update result from typeOrm.
Example response: 

`
{
    "generatedMaps": [],
    "raw": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "affected": 1
}
`
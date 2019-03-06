import DotEnv from 'dotenv'

DotEnv.config({ path: '.env.test' })

global.AudioContext = jest.fn
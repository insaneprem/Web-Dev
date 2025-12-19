import express from 'express'
import { createClient } from 'redis'


const client = createClient()
await
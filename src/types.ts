import type { inferRouterOutputs } from '@trpc/server'
// import { z } from 'zod'
import type {AppRouter} from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;

type allCompaniesOutput = RouterOutputs['company']['getAllCompanies']
export type Company = allCompaniesOutput[number]
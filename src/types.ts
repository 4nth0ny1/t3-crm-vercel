import type { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'
import type {AppRouter} from './server/api/root'


type RouterOutputs = inferRouterOutputs<AppRouter>;

type allCompaniesOutput = RouterOutputs['company']['getAllCompanies']
export type Company = allCompaniesOutput[number]

type allCompanyNotesOutput = RouterOutputs['companyNote']['getAllNotes']
export type CompanyNote = allCompanyNotesOutput[number]

export const getAllNotes = z.object({
    companyId: z.string().cuid()
  })
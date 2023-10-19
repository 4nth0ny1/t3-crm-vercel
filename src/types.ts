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

type allContactsOutput = RouterOutputs['contact']['getAllContacts']
export type Contact = allContactsOutput[number]

export const getAllContacts = z.object({
    companyId: z.string().cuid()
  })

type allAttemptsOutput = RouterOutputs['attempt']['getAllAttempts']
export type Attempt = allAttemptsOutput[number]

export const getAllAttempts = z.object({
    contactId: z.string().cuid()
  })

type allContactNotesOutput = RouterOutputs['contactNote']['getAllContactNotes']
export type ContactNote = allContactNotesOutput[number]

export const getAllContactNotes = z.object({
    companyId: z.string().cuid()
  })

  type allOpportunitiesOutput = RouterOutputs['opportunity']['getAllOpportunities']
  export type Opportunity = allOpportunitiesOutput[number]
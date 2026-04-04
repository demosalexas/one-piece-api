import { NextResponse } from 'next/server'

import { supabase } from '@/supabase/client'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const limit = Number(url.searchParams.get('limit')) || 20

  const { 
    data, 
    error 
  } = await supabase
    .from('characters')
    .select('*, bounties(*)')
    .limit(limit)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
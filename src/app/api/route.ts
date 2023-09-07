import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'src')
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  // return NextResponse.json({
  //   fileContents
  // })
  return NextResponse.json({
    data: 'One Piece API comming soon!'
  })
}

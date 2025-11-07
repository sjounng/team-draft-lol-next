import { NextResponse } from 'next/server'

// Convert BigInt to string in objects for JSON serialization
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj

  if (typeof obj === 'bigint') {
    return obj.toString()
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt)
  }

  if (typeof obj === 'object') {
    const serialized: any = {}
    for (const key in obj) {
      serialized[key] = serializeBigInt(obj[key])
    }
    return serialized
  }

  return obj
}

export function successResponse<T>(data: T, status: number = 200) {
  const serialized = serializeBigInt(data)
  return NextResponse.json({ data: serialized }, { status })
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function notFoundResponse(message: string = 'Not found') {
  return NextResponse.json({ error: message }, { status: 404 })
}

export function serverErrorResponse(message: string = 'Internal server error') {
  return NextResponse.json({ error: message }, { status: 500 })
}

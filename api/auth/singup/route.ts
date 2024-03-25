import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcryptjs';
import prisma from 'src/utils/prisma'

export async function Post(req: Request) {
  try {
    const {  first_name, last_name, middle_name, email, password, hash } = await req.json()

    const isUserExisting = await prisma.users.findFirst({ where: { email } })
    if (isUserExisting) return new NextResponse("User Already Exists...!", { status: 422 })

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    await prisma.users.create({
        data: {
            email,
            first_name,
            last_name,
            middle_name,
            password: hashed,
            hash
          },
          select: {
            email: true
          },
          
        })

    return NextResponse.json({ message: "User created successful" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
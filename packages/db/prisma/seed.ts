import {PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

    const password = await bcrypt.hash('alice' , 10);

    const alice = await prisma.user.upsert({

        where: {email: '1111111111'},
        update: {},

        create: {
        email:'1111111111',
        password,
        name: 'Alice'
        },
    })

    console.log({alice})
}

main()
.then(async ()=>{

    await prisma.$disconnect()
})
.catch(async(e)=>{

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
})
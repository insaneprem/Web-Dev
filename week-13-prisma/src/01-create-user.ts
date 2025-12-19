import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  //Do your Prisma Query here
  await prisma.users.create({
    data:{
     email : "premkumar",
     password : "g5w",
     id : 5,
    }
  })
}

main().then(async ()=> {
  console.log('done')
  await prisma.$disconnect()
}).catch(async (e)=> {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
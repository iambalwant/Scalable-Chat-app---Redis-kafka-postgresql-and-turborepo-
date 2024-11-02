import {PrismaClient} from '@prisma/client'

const prismaClinet = new PrismaClient({
    log: ["query"],
});

export default prismaClinet;
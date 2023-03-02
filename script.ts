import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const mediaId = '1'
  const documentId = '1'
  const tenantId = '1'
  const comment = await prisma.mediaOnDocumentComment.create({
    select: {
      id: true,
    },
    data: {
      mediaOnDocument: {
        connectOrCreate: {
          where: {
            tenantId_mediaId_documentId: {
              mediaId,
              documentId,
              tenantId,
            },
          },
          create: {
            document: {
              connect: {
                tenantId_id: {
                  tenantId,
                  id: documentId,
                },
              },
            },
            media: {
              connect: {
                tenantId_id: {
                  tenantId,
                  id: mediaId,
                },
              },
            },
            tenant: {
              connect: {
                id: tenantId,
              },
            },
          },
        },
      },
      tenant: {
        connect: {
          id: tenantId,
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })